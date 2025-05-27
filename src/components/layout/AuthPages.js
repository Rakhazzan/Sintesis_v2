import React from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import '../../styles/AuthPages.css';

const AuthPages = () => {
  const { 
    loginError, 
    registering, 
    setRegistering, 
    login, 
    register, 
    resendConfirmation 
  } = useAuth();

  // Extraer el email del mensaje de error si es un error de "Email not confirmed"
  let emailFromError = "";
  if (loginError && loginError.includes('correo electrónico')) {
    const matches = loginError.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
    if (matches && matches.length > 0) {
      emailFromError = matches[0];
    }
  }

  if (registering) {
    return <RegisterPage 
      onRegister={register} 
      onLogin={() => setRegistering(false)} 
    />;
  }

  return (
    <LoginPage 
      onLogin={login} 
      onRegister={() => {
        setRegistering(true);
      }} 
      error={loginError}
      onResendConfirmation={resendConfirmation}
      lastEmail={emailFromError}
    />
  );
};

export default AuthPages;
