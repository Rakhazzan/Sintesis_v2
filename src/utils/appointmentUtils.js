import supabase from './supabaseUtils';

/**
 * Utilidades para manejar las citas utilizando Supabase
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

/**
 * Obtiene todas las citas desde la API
 * @returns {Promise<Array>} Promesa que resuelve con la lista de citas
 */
export async function getAllAppointments() {
  try {
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('appointments')
      .select('*, patient:patients(*)');

    if (error) {
      console.error('Error al obtener citas desde Supabase:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error al obtener citas:', error);
    // Fallback a fetch si hay algún problema con Supabase
    try {
      const response = await fetch(`${API_URL}/appointments`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (fetchError) {
      console.error('Error al obtener citas con fetch:', fetchError);
      // Si todo falla, devolvemos un array vacío para evitar errores en el frontend
      return [];
    }
  }
}

/**
 * Obtiene las citas para una fecha específica
 * @param {string} date - Fecha en formato YYYY-MM-DD
 * @returns {Promise<Array>} Promesa que resuelve con la lista de citas para esa fecha
 */
export async function getAppointmentsByDate(date) {
  try {
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('appointments')
      .select('*, patient:patients(*)')
      .eq('date', date);

    if (error) {
      console.error(`Error al obtener citas para la fecha ${date}:`, error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error al obtener citas para la fecha ${date}:`, error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/appointments/date/${date}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (fetchError) {
      console.error('Error al obtener citas con fetch:', fetchError);
      return [];
    }
  }
}

/**
 * Crea una nueva cita
 * @param {Object} appointmentData - Datos de la cita a crear
 * @returns {Promise<Object>} Promesa que resuelve con la cita creada
 */
export async function createAppointment(appointmentData) {
  try {
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select();

    if (error) {
      console.error('Error al crear cita en Supabase:', error);
      throw error;
    }
    
    return data[0];
  } catch (error) {
    console.error('Error al crear cita:', error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (fetchError) {
      console.error('Error al crear cita con fetch:', fetchError);
      throw fetchError;
    }
  }
}

/**
 * Actualiza una cita existente
 * @param {string} id - ID de la cita a actualizar
 * @param {Object} appointmentData - Nuevos datos de la cita
 * @returns {Promise<Object>} Promesa que resuelve con la cita actualizada
 */
export async function updateAppointment(id, appointmentData) {
  try {
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('appointments')
      .update(appointmentData)
      .eq('id', id)
      .select();

    if (error) {
      console.error(`Error al actualizar cita ${id} en Supabase:`, error);
      throw error;
    }
    
    return data[0];
  } catch (error) {
    console.error(`Error al actualizar cita ${id}:`, error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (fetchError) {
      console.error('Error al actualizar cita con fetch:', fetchError);
      throw fetchError;
    }
  }
}

/**
 * Elimina una cita
 * @param {string} id - ID de la cita a eliminar
 * @returns {Promise<Object>} Promesa que resuelve cuando la cita ha sido eliminada
 */
export async function deleteAppointment(id) {
  try {
    // Versión directa con Supabase
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error al eliminar cita ${id} en Supabase:`, error);
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error(`Error al eliminar cita ${id}:`, error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (fetchError) {
      console.error('Error al eliminar cita con fetch:', fetchError);
      throw fetchError;
    }
  }
}

/**
 * Actualiza el estado de una cita
 * @param {string} id - ID de la cita
 * @param {string} status - Nuevo estado (confirmed, pending, cancelled)
 * @returns {Promise<Object>} Promesa que resuelve con la cita actualizada
 */
export async function updateAppointmentStatus(id, status) {
  try {
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) {
      console.error(`Error al actualizar estado de cita ${id} en Supabase:`, error);
      throw error;
    }
    
    return data[0];
  } catch (error) {
    console.error(`Error al actualizar estado de cita ${id}:`, error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (fetchError) {
      console.error('Error al actualizar estado de cita con fetch:', fetchError);
      throw fetchError;
    }
  }
}
