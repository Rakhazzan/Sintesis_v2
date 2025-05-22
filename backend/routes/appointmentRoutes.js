const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const router = express.Router();

// Obtener todas las citas
router.get('/', appointmentController.getAllAppointments);

// Obtener citas por fecha
router.get('/date/:date', appointmentController.getAppointmentsByDate);

// Crear una nueva cita
router.post('/', appointmentController.createAppointment);

// Actualizar una cita
router.put('/:id', appointmentController.updateAppointment);

// Eliminar una cita
router.delete('/:id', appointmentController.deleteAppointment);

// Actualizar estado de una cita
router.patch('/:id/status', appointmentController.updateAppointmentStatus);

module.exports = router;
