import React, { useState, useRef, useEffect } from "react";
import "../components/EditProfilePage.css";

const EditProfilePage = ({ user, onSave, onCancel, inlineMode = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  
  // Actualizar los estados cuando cambia el prop user
  useEffect(() => {
    console.log("User data received:", user); // Mantenemos el log para depuración
    // Incluso si user es null/undefined, inicializamos con valores por defecto
    setName(user?.name || "");
    setEmail(user?.email || "");
    // Para avatar, podríamos querer un valor por defecto específico
    setAvatar(user?.avatar || "");
  }, [user]);
  const fileInputRef = useRef(null);

  // Función para manejar cuando se selecciona un archivo
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convertir el archivo a una URL de datos (data URL)
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para abrir el selector de archivos
  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  // Valores para mostrar en la UI - nunca deberían ser undefined
  const displayName = name || (user?.name || "Usuario");
  const displayEmail = email || (user?.email || "");
  const displayAvatar = avatar || "/default-avatar.svg";
  
  console.log("Displaying values:", { displayName, displayEmail, displayAvatar, originalUser: user });

  return (
    <div className={`edit-profile-main${inlineMode ? " inline-mode" : ""}`}>
      <h2>Editar perfil</h2>
      <div className="edit-profile-avatar-wrap">
        <img 
          className="edit-profile-avatar" 
          src={displayAvatar} 
          alt={displayName} 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "/default-avatar.svg";
          }}
        />
      </div>
      <form className="edit-profile-form" onSubmit={e => { 
        e.preventDefault(); 
        // Solo guardamos valores que realmente han cambiado
        const updatedProfile = {
          ...user,
          name,
          email,
          avatar
        };
        onSave(updatedProfile); 
      }}>
        <label>Nombre
          <input value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>Foto de perfil
          <div className="edit-profile-image-controls">
            <input 
              className="edit-profile-url-input"
              value={avatar} 
              onChange={e => setAvatar(e.target.value)} 
              placeholder="URL de imagen (dejar vacío para usar la imagen por defecto)"
            />
            
            {/* Botón para seleccionar archivo */}
            <button 
              type="button" 
              className="edit-profile-file-btn" 
              onClick={handleSelectFile}
            >
              Seleccionar archivo
            </button>
          </div>
        </label>
        
        {/* Selector de archivos oculto */}
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileSelect}
        />
        
        <div className="edit-profile-actions">
          <button className="edit-profile-save" type="submit">Guardar</button>
          <button className="edit-profile-cancel" type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
