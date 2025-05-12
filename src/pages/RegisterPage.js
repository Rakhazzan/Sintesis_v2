import React, { useState } from "react";
import "../components/RegisterPage.css";

const RegisterPage = ({ onRegister, onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="register-main">
      <h2>Crear cuenta</h2>
      <form className="register-form" onSubmit={e => { e.preventDefault(); onRegister({ name, email, password }); }}>
        <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="register-btn" type="submit">Registrarse</button>
      </form>
      <div className="register-login-link">
        ¿Ya tienes cuenta? <button onClick={onLogin}>Inicia sesión</button>
      </div>
    </div>
  );
};

export default RegisterPage;
