import React, { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import ProfileMenu from "./components/ProfileMenu";
import PacientesPage from "./pages/PacientesPage";
import MensajesPage from "./pages/MensajesPage";
import PersonPage from "./pages/PersonPage";
import ChatPage from "./pages/ChatPage";
import EditProfilePage from "./pages/EditProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Citas from "./components/Citas";
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
  const [auth, setAuth] = useState(false); // Cambia a false para forzar login
  const [registering, setRegistering] = useState(false);

  // Simulación de login/logout
  const handleLogin = (data) => {
    setAuth(true);
    setPantalla("inicio");
  };
  const handleLogout = () => {
    setAuth(false);
    setPantalla("login");
    setProfileMenuOpen(false);
  };
  const handleRegister = (data) => {
    setAuth(true);
    setRegistering(false);
    setPantalla("inicio");
  };

  // Guardar perfil editado
  const handleSaveProfile = (data) => {
    setUser(data);
    setEditingProfile(false);
  };

  // Renderizado condicional
  if (!auth) {
    if (registering) {
      return <RegisterPage onRegister={handleRegister} onLogin={() => setRegistering(false)} />;
    }
    return <LoginPage onLogin={handleLogin} onRegister={() => setRegistering(true)} />;
  }
  if (editingProfile) {
    return <EditProfilePage user={user} onSave={handleSaveProfile} onCancel={() => setEditingProfile(false)} />;
  }

  return (
    <div className="main-app">
      <Header
        user={user}
        onProfileClick={() => setProfileMenuOpen((v) => !v)}
        onBellClick={() => {}}
      />
      <ProfileMenu
        open={profileMenuOpen}
        onClose={() => setProfileMenuOpen(false)}
        onEditProfile={() => {
          setEditingProfile(true);
          setProfileMenuOpen(false);
        }}
        onLogout={handleLogout}
      />
      <main className="main-content">
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
            {/* Placeholder para estadísticas */}
            <section className="stats-section">
              <h3>Estadísticas semanales</h3>
              <div className="stats-placeholder">[Gráfico de barras aquí]</div>
            </section>
            {/* Placeholder para próximas citas */}
            <section className="appointments-section">
              <h3>Próximas citas</h3>
              <div className="appointments-list">
                <div className="appointment-card">Carlos Rodríguez (10:30 - 11:00)</div>
                <div className="appointment-card">Ana Martín (12:00 - 12:30)</div>
              </div>
            </section>
          </>
        )}
        {pantalla === "citas" && <Citas />}
        {pantalla === "pacientes" && <PacientesPage />}
        {pantalla === "mensajes" && <MensajesPage />}
        {pantalla === "perfil" && <PersonPage user={user} onEdit={() => setEditingProfile(true)} />}
        {pantalla === "chat" && <ChatPage user={user} />}
      </main>
      <BottomNav active={pantalla} onChange={setPantalla} />
    </div>
  );
}

export default App;
