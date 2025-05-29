/**
 * Servicio para manejar operaciones de citas con el backend
 */

const API_URL = 'http://localhost:4000/api';

export const getAppointments = async () => {
  try {
    const response = await fetch(`${API_URL}/appointments`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error del servidor:', errorData);
      throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener citas:', error);
    return [];
  }
};

export const getAppointmentsByDate = async (date) => {
  try {
    const response = await fetch(`${API_URL}/appointments/date/${date}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error del servidor:', errorData);
      throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener citas por fecha:', error);
    return [];
  }
};

export const createAppointment = async (appointmentData) => {
  try {
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
  } catch (error) {
    console.error('Error al crear cita:', error);
    throw error;
  }
};

export const updateAppointment = async (id, appointmentData) => {
  try {
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
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    throw error;
  }
};

export const deleteAppointment = async (id) => {
  try {
    const response = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error del servidor:', errorData);
      throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    throw error;
  }
};

export const updateAppointmentStatus = async (id, status) => {
  try {
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
  } catch (error) {
    console.error('Error al actualizar estado de cita:', error);
    throw error;
  }
};
