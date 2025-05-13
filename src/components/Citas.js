import React, { useState } from "react";
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

const Citas = () => {
  // Estado para guardar la fecha actual
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Array con los nombres de los meses
  const MESES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Función para ir al mes anterior
  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  // Función para ir al mes siguiente
  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Constante para los días de la semana
  const WEEK_DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  // Obtener el primer día del mes (0 = Domingo, 1 = Lunes, etc.)
  const getFirstDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    // Ajustar para que la semana empiece en lunes (0 = Lunes, 6 = Domingo)
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  // Obtener el número de días en el mes actual
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Obtener el número de días en el mes anterior
  const getDaysInPrevMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = getDaysInPrevMonth(year, month);
  
  // Día actual (para marcar el día actual en el calendario)
  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && 
                         today.getFullYear() === year;
  const currentDay = today.getDate();
  
  // Preparar los días para el calendario
  const calendarDays = [];
  
  // Días del mes anterior para completar la primera semana
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({
      day: daysInPrevMonth - firstDayOfMonth + i + 1,
      isPrevMonth: true
    });
  }
  
  // Días del mes actual
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      isToday: isCurrentMonth && i === currentDay
    });
  }
  
  // Días del mes siguiente para completar la última semana
  const remainingDays = 42 - calendarDays.length; // 6 filas x 7 días
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isNextMonth: true
    });
  }

  return (
  <div className="citas-main">
    <div className="calendar-container">
      {/* Calendario simple (placeholder) */}
      <div className="calendar">
        <div className="calendar-header-container">
          <button 
            className="calendar-nav prev" 
            onClick={handlePrevMonth}
            aria-label="Mes anterior"
          >
            &#x2190;
          </button>
          <div className="calendar-header">
            {MESES[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <button 
            className="calendar-nav next" 
            onClick={handleNextMonth}
            aria-label="Mes siguiente"
          >
            &#x2192;
          </button>
        </div>
        {/* Cabecera con los días de la semana */}
        <div className="calendar-weekdays">
          {WEEK_DAYS.map((day, index) => (
            <div key={index} className="weekday">{day}</div>
          ))}
        </div>
        
        {/* Cuadrícula con los días del mes */}
        <div className="calendar-grid">
          {calendarDays.map((dayInfo, index) => (
            <div 
              key={index} 
              className={`calendar-day${dayInfo.isToday ? " active" : ""}${dayInfo.isPrevMonth || dayInfo.isNextMonth ? " other-month" : ""}`}
            >
              {dayInfo.day}
            </div>
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
};

export default Citas;
