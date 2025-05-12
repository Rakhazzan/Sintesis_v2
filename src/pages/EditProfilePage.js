import React, { useState } from "react";
import "../components/EditProfilePage.css";

const EditProfilePage = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [avatar, setAvatar] = useState(user.avatar || "");

  return (
    <div className="edit-profile-main">
      <h2>Editar perfil</h2>
      <div className="edit-profile-avatar-wrap">
        <img className="edit-profile-avatar" src={avatar} alt={name} />
      </div>
      <form className="edit-profile-form" onSubmit={e => { e.preventDefault(); onSave({ name, email, avatar }); }}>
        <label>Nombre
          <input value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>Foto de perfil (URL)
          <input value={avatar} onChange={e => setAvatar(e.target.value)} />
        </label>
        <div className="edit-profile-actions">
          <button className="edit-profile-save" type="submit">Guardar</button>
          <button className="edit-profile-cancel" type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
