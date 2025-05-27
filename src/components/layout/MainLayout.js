import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useScreenType } from '../../utils/screenUtils';
import Sidebar from '../Sidebar';
import DesktopHeader from '../DesktopHeader';
import Header from '../Header';
import BottomNav from '../BottomNav';
import ProfileMenu from '../ProfileMenu';
import NotificationManager from '../NotificationManager';
import '../../styles/MainLayout.css';

const MainLayout = ({ children, activePage, onPageChange, user, onLogout, onEditProfile }) => {
  const { darkMode, toggleTheme } = useTheme();
  const { isDesktop } = useScreenType();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Componentes condicionales según tipo de pantalla */}
      {isDesktop ? (
        <>
          <Sidebar 
            active={activePage} 
            onChange={(screen) => {
              if (screen === "logout") {
                onLogout();
              } else {
                onPageChange(screen);
              }
            }} 
            onEditProfile={() => {
              onEditProfile();
              onPageChange("configuracion");
            }}
          />
          <DesktopHeader 
            user={user} 
            onProfileClick={() => setProfileMenuOpen(!profileMenuOpen)} 
            onBellClick={() => console.log('Notificaciones')} 
            isDesktop={true}
            darkMode={darkMode}
            onThemeChange={toggleTheme}
          />
        </>
      ) : (
        <>
          <Header 
            user={user} 
            onProfileClick={() => setProfileMenuOpen(!profileMenuOpen)} 
            onBellClick={() => console.log('Notificaciones')}
            darkMode={darkMode}
            onThemeChange={toggleTheme}
          />
          <BottomNav active={activePage} onChange={onPageChange} />
        </>
      )}
      
      {/* Menú de perfil (común para ambos layouts) */}
      <ProfileMenu 
        open={profileMenuOpen} 
        onClose={() => setProfileMenuOpen(false)} 
        onLogout={onLogout}
        onEditProfile={() => {
          onEditProfile();
          onPageChange("configuracion");
          setProfileMenuOpen(false);
        }}
      />
      
      {/* Contenido principal con clases condicionales */}
      <main className={isDesktop ? "main-content desktop" : "main-content"}>
        {children}
      </main>
      
      {/* Gestor de notificaciones */}
      <div className="notifications-wrapper">
        <NotificationManager />
      </div>
    </div>
  );
};

export default MainLayout;
