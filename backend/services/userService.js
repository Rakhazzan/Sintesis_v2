const supabase = require('./supabaseClient');

// Servicio para manejar las operaciones de usuarios con Supabase
const userService = {
  // Obtener un usuario por su ID
  getUserById: async (id) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
    
    return data;
  },
  
  // Obtener un usuario por su email
  getUserByEmail: async (email) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
    
    return data;
  },
  
  // Crear un nuevo usuario
  createUser: async (userData) => {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();
    
    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }
    
    return data[0];
  },
  
  // Actualizar un usuario existente (para edición de perfil)
  updateUser: async (id, userData) => {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating user:', error);
      throw error;
    }
    
    return data[0];
  },
  
  // Actualizar preferencias de usuario (incluye tema oscuro/claro)
  updateUserPreferences: async (id, preferences) => {
    // Primero obtenemos las preferencias actuales
    const { data: currentUser, error: fetchError } = await supabase
      .from('users')
      .select('preferences')
      .eq('id', id)
      .single();
    
    if (fetchError) {
      console.error('Error fetching user preferences:', fetchError);
      throw fetchError;
    }
    
    // Combinamos las preferencias existentes con las nuevas
    const updatedPreferences = {
      ...(currentUser?.preferences || {}),
      ...preferences
    };
    
    // Actualizamos en la base de datos
    const { data, error } = await supabase
      .from('users')
      .update({ preferences: updatedPreferences })
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating user preferences:', error);
      throw error;
    }
    
    return data[0];
  },
  
  // Obtener preferencias de usuario (para restaurar tema, idioma, etc.)
  getUserPreferences: async (id) => {
    const { data, error } = await supabase
      .from('users')
      .select('preferences')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching user preferences:', error);
      throw error;
    }
    
    return data?.preferences || {};
  }
};

module.exports = userService;
