import React from 'react';
import PatientAvatar from '../shared/PatientAvatar';
import { notifyService } from '../NotificationManager';
import '../../styles/UpcomingAppointments.css';

const UpcomingAppointments = ({ appointments, onNavigate, isMobile = false }) => {
  // Filtrar y mostrar solo las próximas citas
  const upcomingAppointments = appointments
    .filter(cita => {
      // Solo mostrar citas pendientes o confirmadas (no completadas ni canceladas)
      return cita.status === 'confirmed' || cita.status === 'pending';
    })
    .sort((a, b) => {
      // Ordenar por fecha y hora
      const dateA = new Date(`${a.date}T${a.start_time || a.time}`);
      const dateB = new Date(`${b.date}T${b.start_time || b.time}`);
      return dateA - dateB;
    })
    .slice(0, 3);

  if (isMobile) {
    return (
      <section className="appointments-section">
        <h3>Próximas citas</h3>
        <div className="appointments-list">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(cita => (
              <div className="appointment-card" key={cita.id}>
                <div className="mobile-appointment-info">
                  {cita.patient.name} ({(cita.start_time || cita.time)?.substring(0, 5)} - {cita.end_time ? cita.end_time.substring(0, 5) : ''})
                </div>
                {cita.patient.phone && (
                  <button 
                    className="mobile-call-btn" 
                    aria-label="Llamar" 
                    onClick={() => window.open(`tel:${cita.patient.phone}`)}
                  >
                    📞
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="appointment-card">No hay citas próximas</div>
          )}
        </div>
      </section>
    );
  }

  return (
    <div className="upcoming-appointments">
      <h4 className="upcoming-header">
        Próximas citas
        <span className="appointment-count">
          {upcomingAppointments.length}
        </span>
      </h4>
      <div className="upcoming-list">
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map(cita => (
            <div className="appointment-item" key={cita.id}>
              <PatientAvatar patient={cita.patient} size="small" />
              <div className="appointment-details">
                <div className="appointment-name">{cita.patient.name}</div>
                <div className="appointment-type">{cita.type}</div>
              </div>
              <div className="appointment-time">
                {(cita.start_time || cita.time)?.substring(0, 5)}
                {cita.end_time ? ' - ' + cita.end_time.substring(0, 5) : ''}
              </div>
              <div className="appointment-actions">
                <button 
                  className="action-btn message" 
                  aria-label="Mensaje" 
                  onClick={() => onNavigate("mensajes", { patientId: cita.patient.id })}
                >
                  💬
                </button>
                <button 
                  className="action-btn call" 
                  aria-label="Llamar" 
                  onClick={() => {
                    // Si estamos en un dispositivo móvil, abrimos la app del teléfono
                    if (isMobile && cita.patient.phone) {
                      window.open(`tel:${cita.patient.phone}`);
                    } else {
                      // En desktop mostramos la notificación
                      notifyService.call(`Llamando a ${cita.patient.name}...`);
                    }
                  }}
                >
                  📞
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="appointment-card">No hay citas próximas</div>
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
