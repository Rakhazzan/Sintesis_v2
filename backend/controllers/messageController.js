const messageService = require('../services/messageService');
const emailService = require('../services/emailService');
const patientService = require('../services/patientService');

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
      
      // Si el mensaje es para un paciente, enviar también por email
      if (messageData.receiver_type === 'patient' && messageData.send_email) {
        try {
          // Obtener datos del paciente
          const patient = await patientService.getPatientById(messageData.receiver_id);
          
          if (patient && patient.email) {
            // Enviar el email
            await emailService.sendToPatient(
              patient,
              messageData.subject || 'Nuevo mensaje de su médico',
              messageData.content
            );
            
            // Actualizar el mensaje para indicar que se envió el email
            await messageService.updateMessage(newMessage.id, { email_sent: true });
          }
        } catch (emailError) {
          console.error('Error al enviar email:', emailError);
          // No fallamos la petición completa, solo registramos el error del email
        }
      }
      
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
  },
  
  // Enviar email a pacientes seleccionados
  sendPatientEmail: async (req, res) => {
    try {
      const { patientIds, subject, message } = req.body;
      
      if (!patientIds || !Array.isArray(patientIds) || patientIds.length === 0) {
        return res.status(400).json({ message: 'Debe seleccionar al menos un paciente' });
      }
      
      if (!subject || !message) {
        return res.status(400).json({ message: 'El asunto y el mensaje son obligatorios' });
      }
      
      // Obtener datos de los pacientes
      const patients = [];
      for (const id of patientIds) {
        try {
          const patient = await patientService.getPatientById(id);
          if (patient) {
            patients.push(patient);
          }
        } catch (error) {
          console.error(`Error al obtener datos del paciente ${id}:`, error);
        }
      }
      
      if (patients.length === 0) {
        return res.status(404).json({ message: 'No se encontraron pacientes válidos' });
      }
      
      // Enviar emails
      const results = await emailService.sendBulkToPatients(patients, subject, message);
      
      // Registrar los mensajes en la base de datos
      // Para evitar violar la restricción de clave foránea, usamos el ID del remitente (médico) 
      // también como receptor, pero guardamos información adicional sobre el destinatario real
      console.log(`Emails enviados exitosamente a ${results.filter(r => r.success).length} pacientes`);
      
      for (const patient of patients) {
        try {
          // Creamos un registro en la tabla messages usando el ID del médico como sender_id
          // y el ID real del paciente como receiver_id
          await messageService.createMessage({
            sender_id: req.body.senderId,  // ID del doctor (de la tabla users)
            receiver_id: patient.id,       // ID del paciente (de la tabla patients)
            sender_type: 'doctor',
            receiver_type: 'patient',
            subject: subject,
            content: message,
            email_sent: 'true'
          });
          console.log(`Mensaje registrado para paciente ${patient.name}`);
        } catch (error) {
          console.error(`Error al registrar mensaje para paciente ${patient.id}:`, error);
        }
      }
      
      res.status(200).json({ 
        message: `Emails enviados a ${results.filter(r => r.success).length} de ${patients.length} pacientes`,
        results
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al enviar emails a pacientes', 
        error: error.message 
      });
    }
  }
};

module.exports = messageController;
