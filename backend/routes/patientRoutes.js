const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

// Obtener todos los pacientes
router.get('/', patientController.getAllPatients);

// Buscar pacientes por nombre
router.get('/search', patientController.searchPatients);

// Obtener un paciente específico
router.get('/:id', patientController.getPatientById);

// Crear un nuevo paciente
router.post('/', patientController.createPatient);

// Actualizar un paciente
router.put('/:id', patientController.updatePatient);

// Eliminar un paciente
router.delete('/:id', patientController.deletePatient);

module.exports = router;
