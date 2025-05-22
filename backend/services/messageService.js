const supabase = require('./supabaseClient');

// Servicio para manejar las operaciones de mensajes con Supabase
const messageService = {
  // Obtener todos los mensajes de un usuario
  getUserMessages: async (userId) => {
    try {
      // Primero obtenemos los mensajes básicos
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });
      
      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
        throw messagesError;
      }

      // Obtenemos los datos de los pacientes para enriquecer los mensajes
      const { data: patientsData, error: patientsError } = await supabase
        .from('patients')
        .select('id, name, email, avatar');

      if (patientsError) {
        console.error('Error fetching patients:', patientsError);
        // Continuamos aunque haya error, usaremos datos por defecto
      }

      // Crear un mapa de pacientes para búsqueda rápida
      const patientsMap = {};
      if (patientsData) {
        patientsData.forEach(patient => {
          patientsMap[patient.id] = patient;
        });
      }
      
      // Enriquecer los mensajes con información de los pacientes
      return messagesData.map(message => {
        // Buscar si el receptor es un paciente
        const patientInfo = message.receiver_type === 'patient' ? 
          patientsMap[message.receiver_id] : null;

        return {
          ...message,
          // Información del remitente (doctor)
          sender: {
            name: message.sender_type === 'doctor' ? 'Doctor' : 'Paciente',
            id: message.sender_id
          },
          // Información del destinatario (paciente) con datos reales
          receiver: {
            id: message.receiver_id,
            name: patientInfo ? patientInfo.name : 'Paciente',
            avatar: patientInfo ? patientInfo.avatar : null,
            email: patientInfo ? patientInfo.email : null
          }
        };
      });
    } catch (error) {
      console.error('Error al procesar mensajes:', error);
      throw error;
    }
  },

  // Obtener conversación entre dos usuarios
  getConversation: async (userId1, userId2) => {
    try {
      // Solo seleccionamos datos básicos sin uniones que puedan causar errores
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching conversation:', error);
        throw error;
      }
      
      // Enriquecer los mensajes con información relevante
      return data.map(message => ({
        ...message,
        // Determinar quién es quién en la conversación
        sender: {
          name: message.sender_id === userId1 ? 'Tú' : 'Interlocutor',
          id: message.sender_id
        },
        receiver: {
          name: message.receiver_id === userId1 ? 'Tú' : 'Interlocutor',
          id: message.receiver_id
        }
      }));
    } catch (error) {
      console.error('Error al procesar conversación:', error);
      throw error;
    }
  },

  // Crear un nuevo mensaje
  createMessage: async (messageData) => {
    const { data, error } = await supabase
      .from('messages')
      .insert([messageData])
      .select();
    
    if (error) {
      console.error('Error creating message:', error);
      throw error;
    }
    
    return data[0];
  },

  // Marcar un mensaje como leído
  markAsRead: async (id) => {
    const { data, error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
    
    return data[0];
  },

  // Actualizar un mensaje
  updateMessage: async (id, messageData) => {
    const { data, error } = await supabase
      .from('messages')
      .update(messageData)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating message:', error);
      throw error;
    }
    
    return data[0];
  },

  // Eliminar un mensaje
  deleteMessage: async (id) => {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
    
    return { success: true };
  },

  // Contar mensajes no leídos
  countUnreadMessages: async (userId) => {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .eq('receiver_id', userId)
      .eq('read', false);
    
    if (error) {
      console.error('Error counting unread messages:', error);
      throw error;
    }
    
    return { count };
  }
};

module.exports = messageService;
