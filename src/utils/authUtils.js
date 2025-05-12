/**
 * Utilidades para la autenticación y persistencia de sesión
 */

const AUTH_TOKEN_KEY = 'clinica_auth_token';
const USER_DATA_KEY = 'clinica_user_data';

/**
 * Guarda los datos de autenticación en localStorage
 * @param {Object} userData - Datos del usuario a guardar
 * @param {string} token - Token de autenticación
 */
export function saveAuthData(userData, token = 'simulated-auth-token') {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

/**
 * Recupera los datos de autenticación desde localStorage
 * @returns {Object|null} Datos del usuario o null si no hay sesión
 */
export function getAuthData() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const userData = localStorage.getItem(USER_DATA_KEY);
  
  if (!token || !userData) {
    return null;
  }
  
  try {
    return {
      user: JSON.parse(userData),
      token
    };
  } catch (error) {
    console.error('Error parsing auth data', error);
    return null;
  }
}

/**
 * Borra los datos de autenticación de localStorage
 */
export function clearAuthData() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
}

/**
 * Comprueba si hay una sesión activa
 * @returns {boolean} true si hay una sesión activa
 */
export function hasActiveSession() {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
}
