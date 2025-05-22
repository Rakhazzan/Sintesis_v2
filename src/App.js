import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Sidebar from "./components/Sidebar";
import DesktopHeader from "./components/DesktopHeader";
import ProfileMenu from "./components/ProfileMenu";
import StatisticsChart from "./components/StatisticsChart";
import PacientesPage from "./pages/PacientesPage";
import MensajesPage from "./pages/MensajesPage";
import PersonPage from "./pages/PersonPage";
import ChatPage from "./pages/ChatPage";
import EditProfilePage from "./pages/EditProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Citas from "./components/Citas";
import AppointmentControls from "./components/AppointmentControls";
import Calendar from "./components/Calendar";
import { useScreenType } from "./utils/screenUtils";
import { saveAuthData, getAuthData, clearAuthData, hasActiveSessionSync, registerUser, updateUserProfile } from "./utils/authUtils";
import supabase from "./utils/supabaseUtils";
import { getThemePreference, saveThemePreference, applyThemeClass } from "./utils/themeUtils";
import { getAllAppointments, updateAppointmentStatus } from "./utils/appointmentUtils";
import NotificationManager, { notifyService } from "./components/NotificationManager";
import "./App.css";

function App() {
  const wasInAuthScreen = () => {
    return sessionStorage.getItem('currentScreen') === 'login' || 
           sessionStorage.getItem('currentScreen') === 'register';
  };

  const [pantalla, setPantalla] = useState(() => {
    const savedScreen = sessionStorage.getItem('currentScreen');
    return savedScreen || "inicio";
  });
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState();
  const [editingProfile, setEditingProfile] = useState(false);
  const [auth, setAuth] = useState(() => !wasInAuthScreen() && hasActiveSessionSync()); // No autenticamos si estaba en login
  const [registering, setRegistering] = useState(() => sessionStorage.getItem('currentScreen') === 'register');
  const [loginError, setLoginError] = useState(""); // Estado para el mensaje de error de login
  
  // Estado para controlar el tema (claro/oscuro)
  const [darkMode, setDarkMode] = useState(() => {
    // Inicialmente usamos la preferencia del sistema como valor por defecto mientras cargamos
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode;
  });
  
  // Estado para indicar si estamos cargando datos
  const [loading, setLoading] = useState(true);
  
  // Estado para las notificaciones - utilizado por NotificationManager
  const [, setNotifications] = useState([]);
  
  // Inicializar el servicio de notificaciones
  useEffect(() => {
    console.log('Inicializando servicio de notificaciones');
    notifyService.init(setNotifications);
  }, []);
  
  // Función para reenviar el correo de confirmación
  const handleResendConfirmation = async (email) => {
    try {
      setLoading(true);
      // Utilizamos la API de Supabase para reenviar el correo de confirmación
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });
      
      if (error) {
        console.error('Error al reenviar correo de confirmación:', error);
        notifyService.error('Error al reenviar: ' + error.message);
        return false;
      }
      
      notifyService.success('¡Correo de confirmación reenviado! Revisa tu bandeja de entrada.');
      return true;
    } catch (error) {
      console.error('Error inesperado al reenviar correo:', error);
      notifyService.error('Error al reenviar: ' + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Estados para el calendario
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 12)); // 12 de Mayo de 2025
  
  // Estados para la tabla de citas
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: {
        name: "Carlos Rodríguez",
        img: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      date: "12 May 2025",
      time: "10:30 - 11:00",
      type: "Consulta general",
      status: "confirmed"
    },
    {
      id: 2,
      patient: {
        name: "Ana Martín",
        img: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      date: "12 May 2025",
      time: "12:00 - 12:30",
      type: "Seguimiento tratamiento",
      status: "pending"
    }
  ]);

  // Guardar la pantalla actual en sessionStorage cuando cambia
  useEffect(() => {
    sessionStorage.setItem('currentScreen', pantalla);
  }, [pantalla]);

  // Guardar el estado de registro en sessionStorage
  useEffect(() => {
    if (registering) {
      sessionStorage.setItem('currentScreen', 'register');
    }
  }, [registering]);

  // Restaurar sesión y preferencias si existe (sólo al cargar)
  useEffect(() => {
    async function initializeApp() {
      setLoading(true);
      
      // No intentar restaurar la sesión si estábamos en login/registro
      if (!wasInAuthScreen() && hasActiveSessionSync()) {
        try {
          // Obtener datos de autenticación
          const authData = await getAuthData();
          if (authData && authData.user) {
            setUser(authData.user);
            setAuth(true);
            
            // Obtener preferencia de tema guardada para este usuario
            const isDarkMode = await getThemePreference(authData.user.id);
            setDarkMode(isDarkMode);
          }
        } catch (error) {
          console.error('Error al restaurar sesión:', error);
        }
      } else {
        // Si no hay sesión, obtener preferencia de tema general
        try {
          const isDarkMode = await getThemePreference();
          setDarkMode(isDarkMode);
        } catch (error) {
          console.error('Error al obtener preferencia de tema:', error);
        }
      }
      
      // Cargar las citas desde Supabase
      try {
        const appointmentsData = await getAllAppointments();
        if (appointmentsData && appointmentsData.length > 0) {
          // Transformar datos de Supabase al formato que espera nuestra UI
          const formattedAppointments = appointmentsData.map(apt => ({
            id: apt.id,
            patient: {
              name: apt.patient.name,
              img: apt.patient.img
            },
            date: apt.date,
            time: apt.time,
            type: apt.type,
            status: apt.status
          }));
          setAppointments(formattedAppointments);
        }
      } catch (error) {
        console.error('Error al cargar citas:', error);
      }
      
      setLoading(false);
    }
    
    initializeApp();
  }, []);
  
  // Aplicar el tema a toda la aplicación cuando cambia
  useEffect(() => {
    // Aplicar el tema visualmente
    applyThemeClass(darkMode);
    
    // Guardar preferencia en Supabase o localStorage (si no hay usuario)
    if (!loading) {
      const userId = user?.id;
      saveThemePreference(userId, darkMode).catch(error => {
        console.error('Error al guardar preferencia de tema:', error);
      });
    }
  }, [darkMode, loading, user]);
  
  // Función para cambiar el tema
  const handleThemeChange = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);
  
  // Login con Supabase
  const handleLogin = async (data) => {
    try {
      // Limpiar errores anteriores
      setLoginError("");
      setLoading(true);
      
      const authResponse = await saveAuthData(data);
      console.log('Respuesta de autenticación completa:', authResponse);
      
      if (authResponse && authResponse.user) {
        // Guardar los datos del usuario en el estado
        console.log('Estableciendo datos de usuario en estado:', authResponse.user);
        setUser(authResponse.user);
        setAuth(true);
        notifyService.success('¡Bienvenido/a ' + authResponse.user.name + '!');
      } else {
        console.error('Respuesta de autenticación incompleta');
        setLoginError('Error al obtener datos de usuario');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      
      // Verificar si es un error de email no confirmado
      if (error.message && error.message.includes('Email not confirmed')) {
        setLoginError('Es necesario confirmar tu correo electrónico para iniciar sesión. Por favor, revisa tu bandeja de entrada.');
      } else {
        // Otros errores de inicio de sesión
        setLoginError('Error al iniciar sesión: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      setLoading(true);
      await clearAuthData();
      setAuth(false);
      setProfileMenuOpen(false);
      setPantalla("inicio");
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async (data) => {
    setLoading(true);
    try {
      // Crear usuario en Supabase Auth y en la tabla users
      if (data) {
        const newUser = {
          name: data.name || "Usuario",
          email: data.email,
          password: data.password, // Importante: ahora necesitamos la contraseña
          avatar: "" // Ya no usamos URLs aleatorias, se usará la imagen por defecto
        };
        
        // Usar la función registerUser para crear el usuario
        const { user } = await registerUser(newUser);
        
        if (user) {
          // No autenticamos al usuario automáticamente
          // Solo lo redirigimos a la pantalla de login
          setRegistering(false);
          // Dejar auth en false para que vuelva a la pantalla de login
          setAuth(false);
          
          // Mostrar mensaje de éxito con notificación animada
          notifyService.success('Registro exitoso. Por favor, inicia sesión con tus credenciales.');
        }
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      notifyService.error('Error al registrar: ' + (error.message || 'Intente de nuevo'));
    } finally {
      setLoading(false);
    }
  };

  // Guardar perfil editado en Supabase
  const handleSaveProfile = async (data) => {
    try {
      setLoading(true);
      const updatedUser = { ...user, ...data };
      
      // Actualizar perfil en Supabase
      const result = await updateUserProfile(updatedUser);
      
      // Si la actualización fue exitosa, actualizar el estado local
      if (result.success) {
        setUser(updatedUser);
        notifyService.success('Perfil actualizado correctamente');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      if (error.message) {
        notifyService.error('Error al guardar perfil: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Gestionar el cambio de estado de las citas en Supabase
  const handleAppointmentStatusChange = async (appointmentId, newStatus) => {
    try {
      const { success } = await updateAppointmentStatus(appointmentId, newStatus);
      if (success) {
        // Actualizar el estado local para reflejar el cambio
        setAppointments(prevAppointments => 
          prevAppointments.map(apt => 
            apt.id === appointmentId 
              ? { ...apt, status: newStatus } 
              : apt
          )
        );
        
        // Mostrar una notificación del cambio de estado con animación
        const statusMessages = {
          confirmed: 'Cita confirmada correctamente',
          pending: 'Cita marcada como pendiente',
          completed: 'Cita marcada como completada',
          cancelled: 'Cita cancelada'
        };
        
        notifyService.info(statusMessages[newStatus] || 'Estado de cita actualizado');
      }
    } catch (error) {
      console.error('Error al actualizar estado de cita:', error);
      notifyService.error('Error al actualizar estado: ' + error.message);
    }
  };

  // Renderizado condicional
  // Detectar tipo de pantalla para adaptación responsive
  const { isDesktop } = useScreenType();

  // Inicializar el servicio de notificaciones
  useEffect(() => {
    notifyService.init(setNotifications);
  }, []);
  
  if (!auth) {
    // Actualizar sessionStorage con la pantalla actual
    sessionStorage.setItem('currentScreen', registering ? 'register' : 'login');
    
    if (registering) {
      return <RegisterPage onRegister={handleRegister} onLogin={() => setRegistering(false)} />;
    }
    // Extraer el email del mensaje de error si es un error de "Email not confirmed"
    let emailFromError = "";
    if (loginError && loginError.includes('correo electrónico')) {
      // En este punto ya tenemos emailFromError en el estado del componente App
      const matches = loginError.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
      if (matches && matches.length > 0) {
        emailFromError = matches[0];
      }
    }
    
    return <LoginPage 
      onLogin={handleLogin} 
      onRegister={() => {
        setRegistering(true);
        setLoginError(""); // Limpiar errores al cambiar entre pantallas
      }} 
      error={loginError}
      onResendConfirmation={handleResendConfirmation}
      lastEmail={emailFromError}
    />;
  }
  // La edición de perfil ahora se mostrará en el panel principal
  
  return (
    <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Componentes condicionales según tipo de pantalla */}
      {isDesktop ? (
        <>
          <Sidebar 
            active={pantalla} 
            onChange={(screen) => {
              if (screen === "logout") {
                handleLogout();
              } else {
                setPantalla(screen);
              }
            }} 
            onEditProfile={() => {
              setEditingProfile(true);
              setPantalla("configuracion");
            }}
          />
          <DesktopHeader 
            user={user} 
            onProfileClick={() => setProfileMenuOpen(!profileMenuOpen)} 
            onBellClick={() => console.log('Notificaciones')} 
            isDesktop={true}
            darkMode={darkMode}
            onThemeChange={handleThemeChange}
          />
        </>
      ) : (
        <>
          <Header 
            user={user} 
            onProfileClick={() => setProfileMenuOpen(!profileMenuOpen)} 
            onBellClick={() => console.log('Notificaciones')}
            darkMode={darkMode}
            onThemeChange={handleThemeChange}
          />
          <BottomNav active={pantalla} onChange={setPantalla} />
        </>
      )}
      
      {/* Menú de perfil (común para ambos layouts) */}
      <ProfileMenu 
        open={profileMenuOpen} 
        onClose={() => setProfileMenuOpen(false)} 
        onLogout={handleLogout}
        onEditProfile={() => {
          setEditingProfile(true);
          setPantalla("configuracion");
          setProfileMenuOpen(false);
        }}
      />
      
      {/* Contenido principal con clases condicionales */}
      <main className={isDesktop ? "main-content desktop" : "main-content"}>
        {pantalla === "inicio" && (
          <>
            {/* Sección de bienvenida */}
            <section className={`welcome-section ${darkMode ? 'dark-theme' : ''}`}>
              <h2 className={darkMode ? 'dark-theme' : ''}>Hola, {user?.name || 'Usuario'}</h2>
              <p className={`date ${darkMode ? 'dark-theme' : ''}`}>Lunes, 12 de Mayo, 2025</p>
              <div className="summary-cards">
                <div className="summary-card">
                  <div className="summary-title">Citas hoy</div>
                  <div className="summary-value">8</div>
                </div>
                <div className="summary-card">
                  <div className="summary-title">Mensajes</div>
                  <div className="summary-value">12</div>
                </div>
              </div>
            </section>
            
            {/* Layout de escritorio con grid para dashboard */}
            {isDesktop && (
              <div className="desktop-dashboard-grid">
                {/* Estadísticas (parte superior) */}
                <section className="stats-section">
                  <StatisticsChart />
                </section>
                
                {/* Fila de métricas */}
                <div className="metrics-section">
                  <div className="metrics-row">
                    <div className="metric-card">
                      <div className="metric-icon appointments"></div>
                      <div className="metric-data">
                        <div className="metric-title">Citas totales</div>
                        <div className="metric-value">42</div>
                        <div className="metric-trend positive">+12% vs semana anterior</div>
                      </div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon patients"></div>
                      <div className="metric-data">
                        <div className="metric-title">Pacientes nuevos</div>
                        <div className="metric-value">8</div>
                        <div className="metric-trend positive">+5% vs semana anterior</div>
                      </div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon time"></div>
                      <div className="metric-data">
                        <div className="metric-title">Tiempo promedio</div>
                        <div className="metric-value">24 min</div>
                        <div className="metric-trend negative">-3% vs semana anterior</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contenedor para citas recientes y calendario */}
                <div className="bottom-sections">
                  {/* Tabla de citas recientes */}
                  <section className="recent-appointments-section">
                    <div className="section-header">
                      <h3>Citas recientes</h3>
                      <button 
                        className="view-all" 
                        onClick={() => setPantalla("citas")} 
                        aria-label="Ver todas las citas"
                      >
                        Ver todas
                      </button>
                    </div>
                    <table className="appointments-table">
                      <thead>
                        <tr>
                          <th>PACIENTE</th>
                          <th>FECHA</th>
                          <th>HORA</th>
                          <th>TIPO</th>
                          <th>ESTADO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="patient-cell">
                            <img src={appointment.patient.img} alt={appointment.patient.name} className="patient-img" />
                            {appointment.patient.name}
                          </td>
                          <td>{appointment.date}</td>
                          <td>{appointment.time}</td>
                          <td>{appointment.type}</td>
                          <td>
                            <div className="status-container">
                              <span className={`status ${appointment.status}`}>
                                {appointment.status === "confirmed" ? "Confirmada" : 
                                 appointment.status === "pending" ? "Pendiente" :
                                 appointment.status === "completed" ? "Completada" : "Cancelada"}
                              </span>
                              <AppointmentControls 
                                appointment={appointment} 
                                onStatusChange={handleAppointmentStatusChange} 
                              />
                            </div>
                          </td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                  
                  {/* Sección de calendario y próximas citas */}
                  <section className="calendar-section">
                    <Calendar 
                      currentDate={currentDate}
                      onDateChange={(newDate) => setCurrentDate(newDate)}
                      onPeriodChange={(period) => console.log(`Periodo cambiado a: ${period}`)}
                    />
                    
                    <div className="upcoming-appointments">
                      <h4>Próximas citas</h4>
                      <div className="upcoming-list">
                        {appointments.slice(0, 3).map((appointment) => (
                        <div className="appointment-item" key={appointment.id}>
                          <img src={appointment.patient.img} alt={appointment.patient.name} className="patient-small-img" />
                          <div className="appointment-details">
                            <div className="appointment-name">{appointment.patient.name}</div>
                            <div className="appointment-type">{appointment.type}</div>
                          </div>
                          <div className="appointment-time">{appointment.time}</div>
                          <div className="appointment-actions">
                            <button 
                              className="action-btn message" 
                              aria-label="Mensaje" 
                              onClick={() => setPantalla("chat")}
                            >
                              💬
                            </button>
                            <button 
                              className="action-btn call" 
                              aria-label="Llamar" 
                              onClick={() => notifyService.call(`Llamando a ${appointment.patient.name}...`)}
                            >
                              📞
                            </button>
                          </div>
                        </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}
            
            {/* Versión móvil de estadísticas y citas */}
            {!isDesktop && (
              <div className="mobile-dashboard">
                <section className="stats-section">
                  <StatisticsChart />
                </section>
                
                <section className="calendar-section mobile-calendar">
                  <div className="calendar-component">
                    <div className="section-header">
                      <h3>Mayo 2025</h3>
                      <div className="calendar-controls">
                        <button className="calendar-nav prev" aria-label="Mes anterior">←</button>
                        <button className="calendar-nav next" aria-label="Mes siguiente">→</button>
                      </div>
                    </div>
                    {/* Mini calendario similar al de desktop */}
                    <div className="mini-calendar">
                      <div className="calendar-header">
                        <div>L</div>
                        <div>M</div>
                        <div>X</div>
                        <div>J</div>
                        <div>V</div>
                        <div>S</div>
                        <div>D</div>
                      </div>
                      <div className="calendar-days">
                        {/* Se generará dinámicamente con JavaScript */}
                        {Array(42).fill(null).map((_, i) => {
                          const day = i - 2; // Ajuste para Mayo 2025
                          const currentDay = day === 13; // Día actual
                          const prevMonth = day < 1;
                          const nextMonth = day > 31;
                          let className = "";
                          if (prevMonth) className = "prev-month ";
                          if (nextMonth) className = "next-month ";
                          if (currentDay) className += "current-day";
                          
                          // Valor a mostrar
                          let value;
                          if (prevMonth) value = 28 + day;
                          else if (nextMonth) value = day - 31;
                          else value = day;
                          
                          return <div className={className} key={i}>{value}</div>;
                        })}
                      </div>
                    </div>
                  </div>
                </section>
                
                <section className="appointments-section">
                  <h3>Próximas citas</h3>
                  <div className="appointments-list">
                    <div className="appointment-card">Carlos Rodríguez (10:30 - 11:00)</div>
                    <div className="appointment-card">Ana Martín (12:00 - 12:30)</div>
                  </div>
                </section>
              </div>
            )}
          </>
        )}
        {pantalla === "citas" && <Citas />}
        {pantalla === "pacientes" && <PacientesPage />}
        {pantalla === "mensajes" && <MensajesPage />}
        {pantalla === "perfil" && <PersonPage user={user} onEdit={() => setEditingProfile(true)} />}
        {pantalla === "chat" && <ChatPage user={user} />}
        {((pantalla === "configuracion" && editingProfile) || (editingProfile && !isDesktop && pantalla === "configuracion")) && 
          <div className="main-content-section">
            <EditProfilePage 
              user={user} 
              onSave={(updatedProfile) => {
                handleSaveProfile(updatedProfile);
                setEditingProfile(false);
                setPantalla("inicio");
              }} 
              onCancel={() => {
                setEditingProfile(false);
                setPantalla("inicio");
              }} 
              inlineMode={true} 
            />
          </div>
        }
      </main>
      {/* Gestor de notificaciones */}
      <div className="notifications-wrapper">
        <NotificationManager />
      </div>
  </div>
  );
}
export default App;