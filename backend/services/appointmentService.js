const supabase = require('./supabaseClient');

// Servicio para manejar las operaciones de citas con Supabase
const appointmentService = {
  // Obtener todas las citas
  getAllAppointments: async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*, patients(*)');
    
    if (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
    
    return data;
  },

  // Obtener citas por fecha
  getAppointmentsByDate: async (date) => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*, patients(*)')
      .eq('date', date);
    
    if (error) {
      console.error('Error fetching appointments by date:', error);
      throw error;
    }
    
    return data;
  },

  // Crear una nueva cita
  createAppointment: async (appointmentData) => {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select();
    
    if (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
    
    return data[0];
  },

  // Actualizar una cita existente
  updateAppointment: async (id, appointmentData) => {
    const { data, error } = await supabase
      .from('appointments')
      .update(appointmentData)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
    
    return data[0];
  },

  // Eliminar una cita
  deleteAppointment: async (id) => {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
    
    return { success: true };
  },

  // Cambiar el estado de una cita
  updateAppointmentStatus: async (id, status) => {
    const { data, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating appointment status:', error);
      throw error;
    }
    
    return data[0];
  }
};

module.exports = appointmentService;
