import React, { useState } from 'react';
import './ChartBar.css';

/**
 * Componente para mostrar una barra individual en el gráfico
 * @param {Object} props - Propiedades del componente
 * @param {string} props.label - Etiqueta de la barra (día, mes, año)
 * @param {number} props.value - Valor numérico representado por la barra
 * @param {number} props.maxValue - Valor máximo para calcular la altura proporcional
 * @param {boolean} props.isActive - Indica si la barra está activa (destacada)
 */
const ChartBar = ({ label, value, maxValue, isActive = false }) => {
  // Estado para controlar cuando mostrar el valor (para dispositivos sin hover)
  const [showValue, setShowValue] = useState(false);
  
  // Calcular altura proporcional (entre 0% y 100%)
  const heightPercentage = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0;
  
  return (
    <div className="chart-bar">
      <div className="chart-bar-container">
        <div 
          className={`chart-bar-fill ${isActive ? 'active' : ''}`}
          style={{ height: `${heightPercentage}%` }}
          onMouseEnter={() => setShowValue(true)}
          onMouseLeave={() => setShowValue(false)}
          onTouchStart={() => setShowValue(true)}
          onClick={() => setShowValue(!showValue)}
        >
          {value > 0 && (
            <span className={`chart-bar-value ${showValue ? 'visible' : ''}`}>
              {value}
            </span>
          )}
        </div>
      </div>
      <div className="chart-bar-label">{label}</div>
    </div>
  );
};

export default ChartBar;
