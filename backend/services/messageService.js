const supabase = require('./supabaseClient');

// Servicio para manejar las operaciones de mensajes con Supabase
const messageService = {
  // Obtener todos los mensajes de un usuario
  getUserMessages: async (userId) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:users!sender_id(*), receiver:users!receiver_id(*)')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
    
    return data;
  },

  // Obtener conversación entre dos usuarios
  getConversation: async (userId1, userId2) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:users!sender_id(*), receiver:users!receiver_id(*)')
      .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }
    
    return data;
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
