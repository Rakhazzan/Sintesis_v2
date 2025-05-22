import { createClient } from '@supabase/supabase-js';

// Inicializar cliente de Supabase para el frontend
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL o Anon Key no encontrados. Verifica tus variables de entorno.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
