/**
 * Utilidades para la autenticación y persistencia de sesión usando Supabase
 */

import supabase from './supabaseUtils';

/**
 * Inicia sesión y guarda los datos del usuario en Supabase
 * @param {Object} userData - Datos del usuario para iniciar sesión (email, password)
 * @returns {Promise} Promesa que resuelve con los datos del usuario o rechaza con error
 */
export async function saveAuthData(userData) {
  try {
    console.log('Iniciando sesión con:', userData.email);
    
    // Iniciar sesión con Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password || '12345678' // Password por defecto para desarrollo
    });
    
    if (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
    
    console.log('Sesión iniciada correctamente, ID de usuario:', data.user.id);
    
    // Obtener los datos existentes del usuario desde la tabla users
    const { data: existingUserData, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();
      
    if (fetchError && fetchError.code !== 'PGRST116') { // Ignorar error si el usuario no existe
      console.error('Error al obtener datos de usuario existente:', fetchError);
    }
    
    console.log('Datos existentes del usuario:', existingUserData);
    
    // Preparar datos del usuario para guardar/actualizar
    const userDataToSave = {
      id: data.user.id,
      email: userData.email,
      name: existingUserData?.name || data.user.user_metadata.name || userData.email.split('@')[0] || 'Usuario',
      avatar: existingUserData?.avatar || '',
      preferences: existingUserData?.preferences || {}
    };
    
    console.log('Guardando datos de usuario en la tabla users:', userDataToSave);
    
    // Guardamos/actualizamos los datos del usuario en la tabla users
    const { data: savedUserData, error: userError } = await supabase
      .from('users')
      .upsert(userDataToSave)
      .select()
      .single();
    
    if (userError) {
      console.error('Error al guardar datos de usuario:', userError);
      throw userError;
    }
    
    console.log('Datos de usuario guardados correctamente:', savedUserData);
    
    // Devolvemos un objeto completo con todos los datos que necesitamos
    return {
      session: data.session,
      user: savedUserData || userDataToSave // Si no hay datos guardados, usamos los que intentamos guardar
    };
  } catch (error) {
    console.error('Error inesperado en saveAuthData:', error);
    throw error;
  }
}

/**
 * Recupera los datos de autenticación desde Supabase
 * @returns {Promise<Object|null>} Promesa que resuelve con los datos del usuario o null si no hay sesión
 */
export async function getAuthData() {
  try {
    // Obtener sesión activa de Supabase
    const { data: authData } = await supabase.auth.getSession();
    console.log('Session data:', authData);
  
    if (!authData.session) {
      console.log('No active session found');
      return null;
    }
  
    // Obtener los datos de perfil adicionales de la tabla users
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.session.user.id)
      .single();
  
    if (error) {
      console.error('Error al obtener datos de usuario:', error);
      return null;
    }
    
    console.log('User data loaded from database:', userData);
    
    // Asegurarse de que tenemos al menos un objeto con datos básicos
    const completeUserData = {
      id: authData.session.user.id,
      email: authData.session.user.email,
      name: userData?.name || authData.session.user.email.split('@')[0] || 'Usuario',
      avatar: userData?.avatar || '',
      ...userData
    };
    
    console.log('Complete user data:', completeUserData);
    
    return {
      user: completeUserData,
      token: authData.session.access_token
    };
  } catch (error) {
    console.error('Error unexpected in getAuthData:', error);
    return null;
  }
}

/**
 * Cierra la sesión del usuario en Supabase
 * @returns {Promise} Promesa que resuelve cuando se ha cerrado la sesión
 */
export async function clearAuthData() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
  
  return { success: true };
}

/**
 * Comprueba si hay una sesión activa en Supabase
 * @returns {Promise<boolean>} Promesa que resuelve con true si hay una sesión activa
 */
export async function hasActiveSession() {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

/**
 * Versión síncrona que verifica si hay una sesión en el cliente
 * Útil para renderizado condicional mientras se cargan los datos
 * @returns {boolean} true si parece haber una sesión según el cliente
 */
export function hasActiveSessionSync() {
  try {
    // Supabase guarda la sesión en localStorage con esta clave
    return !!localStorage.getItem('sb-' + process.env.REACT_APP_SUPABASE_URL.split('//')[1].split('.')[0] + '-auth-token');
  } catch (error) {
    console.error('Error al verificar sesión de Supabase:', error);
    return false;
  }
}

/**
 * Registra un nuevo usuario en Supabase
 * @param {Object} userData - Datos del usuario a registrar
 * @returns {Promise} Promesa que resuelve con los datos del usuario
 */
export async function registerUser(userData) {
  // Registrar usuario en Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password || '12345678', // Para desarrollo
    options: {
      data: {
        name: userData.name
      }
    }
  });
  
  if (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
  
  if (!data.user) {
    throw new Error('No se pudo crear el usuario');
  }
  
  // Guardar datos adicionales en la tabla users
  const { error: upsertError } = await supabase
    .from('users')
    .upsert({
      id: data.user.id,
      email: userData.email,
      name: userData.name,
      avatar: userData.avatar || '', 
      preferences: {}
    });
  
  if (upsertError) {
    console.error('Error al guardar datos de usuario:', upsertError);
    throw upsertError;
  }
  
  return data;
}

/**
 * Actualiza el perfil del usuario en Supabase
 * @param {Object} userData - Datos del usuario a actualizar
 * @returns {Promise} Promesa que resuelve con el resultado de la operación
 */
export async function updateUserProfile(userData) {
  if (!userData || !userData.id) {
    throw new Error('Se requiere un ID de usuario para actualizar el perfil');
  }
  
  try {
    // Obtener sesión actual para verificar que estamos autenticados
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session) {
      throw new Error('No hay sesión activa, debes iniciar sesión nuevamente');
    }
    
    // Actualizar datos en la tabla users
    const { error } = await supabase
      .from('users')
      .update({
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar
      })
      .eq('id', userData.id);
    
    if (error) {
      throw error;
    }
    
    return { success: true, user: userData };
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    throw error;
  }
}
