const appointmentService = require('../services/appointmentService');

// Controlador para manejar las peticiones relacionadas con citas
const appointmentController = {
  // Obtener todas las citas
  getAllAppointments: async (req, res) => {
    try {
      const appointments = await appointmentService.getAllAppointments();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener las citas', 
        error: error.message 
      });
    }
  },

  // Obtener citas por fecha
  getAppointmentsByDate: async (req, res) => {
    try {
      const { date } = req.params;
      const appointments = await appointmentService.getAppointmentsByDate(date);
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener las citas por fecha', 
        error: error.message 
      });
    }
  },

  // Crear una nueva cita
  createAppointment: async (req, res) => {
    try {
      const appointmentData = req.body;
      const newAppointment = await appointmentService.createAppointment(appointmentData);
      res.status(201).json(newAppointment);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al crear la cita', 
        error: error.message 
      });
    }
  },

  // Actualizar una cita existente
  updateAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const appointmentData = req.body;
      const updatedAppointment = await appointmentService.updateAppointment(id, appointmentData);
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al actualizar la cita', 
        error: error.message 
      });
    }
  },

  // Eliminar una cita
  deleteAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      await appointmentService.deleteAppointment(id);
      res.status(200).json({ message: 'Cita eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al eliminar la cita', 
        error: error.message 
      });
    }
  },

  // Cambiar el estado de una cita
  updateAppointmentStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedAppointment = await appointmentService.updateAppointmentStatus(id, status);
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al actualizar el estado de la cita', 
        error: error.message 
      });
    }
  }
};

module.exports = appointmentController;
