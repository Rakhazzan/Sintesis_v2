import React, { useState, useEffect, useRef } from "react";
import "./DesktopHeader.css";
import ThemeSwitch from "./ThemeSwitch";
import { getPatients } from "../services/patientService";
import { getAppointments } from "../services/appointmentService";

const DesktopHeader = ({ user, onProfileClick, onBellClick, isDesktop, darkMode, onThemeChange, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const searchContainerRef = useRef(null);

  // Cargar datos para la búsqueda
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        // Cargar pacientes y citas para la búsqueda
        const patientsData = await getPatients();
        const appointmentsData = await getAppointments();
        
        setPatients(patientsData);
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error al cargar datos para búsqueda:", error);
      }
    };
    
    fetchSearchData();
  }, []);
  
  // Cerrar resultados al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Manejar cambios en la búsqueda
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    setLoading(true);
    const results = performSearch(query);
    setSearchResults(results);
    setShowResults(true);
    setLoading(false);
  };
  
  // Lógica de búsqueda
  const performSearch = (query) => {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Buscar pacientes
    const patientResults = patients
      .filter(patient => 
        patient.name?.toLowerCase().includes(normalizedQuery) ||
        patient.email?.toLowerCase().includes(normalizedQuery) ||
        patient.medical_condition?.toLowerCase().includes(normalizedQuery)
      )
      .map(patient => ({
        id: patient.id,
        type: 'patient',
        name: patient.name,
        avatar: patient.avatar,
        detail: patient.medical_condition || patient.email || "",
        color: patient.color
      }));
    
    // Buscar citas
    const appointmentResults = appointments
      .filter(appointment => {
        const patientName = appointment.patient?.name?.toLowerCase() || "";
        const appointmentType = appointment.appointment_type?.toLowerCase() || "";
        const appointmentDate = appointment.date || "";
        
        return patientName.includes(normalizedQuery) ||
               appointmentType.includes(normalizedQuery) ||
               appointmentDate.includes(normalizedQuery);
      })
      .map(appointment => ({
        id: appointment.id,
        type: 'appointment',
        name: `Cita: ${appointment.patient?.name || "Paciente"}`,
        avatar: appointment.patient?.avatar,
        detail: `${appointment.date} - ${appointment.start_time || appointment.time}`,
        appointmentType: appointment.appointment_type
      }));
    
    // Buscar fechas específicas (formato YYYY-MM-DD)
    let dateResults = [];
    const dateMatch = normalizedQuery.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      const matchedDate = dateMatch[1];
      if (matchedDate) {
        dateResults = [{
          id: matchedDate,
          type: 'date',
          name: `Día: ${matchedDate}`,
          detail: "Ver citas para esta fecha",
          avatar: null,
          color: '#5a4ff3'
        }];
      }
    }
    
    // Combinar y limitar resultados
    return [...patientResults, ...appointmentResults, ...dateResults].slice(0, 7);
  };
  
  // Navegar al hacer clic en un resultado
  const handleResultClick = (result) => {
    if (result.type === 'patient') {
      // Navegar a detalles del paciente
      if (onNavigate) {
        onNavigate("pacientes", { selectedPatientId: result.id });
      }
    } else if (result.type === 'appointment') {
      // Extraer la fecha de la cita (si está disponible)
      let appointmentDate = null;
      if (result.detail) {
        const dateMatch = result.detail.match(/(\d{4}-\d{2}-\d{2})/);
        if (dateMatch && dateMatch[1]) {
          appointmentDate = dateMatch[1];
        }
      }
      
      // Navegar a detalles de la cita con fecha seleccionada
      if (onNavigate) {
        onNavigate("citas", { 
          selectedAppointmentId: result.id,
          selectedDate: appointmentDate
        });
      }
    } else if (result.type === 'date') {
      // Si es solo una fecha (como 2025-05-28)
      if (onNavigate) {
        onNavigate("citas", { selectedDate: result.id });
      }
    }
    
    // Limpiar búsqueda
    setSearchQuery("");
    setShowResults(false);
  };
  return (
    <header className="desktop-header">
      <div className="search-container" ref={searchContainerRef}>
        <div className="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a8fa7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar pacientes, citas..." 
          aria-label="Buscar"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery && setShowResults(true)}
        />
        
        {/* Resultados de búsqueda */}
        {showResults && (
          <div className="search-results">
            {loading ? (
              <div className="search-loading">Buscando...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div 
                  key={`${result.type}-${result.id}`} 
                  className="search-result-item"
                  onClick={() => handleResultClick(result)}
                >
                  {result.avatar ? (
                    <img 
                      src={result.avatar} 
                      className="result-avatar" 
                      alt={result.name} 
                    />
                  ) : (
                    <div 
                      className="result-avatar-initials"
                      style={{ backgroundColor: result.color || '#5a4ff3' }}
                    >
                      {result.name.charAt(0)}
                    </div>
                  )}
                  <div className="result-content">
                    <div className="result-name">{result.name}</div>
                    <div className="result-detail">{result.detail}</div>
                  </div>
                  <div className="result-type-indicator">
                    {result.type === 'patient' ? (
                      <span className="patient-indicator">👤</span>
                    ) : (
                      <span className="appointment-indicator">📅</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="search-no-results">No se encontraron resultados</div>
            )}
          </div>
        )}
      </div>
      
      <div className="desktop-header-right">
        <ThemeSwitch darkMode={darkMode} onChange={onThemeChange} />
        <button 
          className="notification-btn" 
          onClick={() => {
            // Navegar a mensajes al hacer clic en la campana
            if (onNavigate) {
              onNavigate("mensajes");
            }
            
            // Mantener la función original por compatibilidad
            if (onBellClick) {
              onBellClick();
            }
          }} 
          aria-label="Notificaciones"
        >
          <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11c0-3.07-1.64-5.64-5-5.958V4a1 1 0 1 0-2 0v1.042C7.64 5.36 6 7.929 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 0 1-6 0v-1m6 0H9"/>
          </svg>
          <span className="notification-dot" />
        </button>
        
        <button
          className="profile-btn"
          onClick={isDesktop ? null : onProfileClick}
          aria-label="Menú de perfil"
          style={isDesktop ? { cursor: 'default' } : {}}
        >
          <img 
            className="profile-avatar" 
            src={user?.avatar} 
            alt={user?.name || "Avatar del usuario"} 
          />
        </button>
      </div>
    </header>
  );
};

export default DesktopHeader;
