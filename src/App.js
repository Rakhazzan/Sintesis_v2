import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Sidebar from "./components/Sidebar";
import DesktopHeader from "./components/DesktopHeader";
import ProfileMenu from "./components/ProfileMenu";
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
import { saveAuthData, getAuthData, clearAuthData, hasActiveSession } from "./utils/authUtils";
import "./App.css";

const initialUser = {
  name: "Dra. Martínez",
  email: "martinez@email.com",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg"
};

function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [editingProfile, setEditingProfile] = useState(false);
  const [auth, setAuth] = useState(hasActiveSession()); // Verifica si hay sesión guardada
  const [registering, setRegistering] = useState(false);
  
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

  // Restaurar sesión si existe (sólo al cargar)
  useEffect(() => {
    if (hasActiveSession()) {
      const authData = getAuthData();
      if (authData && authData.user) {
        setUser(authData.user);
        setAuth(true);
      }
    }
  }, []);
  
  // Simulación de login/logout con persistencia
  const handleLogin = (data) => {
    setAuth(true);
    // Si se proporciona información del usuario, actualizar el estado
    if (data && data.email) {
      const loginUser = {...initialUser, ...data};
      setUser(loginUser);
      // Guardar en localStorage
      saveAuthData(loginUser);
    } else {
      // Usar el usuario por defecto
      saveAuthData(initialUser);
    }
    setPantalla("inicio");
  };
  
  const handleLogout = () => {
    setAuth(false);
    setPantalla("login");
    setProfileMenuOpen(false);
    // Limpiar datos de sesión
    clearAuthData();
  };
  
  const handleRegister = (data) => {
    setAuth(true);
    setRegistering(false);
    setPantalla("inicio");
    
    // Crear usuario con los datos de registro
    if (data) {
      const newUser = {
        name: data.name || "Usuario",
        email: data.email,
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 70)}.jpg`
      };
      setUser(newUser);
      // Guardar en localStorage
      saveAuthData(newUser);
    }
  };

  // Guardar perfil editado
  const handleSaveProfile = (data) => {
    setUser(data);
    setEditingProfile(false);
  };
  
  // Gestionar el cambio de estado de las citas
  const handleAppointmentStatusChange = (appointmentId, newStatus) => {
    setAppointments(currentAppointments => 
      currentAppointments.map(appointment => 
        appointment.id === appointmentId 
          ? {...appointment, status: newStatus}
          : appointment
      )
    );
    
    // Mensaje informativo sobre el cambio de estado
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
      alert(`Cita de ${appointment.patient.name} marcada como: ${newStatus === "completed" ? "Completada" : "Cancelada"}`);
    }
  };

  // Renderizado condicional
  // Detectar tipo de pantalla para adaptación responsive
  const { isDesktop } = useScreenType();
  
  if (!auth) {
    if (registering) {
      return <RegisterPage onRegister={handleRegister} onLogin={() => setRegistering(false)} />;
    }
    return <LoginPage onLogin={handleLogin} onRegister={() => setRegistering(true)} />;
  }
  if (editingProfile) {
    return <EditProfilePage user={user} onSave={handleSaveProfile} onCancel={() => setEditingProfile(false)} />;
  }

  // Determina qué layout usar - mobile o desktop
  const appClass = isDesktop ? "main-app desktop-layout" : "main-app mobile-layout";
  
  return (
    <div className={appClass}>
      {/* Componentes condicionales según tipo de pantalla */}
      {isDesktop ? (
        <>
          <Sidebar active={pantalla} onChange={setPantalla} />
          <DesktopHeader
            user={user}
            onProfileClick={() => setProfileMenuOpen((v) => !v)}
            onBellClick={() => {}}
          />
        </>
      ) : (
        <>
          <Header
            user={user}
            onProfileClick={() => setProfileMenuOpen((v) => !v)}
            onBellClick={() => {}}
          />
          <BottomNav active={pantalla} onChange={setPantalla} />
        </>
      )}
      
      {/* Menú de perfil (común para ambos layouts) */}
      <ProfileMenu
        open={profileMenuOpen}
        onClose={() => setProfileMenuOpen(false)}
        onEditProfile={() => {
          setEditingProfile(true);
          setProfileMenuOpen(false);
        }}
        onLogout={handleLogout}
      />
      
      {/* Contenido principal con clases condicionales */}
      <main className={isDesktop ? "main-content desktop" : "main-content"}>
        {pantalla === "inicio" && (
          <>
            {/* Sección de bienvenida */}
            <section className="welcome-section">
              <h2>Hola, {user.name}</h2>
              <p className="date">Lunes, 12 de Mayo, 2025</p>
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
                <section className="stats-section">
                  <div className="section-header">
                    <h3>Estadísticas semanales</h3>
                    <select className="period-selector">
                      <option>Esta semana</option>
                      <option>Este mes</option>
                      <option>Este año</option>
                    </select>
                  </div>
                  <div className="stats-chart">
                    {/* Simulación de gráfico de barras */}
                    <div className="chart-container">
                      <div className="chart-label">Lun</div>
                      <div className="chart-bar" style={{height: '50px'}}></div>
                    </div>
                    <div className="chart-container">
                      <div className="chart-label">Mar</div>
                      <div className="chart-bar" style={{height: '70px'}}></div>
                    </div>
                    <div className="chart-container">
                      <div className="chart-label">Mié</div>
                      <div className="chart-bar" style={{height: '60px'}}></div>
                    </div>
                    <div className="chart-container">
                      <div className="chart-label">Jue</div>
                      <div className="chart-bar" style={{height: '100px'}}></div>
                    </div>
                    <div className="chart-container">
                      <div className="chart-label">Vie</div>
                      <div className="chart-bar" style={{height: '85px'}}></div>
                    </div>
                    <div className="chart-container">
                      <div className="chart-label">Sáb</div>
                      <div className="chart-bar" style={{height: '30px'}}></div>
                    </div>
                    <div className="chart-container">
                      <div className="chart-label">Dom</div>
                      <div className="chart-bar" style={{height: '20px'}}></div>
                    </div>
                  </div>
                </section>
                
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
                
                <div className="bottom-row">
                  <section className="recent-appointments">
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
                  
                  <section className="calendar-section">
                    <Calendar 
                      currentDate={currentDate}
                      onDateChange={(newDate) => setCurrentDate(newDate)}
                      onPeriodChange={(period) => console.log(`Periodo cambiado a: ${period}`)}
                    />
                    
                    <div className="upcoming-appointments">
                      <h4>Próximas citas</h4>
                      {appointments.map((appointment) => (
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
                            onClick={() => alert(`Llamando a ${appointment.patient.name}...`)}
                          >
                            📞
                          </button>
                        </div>
                      </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}
            
            {/* Versión móvil de estadísticas y citas */}
            {!isDesktop && (
              <>
                <section className="stats-section">
                  <h3>Estadísticas semanales</h3>
                  <div className="stats-placeholder">[Gráfico de barras aquí]</div>
                </section>
                <section className="appointments-section">
                  <h3>Próximas citas</h3>
                  <div className="appointments-list">
                    <div className="appointment-card">Carlos Rodríguez (10:30 - 11:00)</div>
                    <div className="appointment-card">Ana Martín (12:00 - 12:30)</div>
                  </div>
                </section>
              </>
            )}
          </>
        )}
        {pantalla === "citas" && <Citas />}
        {pantalla === "pacientes" && <PacientesPage />}
        {pantalla === "mensajes" && <MensajesPage />}
        {pantalla === "perfil" && <PersonPage user={user} onEdit={() => setEditingProfile(true)} />}
        {pantalla === "chat" && <ChatPage user={user} />}
      </main>
    </div>
  );
}

export default App;
