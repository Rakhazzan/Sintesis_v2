import React from 'react';
import '../../styles/WelcomeSection.css';

const WelcomeSection = ({ userName, fecha, citasHoy, mensajes, darkMode }) => {
  return (
    <section className={`welcome-section ${darkMode ? 'dark-theme' : ''}`}>
      <h2 className={darkMode ? 'dark-theme' : ''}>Hola, {userName}</h2>
      <p className={`date ${darkMode ? 'dark-theme' : ''}`}>{fecha}</p>
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-title">Citas hoy</div>
          <div className="summary-value">{citasHoy}</div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Mensajes</div>
          <div className="summary-value">{mensajes}</div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
