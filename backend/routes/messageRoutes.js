const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

// Obtener todos los mensajes de un usuario
router.get('/user/:userId', messageController.getUserMessages);

// Obtener conversación entre dos usuarios
router.get('/conversation/:userId1/:userId2', messageController.getConversation);

// Contar mensajes no leídos
router.get('/unread/:userId', messageController.countUnreadMessages);

// Crear un nuevo mensaje
router.post('/', messageController.createMessage);

// Marcar un mensaje como leído
router.patch('/:id/read', messageController.markAsRead);

// Eliminar un mensaje
router.delete('/:id', messageController.deleteMessage);

// Enviar email a pacientes seleccionados
router.post('/email', messageController.sendPatientEmail);

module.exports = router;
