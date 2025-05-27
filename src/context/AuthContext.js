import React, { createContext, useState, useContext, useEffect } from "react";
import { 
  saveAuthData, 
  getAuthData, 
  clearAuthData, 
  hasActiveSessionSync, 
  registerUser, 
  updateUserProfile 
} from "../utils/authUtils";
import supabase from "../utils/supabaseUtils";
import { notifyService } from "../components/NotificationManager";

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const wasInAuthScreen = () => {
    return sessionStorage.getItem('currentScreen') === 'login' || 
           sessionStorage.getItem('currentScreen') === 'register';
  };

  const [user, setUser] = useState();
  const [auth, setAuth] = useState(() => !wasInAuthScreen() && hasActiveSessionSync());
  const [registering, setRegistering] = useState(() => sessionStorage.getItem('currentScreen') === 'register');
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar datos del usuario al iniciar
  useEffect(() => {
    async function loadUserData() {
      if (!wasInAuthScreen() && hasActiveSessionSync()) {
        try {
          const authData = await getAuthData();
          if (authData && authData.user) {
            setUser(authData.user);
            setAuth(true);
          }
        } catch (error) {
          console.error('Error al obtener datos de usuario:', error);
        }
      }
      setLoading(false);
    }
    
    loadUserData();
  }, []);

  // Login con Supabase
  const handleLogin = async (data) => {
    try {
      setLoginError("");
      setLoading(true);
      
      const authResponse = await saveAuthData(data);
      
      if (authResponse && authResponse.user) {
        setUser(authResponse.user);
        setAuth(true);
        notifyService.success('¡Bienvenido/a ' + authResponse.user.name + '!');
      } else {
        setLoginError('Error al obtener datos de usuario');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      
      if (error.message && error.message.includes('Email not confirmed')) {
        setLoginError('Es necesario confirmar tu correo electrónico para iniciar sesión. Por favor, revisa tu bandeja de entrada.');
      } else {
        setLoginError('Error al iniciar sesión: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Logout
  const handleLogout = async () => {
    try {
      setLoading(true);
      await clearAuthData();
      setAuth(false);
      sessionStorage.setItem('currentScreen', 'login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      notifyService.error('Error al cerrar sesión: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Registro de usuario
  const handleRegister = async (data) => {
    setLoading(true);
    try {
      if (data) {
        const newUser = {
          name: data.name || "Usuario",
          email: data.email,
          password: data.password,
          avatar: ""
        };
        
        const { user } = await registerUser(newUser);
        
        if (user) {
          setRegistering(false);
          setAuth(false);
          notifyService.success('Registro exitoso. Por favor, inicia sesión con tus credenciales.');
        }
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      notifyService.error('Error al registrar: ' + (error.message || 'Intente de nuevo'));
    } finally {
      setLoading(false);
    }
  };

  // Actualización de perfil
  const handleSaveProfile = async (data) => {
    try {
      setLoading(true);
      const updatedUser = { ...user, ...data };
      
      const result = await updateUserProfile(updatedUser);
      
      if (result.success) {
        setUser(updatedUser);
        notifyService.success('Perfil actualizado correctamente');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      if (error.message) {
        notifyService.error('Error al guardar perfil: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Reenvío de correo de confirmación
  const handleResendConfirmation = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });
      
      if (error) {
        console.error('Error al reenviar correo de confirmación:', error);
        notifyService.error('Error al reenviar: ' + error.message);
        return false;
      }
      
      notifyService.success('¡Correo de confirmación reenviado! Revisa tu bandeja de entrada.');
      return true;
    } catch (error) {
      console.error('Error inesperado al reenviar correo:', error);
      notifyService.error('Error al reenviar: ' + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Exportar las funciones y estados a través del contexto
  return (
    <AuthContext.Provider value={{
      user,
      auth,
      loading,
      loginError,
      registering,
      setRegistering,
      login: handleLogin,
      logout: handleLogout,
      register: handleRegister,
      saveProfile: handleSaveProfile,
      resendConfirmation: handleResendConfirmation
    }}>
      {children}
    </AuthContext.Provider>
  );
}
