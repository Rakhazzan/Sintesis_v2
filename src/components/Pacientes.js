import React from "react";
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

const Pacientes = () => (
  <div className="pacientes-main">
    <div className="pacientes-filtros">
      <button className="pacientes-filtro active">Todos</button>
      <button className="pacientes-filtro">Recientes</button>
      <button className="pacientes-filtro">Favoritos</button>
      <button className="pacientes-filtro">Urgentes</button>
    </div>
    <div className="pacientes-list">
      {pacientes.map((p, idx) => (
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

export default Pacientes;
