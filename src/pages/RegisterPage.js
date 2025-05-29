import React, { useState, useEffect } from "react";
import "../components/RegisterPage.css";
import AuthBackgroundEffect from "../components/AuthBackgroundEffect";

const RegisterPage = ({ onRegister, onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Aplicar la clase auth-page al div root al montar el componente
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.classList.add('auth-page');
    }
    
    // Limpiar al desmontar
    return () => {
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.classList.remove('auth-page');
      }
    };
  }, []);

  return (
    <div className="register-main">
      <AuthBackgroundEffect />
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
