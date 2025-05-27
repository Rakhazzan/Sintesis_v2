import { useState, useCallback } from 'react';
import supabase from '../utils/supabaseUtils';
import { getAllAppointments, updateAppointmentStatus } from '../utils/appointmentUtils';
import { notifyService } from '../components/NotificationManager';

export function useAppointments(userId) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Función para cargar citas con datos de pacientes
  const fetchAppointmentsWithPatients = useCallback(async () => {
    try {
      setLoading(true);
      
      // Obtener citas con referencia a pacientes
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id,
          date,
          start_time,
          end_time,
          type,
          status,
          patient_id,
          patient:patients(*)
        `);
      
      if (error) {
        console.error('Error al obtener citas:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setAppointments(data);
      } else {
        // Datos de ejemplo si no hay citas reales
        setAppointments([
          {
            id: 1,
            patient: {
              name: "Mohamed Reda Akhabzan",
              initials: "MRA",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            date: "2025-05-28",
            start_time: "10:30:00",
            end_time: "11:00:00",
            type: "Consulta general",
            status: "completed"
          },
          {
            id: 2,
            patient: {
              name: "Joel Ortiz",
              initials: "JO",
              avatar: "https://randomuser.me/api/portraits/men/45.jpg"
            },
            date: "2025-05-28",
            start_time: "12:00:00",
            end_time: "12:30:00",
            type: "Seguimiento tratamiento",
            status: "pending"
          },
          {
            id: 3,
            patient: {
              name: "Laura Gómez",
              initials: "LG",
              avatar: null
            },
            date: "2025-05-29",
            start_time: "09:15:00",
            end_time: "10:00:00",
            type: "Primera consulta",
            status: "confirmed"
          }
        ]);
      }
    } catch (error) {
      console.error('Error general al obtener citas:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para obtener todas las citas
  const fetchAllAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllAppointments(userId);
      setAppointments(data);
    } catch (error) {
      console.error('Error al cargar citas:', error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Gestionar el cambio de estado de las citas en Supabase
  const handleAppointmentStatusChange = useCallback(async (appointmentId, newStatus) => {
    try {
      const { success } = await updateAppointmentStatus(appointmentId, newStatus);
      if (success) {
        // Actualizar el estado local para reflejar el cambio
        setAppointments(prevAppointments => 
          prevAppointments.map(apt => 
            apt.id === appointmentId 
              ? { ...apt, status: newStatus } 
              : apt
          )
        );
        
        // Mostrar una notificación del cambio de estado con animación
        const statusMessages = {
          confirmed: 'Cita confirmada correctamente',
          pending: 'Cita marcada como pendiente',
          completed: 'Cita marcada como completada',
          cancelled: 'Cita cancelada'
        };
        
        notifyService.info(statusMessages[newStatus] || 'Estado de cita actualizado');
      }
    } catch (error) {
      console.error('Error al actualizar estado de cita:', error);
      notifyService.error('Error al actualizar estado: ' + error.message);
    }
  }, []);

  return {
    appointments,
    loading,
    fetchAppointmentsWithPatients,
    fetchAllAppointments,
    handleAppointmentStatusChange
  };
}
