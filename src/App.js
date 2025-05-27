import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import AuthPages from "./components/layout/AuthPages";
import DashboardPage from "./components/dashboard/DashboardPage";
import PacientesPage from "./pages/PacientesPage";
import MensajesPage from "./pages/MensajesPage";
import PersonPage from "./pages/PersonPage";
import ChatPage from "./pages/ChatPage";
import EditProfilePage from "./pages/EditProfilePage";
import Citas from "./components/Citas";
import { notifyService } from "./components/NotificationManager";
import "./styles/global.css";

function AppContent() {
  const { user, auth, loading, logout, saveProfile } = useAuth();
  const [activePage, setActivePage] = useState(() => {
    const savedScreen = sessionStorage.getItem('currentScreen');
    return savedScreen || "inicio";
  });
  const [editingProfile, setEditingProfile] = useState(false);
  
  // Guardar la pantalla actual en sessionStorage
  useEffect(() => {
    sessionStorage.setItem('currentScreen', activePage);
  }, [activePage]);
  
  // Inicializar el servicio de notificaciones
  useEffect(() => {
    console.log('Inicializando servicio de notificaciones');
    notifyService.init();
  }, []);
  
  // Mostrar pantalla de carga mientras verificamos la autenticación
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }
  
  // Si no está autenticado, mostrar páginas de login/registro
  if (!auth) {
    return <AuthPages />;
  }
  
  // Contenido principal de la aplicación para usuarios autenticados
  return (
    <MainLayout 
      activePage={activePage} 
      onPageChange={setActivePage}
      user={user}
      onLogout={logout}
      onEditProfile={() => setEditingProfile(true)}
    >
      {activePage === "inicio" && (
        <DashboardPage onNavigate={setActivePage} />
      )}
      {activePage === "citas" && <Citas />}
      {activePage === "pacientes" && <PacientesPage />}
      {activePage === "mensajes" && <MensajesPage />}
      {activePage === "perfil" && (
        <PersonPage 
          user={user} 
          onEdit={() => setEditingProfile(true)} 
        />
      )}
      {activePage === "chat" && <ChatPage user={user} />}
      {((activePage === "configuracion" && editingProfile) || 
        (editingProfile && activePage === "configuracion")) && (
        <div className="main-content-section">
          <EditProfilePage 
            user={user} 
            onSave={(updatedProfile) => {
              saveProfile(updatedProfile);
              setEditingProfile(false);
              setActivePage("inicio");
            }} 
            onCancel={() => {
              setEditingProfile(false);
              setActivePage("inicio");
            }} 
            inlineMode={true} 
          />
        </div>
      )}
    </MainLayout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
