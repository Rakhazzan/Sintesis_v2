import React from 'react';
import AppointmentControls from '../AppointmentControls';
import PatientAvatar from '../shared/PatientAvatar';
import '../../styles/AppointmentsTable.css';

const AppointmentsTable = ({ appointments, onStatusChange, onViewAll }) => {
  // Filtrar citas que hayan pasado hace más de 2 días
  const filteredAppointments = appointments.filter(appointment => {
    // Obtener la fecha actual
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar a las 00:00:00
    
    // Obtener la fecha de la cita
    const appointmentDate = new Date(appointment.date);
    appointmentDate.setHours(0, 0, 0, 0); // Normalizar a las 00:00:00
    
    // Calcular la diferencia en días
    const differenceInTime = today.getTime() - appointmentDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    
    // Mostrar solo citas que no sean más antiguas que 2 días
    return differenceInDays <= 2;
  });
  return (
    <section className="recent-appointments-section">
      <div className="section-header">
        <h3>Citas recientes</h3>
        <button 
          className="view-all" 
          onClick={onViewAll} 
          aria-label="Ver todas las citas"
        >
          Ver todas
        </button>
      </div>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>PACIENTE</th>
            <th>FECHA</th>
            <th>HORA</th>
            <th>TIPO</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="patient-cell">
                <PatientAvatar patient={appointment.patient} />
                {appointment.patient.name}
              </td>
              <td>{appointment.date}</td>
              <td>{appointment.start_time?.substring(0, 5) || appointment.time}</td>
              <td>
                {appointment.appointment_type}
                {appointment.phone_call && <span className="call-indicator phone">📞</span>}
                {appointment.video_call && <span className="call-indicator video">📹</span>}
              </td>
              <td>
                <div className="status-container">
                  <span className={`status ${appointment.status}`}>
                    {appointment.status === "confirmed" ? "Confirmada" : 
                     appointment.status === "pending" ? "Pendiente" :
                     appointment.status === "completed" ? "Completada" : "Cancelada"}
                  </span>
                  <AppointmentControls 
                    appointment={appointment} 
                    onStatusChange={onStatusChange} 
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AppointmentsTable;
