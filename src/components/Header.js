import React from "react";
import "./Header.css";
import ThemeSwitch from "./ThemeSwitch";

const Header = ({ user, onProfileClick, onBellClick, darkMode, onThemeChange }) => (
  <header className="header">
    <div className="header__logo">DOCSALUT</div>
    <div className="header__icons">
      <ThemeSwitch darkMode={darkMode} onChange={onThemeChange} />
      <button className="header__bell-btn" aria-label="Notificaciones" onClick={onBellClick}>
        <span className="header__bell">
          <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11c0-3.07-1.64-5.64-5-5.958V4a1 1 0 1 0-2 0v1.042C7.64 5.36 6 7.929 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 0 1-6 0v-1m6 0H9"/></svg>
          <span className="header__dot" />
        </span>
      </button>
      <button
        className="header__avatar-btn"
        aria-label="Menú de perfil"
        onClick={onProfileClick}
        tabIndex={0}
      >
        <img className="header__avatar" src={user?.avatar} alt={user?.name || "avatar"} />
      </button>
    </div>
  </header>
);

export default Header;
