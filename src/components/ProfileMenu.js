import React, { useRef, useEffect, useState } from "react";
import "./ProfileMenu.css";

const ProfileMenu = ({ open, onClose, onEditProfile, onLogout }) => {
  const menuRef = useRef();
  const [menuPosition, setMenuPosition] = useState({ top: 58 });
  
  // Al abrir el menú, calculamos la posición óptima
  useEffect(() => {
    if (open) {
      // Buscar el botón del avatar en el header
      const avatarBtn = document.querySelector('.header__avatar-btn');
      if (avatarBtn) {
        const rect = avatarBtn.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Verificar si hay suficiente espacio debajo del botón
        if (rect.bottom + 120 > viewportHeight) {
          // No hay suficiente espacio abajo, mostrar menú arriba del botón
          setMenuPosition({ bottom: viewportHeight - rect.top + 10, top: 'auto' });
        } else {
          // Hay espacio suficiente abajo
          setMenuPosition({ top: rect.bottom + 10, bottom: 'auto' });
        }
      }
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <div
      className={`profile-menu__dropdown${open ? " open" : ""}`}
      ref={menuRef}
      tabIndex={-1}
      aria-hidden={!open}
      style={{ 
        pointerEvents: open ? "auto" : "none",
        top: menuPosition.top,
        bottom: menuPosition.bottom,
      }}
    >
      <button className="profile-menu__item" onClick={onEditProfile}>Editar perfil</button>
      <button className="profile-menu__item logout" onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
};

export default ProfileMenu;
