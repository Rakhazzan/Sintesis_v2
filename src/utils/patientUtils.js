import supabase from './supabaseUtils';

/**
 * Utilidades para manejar pacientes utilizando Supabase
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

/**
 * Obtiene todos los pacientes
 * @returns {Promise<Array>} Promesa que resuelve con la lista de pacientes
 */
export async function getAllPatients() {
  try {
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('patients')
      .select('*');

    if (error) {
      console.error('Error al obtener pacientes desde Supabase:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/patients`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (fetchError) {
      console.error('Error al obtener pacientes con fetch:', fetchError);
      return [];
    }
  }
}

/**
 * Obtiene un paciente por su ID
 * @param {string} id - ID del paciente
 * @returns {Promise<Object>} Promesa que resuelve con los datos del paciente
 */
export async function getPatientById(id) {
  try {
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error al obtener paciente ${id} desde Supabase:`, error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error al obtener paciente ${id}:`, error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/patients/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (fetchError) {
      console.error('Error al obtener paciente con fetch:', fetchError);
      return null;
    }
  }
}

/**
 * Busca pacientes por nombre
 * @param {string} query - Término de búsqueda
 * @returns {Promise<Array>} Promesa que resuelve con la lista de pacientes que coinciden
 */
export async function searchPatients(query) {
  try {
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .ilike('name', `%${query}%`);

    if (error) {
      console.error(`Error al buscar pacientes con '${query}' desde Supabase:`, error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error al buscar pacientes con '${query}':`, error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/patients/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (fetchError) {
      console.error('Error al buscar pacientes con fetch:', fetchError);
      return [];
    }
  }
}

/**
 * Crea un nuevo paciente
 * @param {Object} patientData - Datos del paciente a crear
 * @returns {Promise<Object>} Promesa que resuelve con el paciente creado
 */
export async function createPatient(patientData) {
  try {
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('patients')
      .insert([patientData])
      .select();

    if (error) {
      console.error('Error al crear paciente en Supabase:', error);
      throw error;
    }
    
    return data[0];
  } catch (error) {
    console.error('Error al crear paciente:', error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/patients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (fetchError) {
      console.error('Error al crear paciente con fetch:', fetchError);
      throw fetchError;
    }
  }
}

/**
 * Actualiza un paciente existente
 * @param {string} id - ID del paciente a actualizar
 * @param {Object} patientData - Nuevos datos del paciente
 * @returns {Promise<Object>} Promesa que resuelve con el paciente actualizado
 */
export async function updatePatient(id, patientData) {
  try {
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('patients')
      .update(patientData)
      .eq('id', id)
      .select();

    if (error) {
      console.error(`Error al actualizar paciente ${id} en Supabase:`, error);
      throw error;
    }
    
    return data[0];
  } catch (error) {
    console.error(`Error al actualizar paciente ${id}:`, error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/patients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (fetchError) {
      console.error('Error al actualizar paciente con fetch:', fetchError);
      throw fetchError;
    }
  }
}

/**
 * Elimina un paciente
 * @param {string} id - ID del paciente a eliminar
 * @returns {Promise<Object>} Promesa que resuelve cuando el paciente ha sido eliminado
 */
export async function deletePatient(id) {
  try {
    // Versión directa con Supabase
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error al eliminar paciente ${id} en Supabase:`, error);
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error(`Error al eliminar paciente ${id}:`, error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/patients/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (fetchError) {
      console.error('Error al eliminar paciente con fetch:', fetchError);
      throw fetchError;
    }
  }
}
