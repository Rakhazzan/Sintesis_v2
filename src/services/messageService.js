/**
 * Servicio para manejar operaciones de mensajes con el backend
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Verificar nuevos correos electrónicos vía IMAP
export const checkNewEmails = async () => {
  try {
    const response = await fetch(`${API_URL}/imap/check`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error al verificar correos:', errorData);
      throw new Error(errorData.error || errorData.message || 'Error al verificar correos');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al verificar correos electrónicos:', error);
    throw error;
  }
};

// Configurar verificación automática de correos
export const setupAutoCheckEmails = async (intervalMinutes = 5) => {
  try {
    const response = await fetch(`${API_URL}/imap/auto-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ intervalMinutes })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error al configurar verificación automática:', errorData);
      throw new Error(errorData.error || errorData.message || 'Error al configurar verificación automática');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al configurar verificación automática:', error);
    throw error;
  }
};

// Detener verificación automática de correos
export const stopAutoCheckEmails = async () => {
  try {
    const response = await fetch(`${API_URL}/imap/auto-check`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error al detener verificación automática:', errorData);
      throw new Error(errorData.error || errorData.message || 'Error al detener verificación automática');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al detener verificación automática:', error);
    throw error;
  }
};

export const getUserMessages = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/messages/user/${userId}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error del servidor:', errorData);
      throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener mensajes del usuario:', error);
    return [];
  }
};

export const getConversation = async (userId1, userId2) => {
  try {
    const response = await fetch(`${API_URL}/messages/conversation/${userId1}/${userId2}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error del servidor:', errorData);
      throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener conversación:', error);
    return [];
  }
};

export const createMessage = async (messageData) => {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error del servidor:', errorData);
      throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al crear mensaje:', error);
    throw error;
  }
};

export const markAsRead = async (messageId) => {
  try {
    const response = await fetch(`${API_URL}/messages/${messageId}/read`, {
      method: 'PATCH'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error del servidor:', errorData);
      throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al marcar mensaje como leído:', error);
    throw error;
  }
};

export const deleteMessage = async (messageId) => {
  try {
    const response = await fetch(`${API_URL}/messages/${messageId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error del servidor:', errorData);
      throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al eliminar mensaje:', error);
    throw error;
  }
};

export const countUnreadMessages = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/messages/unread/${userId}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error del servidor:', errorData);
      throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al contar mensajes no leídos:', error);
    return { count: 0 };
  }
};

export const sendPatientEmail = async (emailData) => {
  try {
    const response = await fetch(`${API_URL}/messages/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    }).catch(err => {
      // Manejar error de conexión (servidor no disponible)
      console.error('Error de conexión:', err);
      throw new Error('No se pudo conectar con el servidor. Asegúrate de que el servidor backend esté en ejecución.');
    });
    
    if (!response) return; // Si hay un error de conexión, se manejará en el catch anterior
    
    if (response.status === 404) {
      console.error('Ruta no encontrada: /api/messages/email');
      throw new Error('El endpoint para enviar emails no está disponible. Verifica que el servidor backend esté correctamente configurado.');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'Error en el formato de respuesta del servidor'
      }));
      console.error('Error del servidor:', errorData);
      throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al enviar emails a pacientes:', error);
    throw error;
  }
};
