import React, { useState, useEffect } from "react";
import "./Citas.css";
import { ReactComponent as AddIcon } from "./svg/add.svg";
import { getAppointmentsByDate, createAppointment, deleteAppointment } from "../services/appointmentService";
import { getPatients } from "../services/patientService";
import { notifyService } from "../services/notifyService";
import ConfirmModal from "./ConfirmModal";

const Citas = () => {
  // Estado para guardar la fecha actual
  const [currentDate, setCurrentDate] = useState(new Date());
  // Estado para manejar la lista completa de citas
  const [, setCitas] = useState([]);
  // Estado para el popup de añadir cita
  const [popupVisible, setPopupVisible] = useState(false);
  // Estado para filtrar citas del día seleccionado
  const [citasHoy, setCitasHoy] = useState([]);
  // Estado para manejar carga
  const [loading, setLoading] = useState(false);
  // Estado para manejar la información de la nueva cita
  const [nuevaCita, setNuevaCita] = useState({
    pacienteId: "",
    tipo: "",
    fecha: formatDate(new Date()),
    horaInicio: "",
    horaFin: "",
    pronostico: "",
    video: false,
    phone: false
  });
  // Estado para la lista de pacientes
  const [pacientes, setPacientes] = useState([]);
  // Estados para el modal de confirmación de cancelación
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

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
  
  // Cargar pacientes al iniciar el componente
  useEffect(() => {
    const loadPacientes = async () => {
      setLoading(true);
      try {
        const data = await getPatients();
        // Convertir los datos al formato esperado por el componente
        const pacientesFormateados = data.map(paciente => ({
          id: paciente.id,
          nombre: paciente.name,
          avatar: paciente.avatar,
          etiqueta: paciente.medical_condition
        }));
        setPacientes(pacientesFormateados);
      } catch (error) {
        notifyService.error("Error al cargar pacientes");
        console.error("Error al cargar pacientes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPacientes();
  }, []);

  // Cargar citas al iniciar y cuando cambia la fecha seleccionada
  useEffect(() => {
    const loadCitas = async () => {
      setLoading(true);
      try {
        // Formatear fecha para la consulta
        const fechaFormateada = formatDate(currentDate);
        
        // Obtener citas para la fecha seleccionada
        const citasData = await getAppointmentsByDate(fechaFormateada);
        
        // Convertir los datos al formato esperado por el componente
        const citasFormateadas = citasData.map(cita => ({
          id: cita.id,
          nombre: cita.patients?.name || "Paciente",
          tipo: cita.appointment_type,
          hora: formatearHora(cita.start_time, cita.end_time),
          avatar: cita.patients?.avatar || "https://randomuser.me/api/portraits/lego/0.jpg",
          video: cita.video_call,
          phone: cita.phone_call,
          pronostico: cita.diagnosis,
          fecha: cita.date,
          cancelada: cita.status === "cancelled"
        }));
        
        setCitas(citasFormateadas);
        setCitasHoy(citasFormateadas);
      } catch (error) {
        notifyService.error("Error al cargar citas");
        console.error("Error al cargar citas:", error);
      } finally {
        setLoading(false);
      }
    };

    // Establecer la fecha inicial para el campo del formulario
    setNuevaCita(prev => ({
      ...prev,
      fecha: formatDate(currentDate)
    }));
    
    loadCitas();
  }, [currentDate]);

  // Función para ir al mes anterior
  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  // Función para ir al mes siguiente
  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  // Función para seleccionar un día específico
  const handleDayClick = (dayInfo) => {
    // Si es del mes anterior o siguiente, no hacemos nada
    if (dayInfo.isPrevMonth || dayInfo.isNextMonth) return;
    
    // Crear una nueva fecha con el día seleccionado
    const newDate = new Date(currentDate);
    newDate.setDate(dayInfo.day);
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
    const pacienteId = e.target.value;
    const paciente = pacientes.find(p => p.id === pacienteId);
    
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validar datos requeridos
      if (!nuevaCita.pacienteId || !nuevaCita.tipo || !nuevaCita.fecha) {
        notifyService.error("Por favor completa los campos obligatorios");
        return;
      }
      
      const pacienteSeleccionado = pacientes.find(p => p.id === nuevaCita.pacienteId);
      
      if (!pacienteSeleccionado) {
        notifyService.error("Paciente no encontrado");
        return;
      }
      
      // Preparar datos para enviar al backend
      const appointmentData = {
        patient_id: nuevaCita.pacienteId,
        appointment_type: nuevaCita.tipo,
        // Asegurar formato correcto de hora (HH:MM:SS)
        start_time: nuevaCita.horaInicio ? `${nuevaCita.horaInicio}:00` : null,
        end_time: nuevaCita.horaFin ? `${nuevaCita.horaFin}:00` : null,
        // Asegurar formato de fecha ISO (YYYY-MM-DD)
        date: nuevaCita.fecha,
        diagnosis: nuevaCita.pronostico || null,
        // Convertir explícitamente a booleanos
        video_call: nuevaCita.video === true,
        phone_call: nuevaCita.phone === true
        // Eliminamos el campo status para que la base de datos use su valor por defecto
      };
      
      // Log de los datos que se envían al backend (para depuración)
      console.log('Datos de la cita a crear:', appointmentData);
      
      // Enviar al backend
      const createdAppointment = await createAppointment(appointmentData);
      
      // Log de la respuesta del backend (para depuración)
      console.log('Cita creada:', createdAppointment);
      
      // Formatear la cita creada para el estado
      const nuevaCitaCompleta = {
        id: createdAppointment.id,
        nombre: pacienteSeleccionado.nombre,
        tipo: createdAppointment.appointment_type,
        hora: formatearHora(createdAppointment.start_time, createdAppointment.end_time),
        avatar: pacienteSeleccionado.avatar,
        pronostico: createdAppointment.diagnosis,
        fecha: createdAppointment.date,
        video: createdAppointment.video_call,
        phone: createdAppointment.phone_call
      };
      
      // Añadir a la lista de citas
      setCitas(prevCitas => [...prevCitas, nuevaCitaCompleta]);
      setCitasHoy(prevCitasHoy => [...prevCitasHoy, nuevaCitaCompleta]);
      
      // Notificar éxito
      notifyService.success("Cita creada correctamente");
      
      // Resetear formulario y cerrar popup
      setNuevaCita({
        pacienteId: "",
        tipo: "",
        fecha: formatDate(currentDate),
        horaInicio: "",
        horaFin: "",
        pronostico: "",
        video: false,
        phone: false
      });
      setPopupVisible(false);
    } catch (error) {
      console.error("Error al crear cita:", error);
      
      // Intentar obtener un mensaje de error más específico
      const errorMessage = error.message || "Error al crear la cita";
      notifyService.error(errorMessage);
      
      // Mostrar información de depuración en la consola
      console.log('Detalles del error:', {
        message: error.message,
        stack: error.stack,
        nuevaCita: nuevaCita
      });
    } finally {
      setLoading(false);
    }
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

  // Función para mostrar el modal de confirmación de cancelación
  const confirmCancelAppointment = (id) => {
    setAppointmentToCancel(id);
    setIsConfirmModalOpen(true);
  };

  // Función para cancelar una cita una vez confirmada
  const handleCancelAppointment = async () => {
    if (!appointmentToCancel) return;
    
    setLoading(true);
    try {
      // En lugar de actualizar el estado, eliminar la cita completamente
      await deleteAppointment(appointmentToCancel);
      
      // Actualizar el estado local eliminando la cita
      setCitas(prevCitas => prevCitas.filter(cita => cita.id !== appointmentToCancel));
      setCitasHoy(prevCitasHoy => prevCitasHoy.filter(cita => cita.id !== appointmentToCancel));
      
      notifyService.success('Cita eliminada correctamente');
      setIsConfirmModalOpen(false);
      setAppointmentToCancel(null);
    } catch (error) {
      notifyService.error('Error al eliminar la cita');
      console.error('Error al eliminar cita:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar el modal de confirmación
  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setAppointmentToCancel(null);
  };
  
  return (
    <>
    <div className="citas-main">
      <div className="calendar-header-main">
        <h3>Calendario de citas</h3>
        <button className="add-cita-btn" onClick={() => setPopupVisible(true)}>
          <AddIcon width={18} height={18} /> Añadir cita
        </button>
      </div>
      
      {loading && <div className="loading-spinner">Cargando...</div>}

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
                className={`calendar-day${dayInfo.isToday ? " active" : ""}${dayInfo.isPrevMonth || dayInfo.isNextMonth ? " other-month" : ""}${currentDate.getDate() === dayInfo.day && !dayInfo.isPrevMonth && !dayInfo.isNextMonth ? " selected" : ""}`}
                onClick={() => handleDayClick(dayInfo)}
                style={{ cursor: dayInfo.isPrevMonth || dayInfo.isNextMonth ? 'default' : 'pointer' }}
              >
                {dayInfo.day}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <h3 className="citas-hoy-title">Citas para {MESES[currentDate.getMonth()]} {currentDate.getDate()}, {currentDate.getFullYear()}</h3>
      
      <div className="citas-list">
        {citasHoy.length === 0 ? (
          <div className="no-citas-message">
            No hay citas programadas para este día.
          </div>
        ) : (
          citasHoy.map((cita, idx) => (
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
                  <span 
                    className="cita-action cancel" 
                    title="Cancelar cita"
                    onClick={() => confirmCancelAppointment(cita.id)}
                  >
                    ❌
                  </span>
                </div>
              )}
            </div>
          ))
        )}
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
                  {loading ? (
                    <option disabled>Cargando pacientes...</option>
                  ) : pacientes.length === 0 ? (
                    <option disabled>No hay pacientes disponibles</option>
                  ) : (
                    pacientes.map(paciente => (
                      <option key={paciente.id} value={paciente.id}>
                        {paciente.nombre}
                      </option>
                    ))
                  )}
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

    {/* Modal de confirmación elegante con GSAP */}
    <ConfirmModal
      isOpen={isConfirmModalOpen}
      message="¿Estás seguro de que deseas cancelar esta cita? Se eliminará permanentemente."
      onConfirm={handleCancelAppointment}
      onCancel={closeConfirmModal}
    />
    </>
  );
};

export default Citas;
