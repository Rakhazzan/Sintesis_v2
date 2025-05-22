import supabase from './supabaseUtils';

/**
 * Utilidades para manejar el tema de la aplicación utilizando Supabase
 */

/**
 * Guarda la preferencia de tema del usuario en Supabase
 * @param {boolean} isDarkMode - Verdadero si el tema es oscuro
 * @param {string} userId - ID del usuario
 * @returns {Promise} Promesa que resuelve con el resultado de la operación
 */
export async function saveThemePreference(userId, isDarkMode) {
  // Solo actualizar en Supabase si tenemos el userId
  if (!userId) {
    console.error('No se puede guardar el tema en Supabase sin userId');
    return { success: false, error: 'Usuario no identificado' };
  }
  
  const themeValue = isDarkMode ? 'dark' : 'light';
  
  try {
    // Actualizar preferencias del usuario en Supabase
    const { error } = await supabase
      .from('users')
      .update({
        preferences: { theme: themeValue }
      })
      .eq('id', userId);
    
    if (error) {
      console.error('Error al guardar preferencia de tema:', error);
      return { success: false, error };
    }
    
    return { success: true };
  } catch (err) {
    console.error('Error al guardar tema:', err);
    return { success: false, error: err };
  }
}

/**
 * Obtiene la preferencia de tema del usuario desde Supabase
 * @param {string} userId - ID del usuario
 * @returns {Promise<boolean>} Promesa que resuelve con true si el tema es oscuro
 */
export async function getThemePreference(userId) {
  // Obtener la preferencia del sistema operativo como fallback
  const prefersDarkMode = window.matchMedia && 
                        window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Si no hay usuario, usamos la preferencia del sistema
  if (!userId) {
    return prefersDarkMode;
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('preferences')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('Error al obtener preferencia de tema:', error);
      // Fallback a preferencia del sistema
      return prefersDarkMode;
    }

    const preferences = data.preferences || {};
    if (!preferences.theme) {
      // Si no hay preferencia guardada, usamos preferencia del sistema
      return prefersDarkMode;
    }

    return preferences.theme === 'dark';
  } catch (error) {
    console.error('Error inesperado al obtener tema:', error);
    // Fallback a preferencia del sistema
    return prefersDarkMode;
  }
}

/**
 * Aplica el tema a los elementos del DOM
 * @param {boolean} isDarkMode - Verdadero si el tema es oscuro
 */
export function applyThemeClass(isDarkMode) {
  // Lista de elementos a los que aplicar la clase
  const elements = [
    document.documentElement,
    document.body,
    document.getElementById('root'),
    document.querySelector('.app'),
    document.querySelector('.main-app'),
    document.querySelector('.main-content')
  ];
  
  // Aplicar o quitar la clase de todos los elementos
  elements.forEach(el => {
    if (el) {
      if (isDarkMode) {
        el.classList.add('dark-theme');
      } else {
        el.classList.remove('dark-theme');
      }
    }
  });
}
