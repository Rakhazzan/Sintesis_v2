import React, { useRef, useEffect } from "react";
import "./ProfileMenu.css";

const ProfileMenu = ({ open, onClose, onEditProfile, onLogout }) => {
  const menuRef = useRef();

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
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      <button className="profile-menu__item" onClick={onEditProfile}>Editar perfil</button>
      <button className="profile-menu__item logout" onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
};

export default ProfileMenu;
