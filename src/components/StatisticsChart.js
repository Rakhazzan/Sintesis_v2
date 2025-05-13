import React, { useState, useEffect } from 'react';
import ChartBar from './ChartBar';
import './StatisticsChart.css';

// Constantes para las etiquetas según el periodo
const WEEK_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTH_LABELS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const YEAR_LABELS = ["2021", "2022", "2023", "2024", "2025"];

/**
 * Componente de gráfico de estadísticas interactivo
 * Muestra diferentes datos según el periodo seleccionado
 */
const StatisticsChart = () => {
  // Estado para el periodo seleccionado
  const [period, setPeriod] = useState('week');
  
  // Estado para los datos del gráfico
  const [chartData, setChartData] = useState([]);
  
  // Estado para el valor máximo (para escalar las barras)
  const [maxValue, setMaxValue] = useState(0);
  
  // Generar datos aleatorios para el gráfico según el periodo
  useEffect(() => {
    let data = [];
    let labels = [];
    const today = new Date();
    const currentDayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1; // Convertir a índice (0=Lun, 6=Dom)
    const currentMonth = today.getMonth();
    
    // Seleccionar etiquetas según periodo
    switch (period) {
      case 'week':
        labels = WEEK_LABELS;
        break;
      case 'month':
        labels = MONTH_LABELS;
        break;
      case 'year':
        labels = YEAR_LABELS;
        break;
      default:
        labels = WEEK_LABELS;
    }
    
    // Generar datos con valores aleatorios
    data = labels.map((label, index) => {
      // Base value with some randomness
      let value = Math.floor(Math.random() * 40) + 10;
      
      // Make current periods have higher values to seem more realistic
      if ((period === 'week' && index === currentDayIndex) || 
          (period === 'month' && index === currentMonth) ||
          (period === 'year' && index === labels.length - 1)) {
        value = Math.floor(Math.random() * 30) + 50; // Higher value for current period
      }
      
      return {
        label,
        value,
        isActive: (period === 'week' && index === currentDayIndex) ||
                  (period === 'month' && index === currentMonth) ||
                  (period === 'year' && index === labels.length - 1)
      };
    });
    
    // Encontrar el valor máximo para el escalado
    const maxVal = Math.max(...data.map(item => item.value));
    setMaxValue(maxVal);
    setChartData(data);
  }, [period]);
  
  // Manejar cambio de periodo
  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };
  
  return (
    <div className="statistics-chart">
      <div className="section-header">
        <h3>Estadísticas {
          period === 'week' ? 'semanales' : 
          period === 'month' ? 'mensuales' : 'anuales'
        }</h3>
        <select 
          className="period-selector" 
          value={period}
          onChange={handlePeriodChange}
          aria-label="Seleccionar periodo"
        >
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
          <option value="year">Este año</option>
        </select>
      </div>
      
      <div className="chart">
        {chartData.map((item, index) => (
          <ChartBar
            key={index}
            label={item.label}
            value={item.value}
            maxValue={maxValue}
            isActive={item.isActive}
          />
        ))}
      </div>
    </div>
  );
};

export default StatisticsChart;
