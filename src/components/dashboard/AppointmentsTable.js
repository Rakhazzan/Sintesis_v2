import React from 'react';
import AppointmentControls from '../AppointmentControls';
import PatientAvatar from '../shared/PatientAvatar';
import '../../styles/AppointmentsTable.css';

const AppointmentsTable = ({ appointments, onStatusChange, onViewAll }) => {
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
          {appointments.map((appointment) => (
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
