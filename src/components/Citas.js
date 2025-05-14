import React, { useState, useEffect } from "react";
import "./Citas.css";
import { ReactComponent as AddIcon } from "./svg/add.svg";

// Lista predefinida de pacientes para el selector
const pacientesLista = [
  {
    id: 1,
    nombre: "Carlos Rodríguez",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    etiqueta: "Hipertensión"
  },
  {
    id: 2,
    nombre: "Ana Martín",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    etiqueta: "Embarazo"
  },
  {
    id: 3,
    nombre: "María González",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    etiqueta: "Diabetes"
  },
  {
    id: 4,
    nombre: "Javier López",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    etiqueta: "Alergia"
  },
  {
    id: 5,
    nombre: "Laura Fernández",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    etiqueta: "Cardiopatía"
  }
];

// Lista de citas inicial
const citasIniciales = [
  {
    id: 1,
    nombre: "Carlos Rodríguez",
    tipo: "Consulta general",
    hora: "10:30 - 11:00",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    video: true,
    phone: true,
    pronostico: "Hipertensión",
    fecha: "2025-05-13"
  },
  {
    id: 2,
    nombre: "Ana Martín",
    tipo: "Seguimiento tratamiento",
    hora: "12:00 - 12:30",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    video: true,
    phone: true,
    pronostico: "Embarazo",
    fecha: "2025-05-13"
  },
  {
    id: 3,
    nombre: "María González",
    tipo: "Control rutinario",
    hora: "-",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    cancelada: true,
    pronostico: "Diabetes",
    fecha: "2025-05-13"
  }
];

