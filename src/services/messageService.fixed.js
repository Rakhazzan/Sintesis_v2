/**
 * Servicio para manejar operaciones de mensajes
 * Compatible con backend local y Supabase directo en producción
 */

import config from '../config';
import supabase from '../utils/supabaseUtils';

const API_URL = config.apiBaseUrl;

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
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/messages/user/${userId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
      }
      
      return await response.json();
    }
  } catch (error) {
    console.error('Error al obtener mensajes del usuario:', error);
    return [];
  }
};

export const getConversation = async (userId1, userId2) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/messages/conversation/${userId1}/${userId2}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
      }
      
      return await response.json();
    }
  } catch (error) {
    console.error('Error al obtener conversación:', error);
    return [];
  }
};

export const createMessage = async (messageData) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      // Asegurarse de que tenga un timestamp de creación
      const message = {
        ...messageData,
        created_at: new Date().toISOString(),
        read: false
      };
      
      const { data, error } = await supabase
        .from('messages')
        .insert([message])
        .select();
      
      if (error) throw error;
      return data[0];
    } else {
      // Usar el backend en desarrollo
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
    }
  } catch (error) {
    console.error('Error al crear mensaje:', error);
    throw error;
  }
};

export const markAsRead = async (messageId) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { data, error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId)
        .select();
      
      if (error) throw error;
      return data[0];
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/messages/${messageId}/read`, {
        method: 'PATCH'
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
      }
      
      return await response.json();
    }
  } catch (error) {
    console.error('Error al marcar mensaje como leído:', error);
    throw error;
  }
};

export const deleteMessage = async (messageId) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);
      
      if (error) throw error;
      return { success: true, message: 'Mensaje eliminado correctamente' };
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/messages/${messageId}`, {
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
    console.error('Error al eliminar mensaje:', error);
    throw error;
  }
};

export const countUnreadMessages = async (userId) => {
  try {
    // Usar Supabase directamente en producción si está configurado así
    if (config.isDirectSupabase) {
      const { error, count } = await supabase
        .from('messages')
        .select('*', { count: 'exact' })
        .eq('receiver_id', userId)
        .eq('read', false);
      
      if (error) throw error;
      return { count: count || 0 };
    } else {
      // Usar el backend en desarrollo
      const response = await fetch(`${API_URL}/messages/unread/${userId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || errorData.message || 'Error en la respuesta del servidor');
      }
      
      return await response.json();
    }
  } catch (error) {
    console.error('Error al contar mensajes no leídos:', error);
    return { count: 0 };
  }
};

export const sendPatientEmail = async (emailData) => {
  try {
    // En producción, vamos a simular éxito ya que no podemos enviar emails directamente desde el cliente
    // En un entorno real, deberíamos usar un servicio como SendGrid o similares
    if (config.isDirectSupabase) {
      console.log('Simulando envío de email en producción:', emailData);
      
      // Guardar un registro del email en Supabase (opcional)
      const { error } = await supabase
        .from('email_logs')
        .insert([{
          to: emailData.to,
          subject: emailData.subject,
          sent_at: new Date().toISOString(),
          status: 'pending'
        }]);
      
      if (error) console.warn('No se pudo registrar el email en la base de datos:', error);
      
      // Simular un retraso de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true, message: 'Email enviado correctamente (simulado en producción)' };
    } else {
      // Usar el backend en desarrollo
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
    }
  } catch (error) {
    console.error('Error al enviar emails a pacientes:', error);
    throw error;
  }
};
