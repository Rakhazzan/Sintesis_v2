// Configuración centralizada para manejar diferentes entornos
const isProduction = process.env.NODE_ENV === 'production';

// URLs base para las API
const config = {
  // URL base para las API
  apiBaseUrl: isProduction 
    ? 'https://clinica-sintesi-backend.vercel.app/api' // Cambia esto a la URL de tu backend desplegado
    : 'http://localhost:4000/api',
  
  // Configuración de Supabase (ya existe en .env)
  supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
  supabaseKey: process.env.REACT_APP_SUPABASE_ANON_KEY,
  
  // Otras configuraciones específicas por entorno
  isDirectSupabase: isProduction, // Si es true, usa Supabase directamente en producción
};

export default config;
