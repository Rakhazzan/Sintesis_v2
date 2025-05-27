import React from 'react';
import '../../styles/MetricsSection.css';

const MetricsSection = ({ metrics }) => {
  return (
    <div className="metrics-section">
      <div className="metrics-row">
        <div className="metric-card">
          <div className="metric-icon appointments"></div>
          <div className="metric-data">
            <div className="metric-title">Citas totales</div>
            <div className="metric-value">{metrics.citasTotales}</div>
            <div className="metric-trend positive" style={{color: '#22c55e', fontWeight: 'bold'}}>
              +{Math.max(1, metrics.tendenciaCitas)}% vs semana anterior
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon patients"></div>
          <div className="metric-data">
            <div className="metric-title">Pacientes nuevos</div>
            <div className="metric-value">{metrics.pacientesNuevos}</div>
            <div className="metric-trend positive" style={{color: '#22c55e', fontWeight: 'bold'}}>
              +{Math.max(1, metrics.tendenciaPacientes)}% vs semana anterior
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon time"></div>
          <div className="metric-data">
            <div className="metric-title">Tiempo promedio</div>
            <div className="metric-value">{metrics.tiempoPromedio} min</div>
            <div className="metric-trend positive" style={{color: '#22c55e', fontWeight: 'bold'}}>
              +{Math.max(1, metrics.tendenciaTiempo)}% vs semana anterior
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsSection;
