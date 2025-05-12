import React, { useState } from "react";
import "../components/LoginPage.css";

const LoginPage = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-main">
      <h2>Iniciar sesión</h2>
      <form className="login-form" onSubmit={e => { e.preventDefault(); onLogin({ email, password }); }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="login-btn" type="submit">Entrar</button>
      </form>
      <div className="login-register-link">
        ¿No tienes cuenta? <button onClick={onRegister}>Regístrate</button>
      </div>
    </div>
  );
};

export default LoginPage;
