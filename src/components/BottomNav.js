import React from "react";
import "./BottomNav.css";
import HomeIcon from "./icons/HomeIcon";
import EventIcon from "./icons/EventIcon";
import PatientIcon from "./icons/PatientIcon";
import MessageIcon from "./icons/MessageIcon";

const BottomNav = ({ active, onChange }) => (
  <nav className="bottom-nav">
    <button
      className={`nav-item${active === "inicio" ? " active" : ""}`}
      onClick={() => onChange && onChange("inicio")}
      aria-label="Inicio"
      type="button"
    >
      <div className="nav-icon"><HomeIcon active={active === "inicio"} /></div>
      <span className="nav-label">Inicio</span>
    </button>
    <button
      className={`nav-item${active === "citas" ? " active" : ""}`}
      onClick={() => onChange && onChange("citas")}
      aria-label="Citas"
      type="button"
    >
      <div className="nav-icon"><EventIcon active={active === "citas"} /></div>
      <span className="nav-label">Citas</span>
    </button>
    <button
      className={`nav-item${active === "pacientes" ? " active" : ""}`}
      onClick={() => onChange && onChange("pacientes")}
      aria-label="Pacientes"
      type="button"
    >
      <div className="nav-icon"><PatientIcon active={active === "pacientes"} /></div>
      <span className="nav-label">Pacientes</span>
    </button>
    <button
      className={`nav-item${active === "mensajes" ? " active" : ""}`}
      onClick={() => onChange && onChange("mensajes")}
      aria-label="Mensajes"
      type="button"
    >
      <div className="nav-icon"><MessageIcon active={active === "mensajes"} /></div>
      <span className="nav-label">Mensajes</span>
    </button>
  </nav>
);

export default BottomNav;
