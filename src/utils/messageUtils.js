import supabase from './supabaseUtils';

/**
 * Utilidades para manejar mensajes utilizando Supabase
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

/**
 * Obtiene todos los mensajes de un usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Array>} Promesa que resuelve con la lista de mensajes
 */
export async function getUserMessages(userId) {
  try {
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:users!sender_id(*), receiver:users!receiver_id(*)')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error al obtener mensajes del usuario ${userId} desde Supabase:`, error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error al obtener mensajes del usuario ${userId}:`, error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/messages/user/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (fetchError) {
      console.error('Error al obtener mensajes con fetch:', fetchError);
      return [];
    }
  }
}

/**
 * Obtiene la conversación entre dos usuarios
 * @param {string} userId1 - ID del primer usuario
 * @param {string} userId2 - ID del segundo usuario
 * @returns {Promise<Array>} Promesa que resuelve con los mensajes de la conversación
 */
export async function getConversation(userId1, userId2) {
  try {
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:users!sender_id(*), receiver:users!receiver_id(*)')
      .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(`Error al obtener conversación entre ${userId1} y ${userId2} desde Supabase:`, error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error al obtener conversación entre ${userId1} y ${userId2}:`, error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/messages/conversation/${userId1}/${userId2}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (fetchError) {
      console.error('Error al obtener conversación con fetch:', fetchError);
      return [];
    }
  }
}

/**
 * Envía un nuevo mensaje
 * @param {Object} messageData - Datos del mensaje a enviar
 * @returns {Promise<Object>} Promesa que resuelve con el mensaje creado
 */
export async function sendMessage(messageData) {
  try {
    // Aseguramos que el mensaje tenga la fecha de creación
    const messageWithTimestamp = {
      ...messageData,
      created_at: new Date().toISOString(),
      read: false
    };
    
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('messages')
      .insert([messageWithTimestamp])
      .select();

    if (error) {
      console.error('Error al enviar mensaje en Supabase:', error);
      throw error;
    }
    
    return data[0];
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (fetchError) {
      console.error('Error al enviar mensaje con fetch:', fetchError);
      throw fetchError;
    }
  }
}

/**
 * Marca un mensaje como leído
 * @param {string} messageId - ID del mensaje
 * @returns {Promise<Object>} Promesa que resuelve con el mensaje actualizado
 */
export async function markMessageAsRead(messageId) {
  try {
    // Versión directa con Supabase
    const { data, error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', messageId)
      .select();

    if (error) {
      console.error(`Error al marcar mensaje ${messageId} como leído en Supabase:`, error);
      throw error;
    }
    
    return data[0];
  } catch (error) {
    console.error(`Error al marcar mensaje ${messageId} como leído:`, error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/messages/${messageId}/read`, {
        method: 'PATCH',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (fetchError) {
      console.error('Error al marcar mensaje como leído con fetch:', fetchError);
      throw fetchError;
    }
  }
}

/**
 * Cuenta los mensajes no leídos de un usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object>} Promesa que resuelve con el conteo de mensajes no leídos
 */
export async function countUnreadMessages(userId) {
  try {
    // Versión directa con Supabase
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .eq('receiver_id', userId)
      .eq('read', false);

    if (error) {
      console.error(`Error al contar mensajes no leídos para ${userId} en Supabase:`, error);
      throw error;
    }
    
    return { count };
  } catch (error) {
    console.error(`Error al contar mensajes no leídos para ${userId}:`, error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/messages/unread/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (fetchError) {
      console.error('Error al contar mensajes no leídos con fetch:', fetchError);
      return { count: 0 };
    }
  }
}

/**
 * Elimina un mensaje
 * @param {string} messageId - ID del mensaje a eliminar
 * @returns {Promise<Object>} Promesa que resuelve cuando el mensaje ha sido eliminado
 */
export async function deleteMessage(messageId) {
  try {
    // Versión directa con Supabase
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId);

    if (error) {
      console.error(`Error al eliminar mensaje ${messageId} en Supabase:`, error);
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error(`Error al eliminar mensaje ${messageId}:`, error);
    // Fallback a fetch
    try {
      const response = await fetch(`${API_URL}/messages/${messageId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (fetchError) {
      console.error('Error al eliminar mensaje con fetch:', fetchError);
      throw fetchError;
    }
  }
}
