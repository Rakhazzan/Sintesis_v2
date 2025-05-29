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
import DocumentosPage from "./pages/DocumentosPage";
import Citas from "./components/Citas";
import { notifyService } from "./components/NotificationManager";
import "./styles/global.css";

function AppContent() {
  const { user, auth, loading, logout, saveProfile } = useAuth();
  // Estado para controlar si es la primera carga de la aplicación
  const [isFirstLoad, setIsFirstLoad] = useState(() => {
    return !sessionStorage.getItem('hasVisitedBefore');
  });
  
  const [activePage, setActivePage] = useState(() => {
    const savedScreen = sessionStorage.getItem('currentScreen');
    return savedScreen || "inicio";
  });
  const [activePageParams, setActivePageParams] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  
  // Función para cambiar de página y manejar parámetros adicionales
  const handlePageChange = (page, params = null) => {
    setActivePage(page);
    setActivePageParams(params);
  };
  
  // Guardar la pantalla actual en sessionStorage
  useEffect(() => {
    sessionStorage.setItem('currentScreen', activePage);
  }, [activePage]);
  
  // Efecto para marcar que el usuario ya ha visitado la aplicación
  // y forzar la página de login en la primera carga
  useEffect(() => {
    if (isFirstLoad) {
      sessionStorage.setItem('hasVisitedBefore', 'true');
      sessionStorage.setItem('currentScreen', 'login');
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);
  
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
  
  // Si no está autenticado o es la primera carga, mostrar páginas de login/registro
  if (!auth || isFirstLoad) {
    return <AuthPages />;
  }
  
  // Contenido principal de la aplicación para usuarios autenticados
  return (
    <MainLayout 
      activePage={activePage} 
      onPageChange={handlePageChange}
      user={user}
      onLogout={logout}
      onEditProfile={() => setEditingProfile(true)}
    >
      {activePage === "inicio" && (
        <DashboardPage onNavigate={handlePageChange} />
      )}
      {activePage === "citas" && <Citas params={activePageParams} />}
      {activePage === "pacientes" && <PacientesPage params={activePageParams} />}
      {activePage === "mensajes" && <MensajesPage params={activePageParams} />}
      {activePage === "documentos" && <DocumentosPage />}
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
