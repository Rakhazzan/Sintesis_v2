const supabase = require('./supabaseClient');

// Servicio para manejar las operaciones de pacientes con Supabase
const patientService = {
  // Obtener todos los pacientes
  getAllPatients: async () => {
    const { data, error } = await supabase
      .from('patients')
      .select('*');
    
    if (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
    
    return data;
  },

  // Obtener un paciente específico
  getPatientById: async (id) => {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching patient:', error);
      throw error;
    }
    
    return data;
  },

  // Crear un nuevo paciente
  createPatient: async (patientData) => {
    const { data, error } = await supabase
      .from('patients')
      .insert([patientData])
      .select();
    
    if (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
    
    return data[0];
  },

  // Actualizar un paciente existente
  updatePatient: async (id, patientData) => {
    const { data, error } = await supabase
      .from('patients')
      .update(patientData)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
    
    return data[0];
  },

  // Eliminar un paciente
  deletePatient: async (id) => {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
    
    return { success: true };
  },

  // Buscar pacientes por nombre
  searchPatients: async (query) => {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .ilike('nombre', `%${query}%`);
    
    if (error) {
      console.error('Error searching patients:', error);
      throw error;
    }
    
    return data;
  }
};

module.exports = patientService;
