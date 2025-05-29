/**
 * Servicio para manejar operaciones de pacientes
 * Compatible con backend local y Supabase directo en producción
 */

import config from '../config';
import supabase from '../utils/supabaseUtils';

const API_URL = config.apiBaseUrl;

export const getPatients = async () => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { data, error } = await supabase
        .from('patients')
        .select('*');
      
      if (error) throw error;
      return data || [];
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/patients`);
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      return await response.json();
    }
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    return [];
  }
};

export const getPatientById = async (id) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/patients/${id}`);
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      return await response.json();
    }
  } catch (error) {
    console.error(`Error al obtener paciente con ID ${id}:`, error);
    return null;
  }
};

export const createPatient = async (patientData) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { data, error } = await supabase
        .from('patients')
        .insert([patientData])
        .select();
      
      if (error) throw error;
      return data[0];
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/patients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
      });
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      return await response.json();
    }
  } catch (error) {
    console.error('Error al crear paciente:', error);
    throw error;
  }
};

export const updatePatient = async (id, patientData) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { data, error } = await supabase
        .from('patients')
        .update(patientData)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data[0];
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/patients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
      });
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      return await response.json();
    }
  } catch (error) {
    console.error(`Error al actualizar paciente con ID ${id}:`, error);
    throw error;
  }
};

export const deletePatient = async (id) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { success: true, message: 'Paciente eliminado correctamente' };
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/patients/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      return await response.json();
    }
  } catch (error) {
    console.error(`Error al eliminar paciente con ID ${id}:`, error);
    throw error;
  }
};
