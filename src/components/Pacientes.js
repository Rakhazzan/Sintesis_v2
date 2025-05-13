import React, { useState } from "react";
import "./Pacientes.css";
import { ReactComponent as MaleIcon } from "./svg/male.svg";
import { ReactComponent as FemaleIcon } from "./svg/female.svg";

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
  
  // Función para filtrar pacientes según la categoría seleccionada
  const getPacientesFiltrados = () => {
    switch(filtroActivo) {
      case "Todos":
        return pacientes;
      case "Recientes":
        // Simulamos pacientes recientes (últimos 2)
        return pacientes.slice(0, 2);
      case "Crónicos":
        // Filtramos pacientes con condiciones crónicas (diabetes, hipertensión, cardiopatía)
        return pacientes.filter(p => 
          ["Diabetes", "Hipertensión", "Cardiopatía"].includes(p.etiqueta)
        );
      case "Urgentes":
        // Simulamos pacientes urgentes
        return pacientes.filter((_, idx) => idx === 2 || idx === 4);
      default:
        return pacientes;
    }
  };
  
  const pacientesFiltrados = getPacientesFiltrados();
  
  return (
  <div className="pacientes-main">
    <div className="pacientes-filtros">
      <button 
        className={`pacientes-filtro ${filtroActivo === "Todos" ? "active" : ""}`}
        onClick={() => setFiltroActivo("Todos")}
      >
        Todos
      </button>
      <button 
        className={`pacientes-filtro ${filtroActivo === "Recientes" ? "active" : ""}`}
        onClick={() => setFiltroActivo("Recientes")}
      >
        Recientes
      </button>
      <button 
        className={`pacientes-filtro ${filtroActivo === "Crónicos" ? "active" : ""}`}
        onClick={() => setFiltroActivo("Crónicos")}
      >
        Crónicos
      </button>
      <button 
        className={`pacientes-filtro ${filtroActivo === "Urgentes" ? "active" : ""}`}
        onClick={() => setFiltroActivo("Urgentes")}
      >
        Urgentes
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
  </div>
  );
};

export default Pacientes;
