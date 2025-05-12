import React from "react";
import "./Citas.css";

const citasHoy = [
  {
    nombre: "Carlos Rodríguez",
    tipo: "Consulta general",
    hora: "10:30 - 11:00",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    video: true,
    phone: true
  },
  {
    nombre: "Ana Martín",
    tipo: "Seguimiento tratamiento",
    hora: "12:00 - 12:30",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    video: true,
    phone: true
  },
  {
    nombre: "María González",
    tipo: "Control rutinario",
    hora: "-",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    cancelada: true
  }
];

const Citas = () => (
  <div className="citas-main">
    <div className="calendar-container">
      {/* Calendario simple (placeholder) */}
      <div className="calendar">
        <div className="calendar-header">Mayo 2025</div>
        <div className="calendar-grid">
          {[...Array(31)].map((_, i) => (
            <div key={i} className={`calendar-day${i === 11 ? " active" : ""}`}>{i + 1}</div>
          ))}
        </div>
      </div>
    </div>
    <h3 className="citas-hoy-title">Citas de hoy</h3>
    <div className="citas-list">
      {citasHoy.map((cita, idx) => (
        <div className={`cita-card${cita.cancelada ? " cancelada" : ""}`} key={idx}>
          <img className="cita-avatar" src={cita.avatar} alt={cita.nombre} />
          <div className="cita-info">
            <div className="cita-nombre">{cita.nombre}</div>
            <div className="cita-tipo">{cita.tipo}</div>
            <div className="cita-hora">{cita.hora}</div>
          </div>
          {cita.cancelada ? (
            <span className="cita-cancelada">Cancelada</span>
          ) : (
            <div className="cita-actions">
              {cita.video && <span className="cita-action video" title="Videollamada">▶️</span>}
              {cita.phone && <span className="cita-action phone" title="Llamada">📞</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Citas;
