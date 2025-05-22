import React from "react";
import "../components/PersonPage.css";

const PersonPage = ({ user, onEdit }) => (
  <div className="person-main">
    <div className="person-avatar-wrap">
      <img className="person-avatar" src={user.avatar} alt={user.name} />
    </div>
    <div className="person-info">
      <div className="person-name">{user.name}</div>
      <div className="person-email">{user.email}</div>
      <button className="person-edit-btn" onClick={onEdit}>Editar perfil</button>
    </div>
  </div>
);

export default PersonPage;
