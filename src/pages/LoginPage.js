import React, { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';
import "../components/LoginPage.css";

const LoginPage = ({ onLogin, onRegister, error, onResendConfirmation, lastEmail }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorRef = useRef(null);
  
  // Estado para rastrear si estamos reenviando un correo de confirmación
  const [resending, setResending] = useState(false);
  // Estado para el email guardado (para el caso de reenvío)
  const [savedEmail, setSavedEmail] = useState("");
  
  // Actualizar el email guardado cuando se pasa un nuevo email
  useEffect(() => {
    if (lastEmail) {
      setSavedEmail(lastEmail);
    }
  }, [lastEmail]);
  
  // Capturar el email cuando el usuario lo escribe
  useEffect(() => {
    if (email && !savedEmail) {
      setSavedEmail(email);
    }
  }, [email, savedEmail]);
  
  // Manejar el reenvío de correo de confirmación
  const handleResend = async () => {
    if (!savedEmail && !email) return;
    
    try {
      setResending(true);
      const emailToUse = savedEmail || email;
      await onResendConfirmation(emailToUse);
      // El éxito/error se maneja con notificaciones en la función onResendConfirmation
    } finally {
      setResending(false);
    }
  };
  
  // Efecto para animar el mensaje de error cuando cambia
  useEffect(() => {
    if (error && errorRef.current) {
      // Restauramos las propiedades iniciales antes de animar
      gsap.set(errorRef.current, { opacity: 0, y: -10 });
      
      // Animación de entrada con rebote
      gsap.to(errorRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.2)"
      });
      
      // Añadimos un pequeño shake para llamar la atención
      if (error.toLowerCase().includes('correo electrónico') || error.toLowerCase().includes('email not confirmed')) {
        gsap.to(errorRef.current, {
          x: 5,
          duration: 0.1,
          repeat: 4,
          yoyo: true,
          delay: 0.4
        });
      }
    }
  }, [error]);

  return (
    <div className="login-main">
      <h2>Iniciar sesión</h2>
      <form className="login-form" onSubmit={e => { e.preventDefault(); onLogin({ email, password }); }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        
        {/* Área para mostrar mensaje de error animado */}
        {error && (
          <div className="login-error-container">
            <div ref={errorRef} className="login-error-message">
              {error}
            </div>
            
            {/* Mostrar el botón de reenvío solo si es un error de email no confirmado */}
            {error.toLowerCase().includes('correo electrónico') && (
              <button 
                type="button" 
                className="login-resend-link" 
                onClick={handleResend} 
                disabled={resending}
              >
                {resending ? 'Reenviando...' : 'Reenviar correo de confirmación'}
              </button>
            )}
          </div>
        )}
        
        <button className="login-btn" type="submit">Entrar</button>
      </form>
      <div className="login-register-link">
        ¿No tienes cuenta? <button onClick={onRegister}>Regístrate</button>
      </div>
    </div>
  );
};

export default LoginPage;
