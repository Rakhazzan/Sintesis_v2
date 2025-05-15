const messageService = require('../services/messageService');

// Controlador para manejar las peticiones relacionadas con mensajes
const messageController = {
  // Obtener todos los mensajes de un usuario
  getUserMessages: async (req, res) => {
    try {
      const { userId } = req.params;
      const messages = await messageService.getUserMessages(userId);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener los mensajes', 
        error: error.message 
      });
    }
  },

  // Obtener conversación entre dos usuarios
  getConversation: async (req, res) => {
    try {
      const { userId1, userId2 } = req.params;
      const conversation = await messageService.getConversation(userId1, userId2);
      res.status(200).json(conversation);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener la conversación', 
        error: error.message 
      });
    }
  },

  // Crear un nuevo mensaje
  createMessage: async (req, res) => {
    try {
      const messageData = req.body;
      const newMessage = await messageService.createMessage(messageData);
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al crear el mensaje', 
        error: error.message 
      });
    }
  },

  // Marcar un mensaje como leído
  markAsRead: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedMessage = await messageService.markAsRead(id);
      res.status(200).json(updatedMessage);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al marcar el mensaje como leído', 
        error: error.message 
      });
    }
  },

  // Eliminar un mensaje
  deleteMessage: async (req, res) => {
    try {
      const { id } = req.params;
      await messageService.deleteMessage(id);
      res.status(200).json({ message: 'Mensaje eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al eliminar el mensaje', 
        error: error.message 
      });
    }
  },

  // Contar mensajes no leídos
  countUnreadMessages: async (req, res) => {
    try {
      const { userId } = req.params;
      const unreadCount = await messageService.countUnreadMessages(userId);
      res.status(200).json(unreadCount);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al contar mensajes no leídos', 
        error: error.message 
      });
    }
  }
};

module.exports = messageController;
