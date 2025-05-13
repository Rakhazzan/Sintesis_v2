import React, { useState } from "react";
import "./Mensajes.css";
import { ReactComponent as ChatIcon } from "./svg/chat.svg";

const mensajes = [
  {
    nombre: "Carlos Rodríguez",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    mensaje: "Gracias doctora, me siento mucho mejor después de...",
    hora: "10:45",
    leidos: false,
    cantidad: 2
  },
  {
    nombre: "Ana Martín",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    mensaje: "¿Podría adelantar mi cita para la próxima semana?",
    hora: "Ayer",
    leidos: true
  },
  {
    nombre: "María González",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    mensaje: "Doctora, tengo una duda sobre la medicación...",
    hora: "Ayer",
    leidos: false,
    cantidad: 1
  },
  {
    nombre: "Javier López",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    mensaje: "Los resultados de las pruebas ya están disponibles",
    hora: "Lun",
    leidos: true
  },
  {
    nombre: "Laura Fernández",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    mensaje: "Muchas gracias por atenderme con tanta...",
    hora: "Dom",
    leidos: true
  }
];

const Mensajes = () => {
  const [busqueda, setBusqueda] = useState("");
  
  // Filtrar mensajes por nombre
  const mensajesFiltrados = mensajes.filter(mensaje => 
    mensaje.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  
  return (
  <div className="mensajes-main">
    <div className="mensajes-header">
      <h2>Mensajes</h2>
      <button className="mensajes-nuevo">
        <ChatIcon width={22} /> Nuevo
      </button>
    </div>
    <input 
      className="mensajes-buscar" 
      placeholder="Buscar conversación..." 
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />
    <div className="mensajes-list">
      {mensajesFiltrados.map((m, idx) => (
        <div className={`mensaje-card${!m.leidos ? " unread" : ""}`} key={idx}>
          <img className="mensaje-avatar" src={m.avatar} alt={m.nombre} />
          <div className="mensaje-info">
            <div className="mensaje-nombre">{m.nombre}</div>
            <div className="mensaje-texto">{m.mensaje}</div>
          </div>
          <div className="mensaje-meta">
            <div className="mensaje-hora">{m.hora}</div>
            {!m.leidos && m.cantidad && <span className="mensaje-badge">{m.cantidad}</span>}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Mensajes;
