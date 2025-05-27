import React, { createContext, useState, useContext, useEffect } from "react";
import { getThemePreference, saveThemePreference, applyThemeClass } from "../utils/themeUtils";

// Crear el contexto del tema
export const ThemeContext = createContext();

// Hook personalizado para usar el contexto
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  // Estado para controlar el tema (claro/oscuro)
  const [darkMode, setDarkMode] = useState(() => {
    // Inicialmente usamos la preferencia del sistema
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [loading, setLoading] = useState(true);
  
  // Función para cambiar el tema
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };
  
  // Cargar preferencia de tema guardada
  useEffect(() => {
    async function loadThemePreference(userId) {
      try {
        if (userId) {
          const isDarkMode = await getThemePreference(userId);
          setDarkMode(isDarkMode);
        }
      } catch (error) {
        console.error('Error al cargar preferencia de tema:', error);
      } finally {
        setLoading(false);
      }
    }
    
    // El userId se actualizará cuando el contexto de Auth esté disponible
    const userId = localStorage.getItem('userId');
    if (userId) {
      loadThemePreference(userId);
    } else {
      setLoading(false);
    }
  }, []);
  
  // Aplicar el tema a toda la aplicación cuando cambia
  useEffect(() => {
    // Aplicar el tema visualmente
    applyThemeClass(darkMode);
    
    // Guardar preferencia si no estamos cargando
    if (!loading) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        saveThemePreference(userId, darkMode).catch(error => {
          console.error('Error al guardar preferencia de tema:', error);
        });
      }
    }
  }, [darkMode, loading]);
  
  return (
    <ThemeContext.Provider value={{
      darkMode,
      toggleTheme,
      loading
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
