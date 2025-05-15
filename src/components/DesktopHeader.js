import React from "react";
import "./DesktopHeader.css";
import ThemeSwitch from "./ThemeSwitch";

const DesktopHeader = ({ user, onProfileClick, onBellClick, isDesktop, darkMode, onThemeChange }) => {
  return (
    <header className="desktop-header">
      <div className="search-container">
        <div className="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a8fa7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar pacientes, citas..." 
          aria-label="Buscar"
        />
      </div>
      
      <div className="desktop-header-right">
        <ThemeSwitch darkMode={darkMode} onChange={onThemeChange} />
        <button className="notification-btn" onClick={onBellClick} aria-label="Notificaciones">
          <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11c0-3.07-1.64-5.64-5-5.958V4a1 1 0 1 0-2 0v1.042C7.64 5.36 6 7.929 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 0 1-6 0v-1m6 0H9"/>
          </svg>
          <span className="notification-dot" />
        </button>
        
        <button
          className="profile-btn"
          onClick={isDesktop ? null : onProfileClick}
          aria-label="Menú de perfil"
          style={isDesktop ? { cursor: 'default' } : {}}
        >
          <img 
            className="profile-avatar" 
            src={user?.avatar} 
            alt={user?.name || "Avatar del usuario"} 
          />
        </button>
      </div>
    </header>
  );
};

export default DesktopHeader;
