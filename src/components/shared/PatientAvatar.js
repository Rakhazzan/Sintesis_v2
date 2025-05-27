import React from 'react';
import '../../styles/PatientAvatar.css';

const PatientAvatar = ({ patient, size = "normal" }) => {
  // Si hay avatar, mostrar imagen
  if (patient?.avatar) {
    return (
      <img 
        src={patient.avatar} 
        alt={patient.name} 
        className={`patient-img ${size === "small" ? "patient-small-img" : ""}`}
      />
    );
  }
  
  // Si no hay avatar, mostrar iniciales
  const initials = patient?.initials || 
    (patient?.name ? patient.name.split(' ').map(n => n[0]).join('') : '');
  
  return (
    <div className={size === "small" ? "patient-small-initials" : "patient-initials"}>
      {initials}
    </div>
  );
};

export default PatientAvatar;
