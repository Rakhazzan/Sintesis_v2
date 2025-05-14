import React, { useState } from "react";
import "./Pacientes.css";
import { ReactComponent as MaleIcon } from "./svg/male.svg";
import { ReactComponent as FemaleIcon } from "./svg/female.svg";
import { ReactComponent as AddIcon } from "./svg/add.svg";

const pacientes = [
  {
    nombre: "Carlos Rodríguez",
    edad: 42,
    genero: "Masculino",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    etiqueta: "Hipertensión",
    color: "#b6c5ff"
  },
  {
    nombre: "Ana Martín",
    edad: 29,
    genero: "Femenino",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    etiqueta: "Embarazo",
    color: "#e6d6ff"
  },
  {
    nombre: "María González",
    edad: 68,
    genero: "Femenino",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    etiqueta: "Diabetes",
    color: "#ffe6a7"
  },
  {
    nombre: "Javier López",
    edad: 35,
    genero: "Masculino",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    etiqueta: "Alergia",
    color: "#c7ffd8"
  },
  {
    nombre: "Laura Fernández",
    edad: 45,
    genero: "Femenino",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    etiqueta: "Cardiopatía",
    color: "#ffb6b9"
  }
];

const Pacientes = () => {
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [popupVisible, setPopupVisible] = useState(false);
  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: "",
    fechaNacimiento: "",
    genero: "Masculino",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    etiqueta: "",
    color: "#b6c5ff"
  });
  
  // Estado para almacenar la lista de pacientes (convertimos el array constante a un estado)
  const [listaPacientes, setListaPacientes] = useState(pacientes);
  
  // Función para filtrar pacientes según la categoría seleccionada
  const getPacientesFiltrados = () => {
    switch(filtroActivo) {
      case "Todos":
        return listaPacientes;
      case "Recientes":
        // Mostramos los últimos 2 pacientes añadidos
        return [...listaPacientes].slice(-2);
      case "Crónicos":
        // Filtramos pacientes con condiciones crónicas (diabetes, hipertensión, cardiopatía)
        return listaPacientes.filter(p => 
          ["Diabetes", "Hipertensión", "Cardiopatía"].includes(p.etiqueta)
        );
      case "Urgentes":
        // Filtramos pacientes marcados como urgentes
        return listaPacientes.filter(p => p.urgente === true);
      default:
        return listaPacientes;
    }
  };
  
  // Función para calcular la edad a partir de la fecha de nacimiento
  const calcularEdad = (fechaNacimiento) => {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    
    return edad;
  };
  
  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoPaciente({
      ...nuevoPaciente,
      [name]: value
    });
  };
  
  // Función para añadir un nuevo paciente
  const handleAddPaciente = (e) => {
    e.preventDefault();
    
    // Validamos que los campos obligatorios estén completos
    if (!nuevoPaciente.nombre || !nuevoPaciente.fechaNacimiento) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }
    
    // Calculamos la edad a partir de la fecha de nacimiento
    const edad = calcularEdad(nuevoPaciente.fechaNacimiento);
    
    // Seleccionamos un avatar según el género
    const randomNum = Math.floor(Math.random() * 70) + 1;
    const avatarUrl = nuevoPaciente.genero === "Masculino" ? 
      `https://randomuser.me/api/portraits/men/${randomNum}.jpg` : 
      `https://randomuser.me/api/portraits/women/${randomNum}.jpg`;
    
    // Creamos el nuevo paciente
    const nuevoPacienteCompleto = {
      ...nuevoPaciente,
      edad,
      avatar: avatarUrl
    };
    
    // Actualizamos la lista de pacientes
    setListaPacientes([...listaPacientes, nuevoPacienteCompleto]);
    
    // Limpiamos el formulario y cerramos el popup
    setNuevoPaciente({
      nombre: "",
      fechaNacimiento: "",
      genero: "Masculino",
      avatar: "",
      etiqueta: "",
      color: "#b6c5ff"
    });
    
    setPopupVisible(false);
  };
  
  const pacientesFiltrados = getPacientesFiltrados();
  
  return (
  <div className="pacientes-main">
    <div className="pacientes-header">
      <div className="pacientes-filtros">
        <select 
          className="pacientes-select-filtro"
          value={filtroActivo}
          onChange={(e) => setFiltroActivo(e.target.value)}
        >
          <option value="Todos">Todos los pacientes</option>
          <option value="Recientes">Pacientes recientes</option>
          <option value="Crónicos">Pacientes crónicos</option>
          <option value="Urgentes">Pacientes urgentes</option>
        </select>
      </div>
      <button className="add-paciente-btn" onClick={() => setPopupVisible(true)}>
        <AddIcon width={20} height={20} /> Añadir paciente
      </button>
    </div>
    
    <div className="pacientes-list">
      {pacientesFiltrados.map((p, idx) => (
        <div className="paciente-card" key={idx}>
          <img className="paciente-avatar" src={p.avatar} alt={p.nombre} />
          <div className="paciente-info">
            <div className="paciente-nombre">{p.nombre}</div>
            <div className="paciente-detalle">
              <span>{p.edad} años</span>
              <span className="paciente-genero">
                {p.genero === "Masculino" ? <MaleIcon width={15} /> : <FemaleIcon width={15} />} {p.genero}
              </span>
            </div>
          </div>
          <span className="paciente-etiqueta" style={{ background: p.color }}>{p.etiqueta}</span>
        </div>
      ))}
    </div>
    
    {/* Popup para añadir nuevo paciente */}
    {popupVisible && (
      <div className="popup-overlay">
        <div className="popup-container">
          <h2>Añadir nuevo paciente</h2>
          <form onSubmit={handleAddPaciente}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo*</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                value={nuevoPaciente.nombre} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="fechaNacimiento">Fecha de nacimiento*</label>
              <input 
                type="date" 
                id="fechaNacimiento" 
                name="fechaNacimiento" 
                value={nuevoPaciente.fechaNacimiento} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="genero">Género*</label>
              <select 
                id="genero" 
                name="genero" 
                value={nuevoPaciente.genero} 
                onChange={handleInputChange} 
                required
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="etiqueta">Condición médica (opcional)</label>
              <input 
                type="text" 
                id="etiqueta" 
                name="etiqueta" 
                value={nuevoPaciente.etiqueta} 
                onChange={handleInputChange} 
                placeholder="Ej. Hipertensión, Diabetes..."
              />
            </div>
            
            <div className="popup-actions">
              <button type="button" className="cancel-btn" onClick={() => setPopupVisible(false)}>Cancelar</button>
              <button type="submit" className="save-btn">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
  );
};

export default Pacientes;