const Citas = () => {
  // Estado para guardar la fecha actual
  const [currentDate, setCurrentDate] = useState(new Date());
  // Estado para manejar la lista de citas
  const [citas, setCitas] = useState(citasIniciales);
  // Estado para el popup de añadir cita
  const [popupVisible, setPopupVisible] = useState(false);
  // Estado para filtrar citas del día seleccionado
  const [citasHoy, setCitasHoy] = useState([]);
  // Estado para manejar la información de la nueva cita
  const [nuevaCita, setNuevaCita] = useState({
    pacienteId: "",
    tipo: "",
    horaInicio: "",
    horaFin: "",
    pronostico: "",
    fecha: "",
    video: false,
    phone: false
  });
  
  // Array con los nombres de los meses
  const MESES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  // Constante para los días de la semana
  const WEEK_DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  
  // Función para formatear la fecha en formato yyyy-mm-dd
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Actualizar las citas del día cuando cambia la fecha seleccionada o la lista de citas
  useEffect(() => {
    // Establecer la fecha inicial para el campo del formulario
    setNuevaCita(prev => ({
      ...prev,
      fecha: formatDate(currentDate)
    }));
    
    const fechaFormateada = formatDate(currentDate);
    const citasDelDia = citas.filter(cita => cita.fecha === fechaFormateada);
    setCitasHoy(citasDelDia);
  }, [currentDate, citas]);

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

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevaCita({
      ...nuevaCita,
      [name]: type === "checkbox" ? checked : value
    });
  };
  
  // Manejar selección de paciente
  const handlePacienteChange = (e) => {
    const pacienteId = parseInt(e.target.value);
    const paciente = pacientesLista.find(p => p.id === pacienteId);
    
    if (paciente) {
      setNuevaCita({
        ...nuevaCita,
        pacienteId,
        pronostico: paciente.etiqueta || ""
      });
    }
  };
  
  // Generar el formato de hora para mostrar
  const formatearHora = (horaInicio, horaFin) => {
    return horaInicio && horaFin ? `${horaInicio} - ${horaFin}` : "-";
  };
  
  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar datos requeridos
    if (!nuevaCita.pacienteId || !nuevaCita.tipo || !nuevaCita.fecha) {
      alert("Por favor completa los campos obligatorios");
      return;
    }
    
    const pacienteSeleccionado = pacientesLista.find(p => p.id === parseInt(nuevaCita.pacienteId));
    
    if (!pacienteSeleccionado) {
      alert("Paciente no encontrado");
      return;
    }
    
    // Crear nueva cita
    const nuevaCitaCompleta = {
      id: Date.now(), // ID único basado en timestamp
      nombre: pacienteSeleccionado.nombre,
      tipo: nuevaCita.tipo,
      hora: formatearHora(nuevaCita.horaInicio, nuevaCita.horaFin),
      avatar: pacienteSeleccionado.avatar,
      pronostico: nuevaCita.pronostico,
      fecha: nuevaCita.fecha,
      video: nuevaCita.video,
      phone: nuevaCita.phone
    };
    
    // Añadir a la lista de citas
    setCitas([...citas, nuevaCitaCompleta]);
    
    // Limpiar el formulario y cerrar popup
    setNuevaCita({
      pacienteId: "",
      tipo: "",
      horaInicio: "",
      horaFin: "",
      pronostico: "",
      fecha: formatDate(currentDate),
      video: false,
      phone: false
    });
    
    setPopupVisible(false);
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
      <div className="calendar-header-main">
        <h3>Calendario de citas</h3>
        <button className="add-cita-btn" onClick={() => setPopupVisible(true)}>
          <AddIcon width={18} height={18} /> Añadir cita
        </button>
      </div>

      <div className="calendar-container">
        {/* Calendario simple */}
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
      
      <h3 className="citas-hoy-title">Citas para {MESES[currentDate.getMonth()]} {currentDate.getDate()}, {currentDate.getFullYear()}</h3>
      
      <div className="citas-list">
        {citasHoy.map((cita, idx) => (
          <div className={`cita-card${cita.cancelada ? " cancelada" : ""}`} key={idx}>
            <img className="cita-avatar" src={cita.avatar} alt={cita.nombre} />
            <div className="cita-info">
              <div className="cita-nombre">{cita.nombre}</div>
              <div className="cita-tipo">{cita.tipo}</div>
              <div className="cita-hora">{cita.hora}</div>
              {cita.pronostico && <div className="cita-pronostico">Diagnóstico: {cita.pronostico}</div>}
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
      
      {/* Popup para añadir nueva cita */}
      {popupVisible && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h2>Añadir nueva cita</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="pacienteId">Paciente*</label>
                <select 
                  id="pacienteId" 
                  name="pacienteId" 
                  value={nuevaCita.pacienteId} 
                  onChange={handlePacienteChange} 
                  required
                >
                  <option value="">Seleccionar paciente</option>
                  {pacientesLista.map(paciente => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="tipo">Tipo de consulta*</label>
                <input 
                  type="text" 
                  id="tipo" 
                  name="tipo" 
                  value={nuevaCita.tipo} 
                  onChange={handleInputChange} 
                  placeholder="Ej. Consulta general, Revisión..."
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="horaInicio">Hora de inicio</label>
                  <input 
                    type="time" 
                    id="horaInicio" 
                    name="horaInicio" 
                    value={nuevaCita.horaInicio} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="horaFin">Hora de fin</label>
                  <input 
                    type="time" 
                    id="horaFin" 
                    name="horaFin" 
                    value={nuevaCita.horaFin} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="fecha">Fecha*</label>
                <input 
                  type="date" 
                  id="fecha" 
                  name="fecha" 
                  value={nuevaCita.fecha} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="pronostico">Pronóstico/Diagnóstico</label>
                <input 
                  type="text" 
                  id="pronostico" 
                  name="pronostico" 
                  value={nuevaCita.pronostico} 
                  onChange={handleInputChange} 
                  placeholder="Ej. Hipertensión, Revisión rutinaria..."
                />
              </div>
              
              <div className="form-group checkboxes">
                <div className="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="video" 
                    name="video" 
                    checked={nuevaCita.video} 
                    onChange={handleInputChange} 
                  />
                  <label htmlFor="video">Videollamada</label>
                </div>
                
                <div className="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="phone" 
                    name="phone" 
                    checked={nuevaCita.phone} 
                    onChange={handleInputChange} 
                  />
                  <label htmlFor="phone">Llamada telefónica</label>
                </div>
              </div>
              
              <div className="popup-actions">
                <button type="button" className="cancel-btn" onClick={() => setPopupVisible(false)}>Cancelar</button>
                <button type="submit" className="save-btn">Guardar cita</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Citas;
