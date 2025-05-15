const patientService = require('../services/patientService');

// Controlador para manejar las peticiones relacionadas con pacientes
const patientController = {
  // Obtener todos los pacientes
  getAllPatients: async (req, res) => {
    try {
      const patients = await patientService.getAllPatients();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener los pacientes', 
        error: error.message 
      });
    }
  },

  // Obtener un paciente específico
  getPatientById: async (req, res) => {
    try {
      const { id } = req.params;
      const patient = await patientService.getPatientById(id);
      
      if (!patient) {
        return res.status(404).json({ message: 'Paciente no encontrado' });
      }
      
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener el paciente', 
        error: error.message 
      });
    }
  },

  // Crear un nuevo paciente
  createPatient: async (req, res) => {
    try {
      const patientData = req.body;
      const newPatient = await patientService.createPatient(patientData);
      res.status(201).json(newPatient);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al crear el paciente', 
        error: error.message 
      });
    }
  },

  // Actualizar un paciente existente
  updatePatient: async (req, res) => {
    try {
      const { id } = req.params;
      const patientData = req.body;
      const updatedPatient = await patientService.updatePatient(id, patientData);
      
      if (!updatedPatient) {
        return res.status(404).json({ message: 'Paciente no encontrado' });
      }
      
      res.status(200).json(updatedPatient);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al actualizar el paciente', 
        error: error.message 
      });
    }
  },

  // Eliminar un paciente
  deletePatient: async (req, res) => {
    try {
      const { id } = req.params;
      await patientService.deletePatient(id);
      res.status(200).json({ message: 'Paciente eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al eliminar el paciente', 
        error: error.message 
      });
    }
  },

  // Buscar pacientes por nombre
  searchPatients: async (req, res) => {
    try {
      const { query } = req.query;
      
      if (!query) {
        return res.status(400).json({ message: 'Se requiere un término de búsqueda' });
      }
      
      const patients = await patientService.searchPatients(query);
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al buscar pacientes', 
        error: error.message 
      });
    }
  }
};

module.exports = patientController;
