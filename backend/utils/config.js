/**
 * Configuración centralizada para el backend
 * Exporta variables de configuración utilizadas en diferentes partes de la aplicación
 */

// Cargar variables de entorno
require('dotenv').config();

module.exports = {
  // Puerto para el servidor Express
  PORT: process.env.PORT || 4000,
  
  // URL de la base de datos Supabase
  SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
  
  // Clave anónima de Supabase para operaciones públicas
  SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY,
  
  // Clave de servicio de Supabase para operaciones del backend (más privilegios)
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  
  // Entorno de la aplicación
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Configuración CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Tiempo de expiración del token JWT (en segundos)
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || 86400 // 24 horas
};
