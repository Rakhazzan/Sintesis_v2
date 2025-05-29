/**
 * Servicio para manejar operaciones de citas
 * Compatible con backend local y Supabase directo en producción
 */

import config from '../config';
import supabase from '../utils/supabaseUtils';

const API_URL = config.apiBaseUrl;

export const getAppointments = async () => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { data, error } = await supabase
        .from('appointments')
        .select('*');
      
      if (error) throw error;
      return data || [];
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/appointments/all`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
      }
      
      return await response.json();
    }
  } catch (error) {
    console.error('Error al obtener todas las citas:', error);
    return [];
  }
};

export const getAppointmentsByDate = async (date) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('date', date);
      
      if (error) throw error;
      return data || [];
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/appointments/date/${date}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
      }
      
      return await response.json();
    }
  } catch (error) {
    console.error('Error al obtener citas por fecha:', error);
    return [];
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentData])
        .select();
      
      if (error) throw error;
      return data[0];
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      });
      
      // Si la respuesta no es exitosa, intentamos obtener el mensaje de error del servidor
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
      }
      
      return await response.json();
    }
  } catch (error) {
    console.error('Error al crear cita:', error);
    throw error;
  }
};

export const updateAppointment = async (id, appointmentData) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { data, error } = await supabase
        .from('appointments')
        .update(appointmentData)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data[0];
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
      }
      
      return await response.json();
    }
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    throw error;
  }
};

export const deleteAppointment = async (id) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { success: true, message: 'Cita eliminada correctamente' };
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
      }
      
      return await response.json();
    }
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    throw error;
  }
};

export const updateAppointmentStatus = async (id, status) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { data, error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data[0];
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/appointments/${id}/status`, {
        method: 'PATCH', // Cambiado de PUT a PATCH para que coincida con la ruta del backend
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
      }
      
      return await response.json();
    }
  } catch (error) {
    console.error('Error al actualizar estado de cita:', error);
    throw error;
  }
};
