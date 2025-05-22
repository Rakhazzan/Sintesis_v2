import React from 'react';
import './AppointmentControls.css';

/**
 * Componente de controles para citas que permite cancelar o cambiar el estado
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.appointment - Objeto cita con datos como id, status, etc.
 * @param {Function} props.onStatusChange - Callback para cambiar estado (completed/cancelled)
 */
const AppointmentControls = ({ appointment, onStatusChange }) => {
  return (
    <div className="appointment-control-btns">
      <button 
        className="control-btn complete"
        onClick={() => onStatusChange(appointment.id, "completed")}
        aria-label="Marcar como completada"
      >
        ✓
      </button>
      <button 
        className="control-btn cancel"
        onClick={() => onStatusChange(appointment.id, "cancelled")}
        aria-label="Cancelar cita"
      >
        ✕
      </button>
    </div>
  );
};

export default AppointmentControls;
