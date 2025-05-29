import { createClient } from '@supabase/supabase-js';
import config from '../config';

// Obtener valores de configuración de Supabase
const supabaseUrl = config.supabase.url || process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = config.supabase.anonKey || process.env.REACT_APP_SUPABASE_ANON_KEY;

// Crear y exportar el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

// Función de ayuda para manejar errores de Supabase
export const handleSupabaseError = (error) => {
  console.error('Error de Supabase:', error);
  
  // Mensajes de error más amigables según el tipo de error
  if (error.code === 'auth/invalid-email') {
    return 'El email proporcionado no es válido';
  }
  
  if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
    return 'Credenciales incorrectas';
  }
  
  if (error.code === 'auth/too-many-requests') {
    return 'Demasiados intentos fallidos. Por favor, inténtalo más tarde';
  }
  
  // Para cualquier otro error, devolver un mensaje genérico o el mensaje original
  return error.message || 'Ha ocurrido un error en la comunicación con el servidor';
};
