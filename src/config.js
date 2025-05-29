/**
 * Configuración centralizada de la aplicación
 * Gestiona diferentes valores según el entorno (desarrollo/producción)
 */

const isProduction = process.env.NODE_ENV === 'production' || process.env.REACT_APP_PRODUCTION === 'true';

const config = {
  // API base URL - En producción se usa Supabase directamente
  apiBaseUrl: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
  
  // Determina si usar Supabase directamente (en producción) o el backend (en desarrollo)
  isDirectSupabase: isProduction,
  
  // Ambiente actual
  environment: isProduction ? 'production' : 'development',
  
  // Supabase config
  supabase: {
    url: process.env.REACT_APP_SUPABASE_URL,
    anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY
  },
  
  // Configuración de notificaciones
  notifications: {
    duration: 5000, // duración en ms
    position: 'top-right'
  },
  
  // Configuración de la aplicación
  app: {
    name: 'Clínica Síntesi',
    version: '1.0.0',
    defaultLanguage: 'es-ES',
    supportEmail: 'soporte@clinicasintesi.com'
  }
};

export default config;
