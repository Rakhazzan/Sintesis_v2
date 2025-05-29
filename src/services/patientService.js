/**
 * Servicio para manejar operaciones de pacientes con el backend
 */

const API_URL = 'http://localhost:4000/api';

export const getPatients = async () => {
  try {
    const response = await fetch(`${API_URL}/patients`);
    if (!response.ok) throw new Error('Error en la respuesta del servidor');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    return [];
  }
};

export const getPatientById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/patients/${id}`);
    if (!response.ok) throw new Error('Error en la respuesta del servidor');
    return await response.json();
  } catch (error) {
    console.error(`Error al obtener paciente con ID ${id}:`, error);
    return null;
  }
};

export const createPatient = async (patientData) => {
  try {
    const response = await fetch(`${API_URL}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patientData)
    });
    if (!response.ok) throw new Error('Error en la respuesta del servidor');
    return await response.json();
  } catch (error) {
    console.error('Error al crear paciente:', error);
    throw error;
  }
};

export const updatePatient = async (id, patientData) => {
  try {
    const response = await fetch(`${API_URL}/patients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patientData)
    });
    if (!response.ok) throw new Error('Error en la respuesta del servidor');
    return await response.json();
  } catch (error) {
    console.error(`Error al actualizar paciente con ID ${id}:`, error);
    throw error;
  }
};

export const deletePatient = async (id) => {
  try {
    const response = await fetch(`${API_URL}/patients/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error en la respuesta del servidor');
    return await response.json();
  } catch (error) {
    console.error(`Error al eliminar paciente con ID ${id}:`, error);
    throw error;
  }
};
