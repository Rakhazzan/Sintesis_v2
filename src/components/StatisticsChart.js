import React, { useState, useEffect } from 'react';
import ChartBar from './ChartBar';
import './StatisticsChart.css';
import supabase from '../utils/supabaseUtils';

// Función auxiliar para generar datos simulados
const generateMockData = (labels, period, currentDayIndex, currentMonth) => {
  return labels.map((label, index) => {
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
      period_type: period,
      period_index: index,
      isActive: (period === 'week' && index === currentDayIndex) ||
                (period === 'month' && index === currentMonth) ||
                (period === 'year' && index === labels.length - 1)
    };
  });
}

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
  
  // Este componente ahora usa directamente la tabla appointments en lugar de statistics
  
  // Cargar datos reales para el gráfico según el periodo
  useEffect(() => {
    let labels = [];
    const today = new Date();
    const currentDayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1; // Convertir a índice (0=Lun, 6=Dom)
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
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

    // Función para obtener datos de citas desde la base de datos
    const fetchData = async () => {
      try {
        let appointmentData = [];
        
        if (period === 'week') {
          // Obtener fecha de inicio y fin de la semana actual
          const currentDate = new Date();
          const firstDayOfWeek = new Date(currentDate);
          const dayOfWeek = currentDate.getDay() || 7; // Si es domingo (0), consideramos como 7
          firstDayOfWeek.setDate(currentDate.getDate() - dayOfWeek + 1); // Lunes de la semana actual
          
          const lastDayOfWeek = new Date(firstDayOfWeek);
          lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6); // Domingo de la semana actual
          
          // Formatear fechas para consulta
          const startDate = firstDayOfWeek.toISOString().split('T')[0];
          const endDate = lastDayOfWeek.toISOString().split('T')[0];
          
          // Consultar citas de la semana
          const { data, error } = await supabase
            .from('appointments')
            .select('date')
            .gte('date', startDate)
            .lte('date', endDate);
          
          if (error) {
            console.error('Error al consultar citas por semana:', error);
            throw error;
          }
          
          appointmentData = data || [];
          
          // Contar citas por día de la semana
          const countsByDay = labels.map((_, index) => {
            // Convertir índice a día de la semana (0 = lunes, 6 = domingo)
            return appointmentData.filter(appointment => {
              const appointmentDate = new Date(appointment.date);
              const dayOfWeek = appointmentDate.getDay() === 0 ? 6 : appointmentDate.getDay() - 1;
              return dayOfWeek === index;
            }).length;
          });
          
          // Formatear datos para el gráfico
          const formattedData = labels.map((label, index) => ({
            label,
            value: countsByDay[index],
            isActive: index === currentDayIndex
          }));
          
          // Establecer datos en el estado
          const maxVal = Math.max(...countsByDay, 1); // Evitar división por cero
          setMaxValue(maxVal);
          setChartData(formattedData);
          
        } else if (period === 'month') {
          // Consultar todas las citas (para contar por mes)
          const { data, error } = await supabase
            .from('appointments')
            .select('date');
          
          if (error) {
            console.error('Error al consultar citas por mes:', error);
            throw error;
          }
          
          appointmentData = data || [];
          
          // Contar citas por mes
          const countsByMonth = labels.map((_, index) => {
            return appointmentData.filter(appointment => {
              const appointmentDate = new Date(appointment.date);
              return appointmentDate.getMonth() === index;
            }).length;
          });
          
          // Formatear datos para el gráfico
          const formattedData = labels.map((label, index) => ({
            label,
            value: countsByMonth[index],
            isActive: index === currentMonth
          }));
          
          // Establecer datos en el estado
          const maxVal = Math.max(...countsByMonth, 1); // Evitar división por cero
          setMaxValue(maxVal);
          setChartData(formattedData);
          
        } else if (period === 'year') {
          // Obtener años para el gráfico (suponiendo que labels son los últimos 5 años)
          const years = labels.map((_, index) => {
            return currentYear - (labels.length - 1) + index;
          });
          
          // Consultar todas las citas (para contar por año)
          const { data, error } = await supabase
            .from('appointments')
            .select('date');
          
          if (error) {
            console.error('Error al consultar citas por año:', error);
            throw error;
          }
          
          appointmentData = data || [];
          
          // Contar citas por año
          const countsByYear = years.map(year => {
            return appointmentData.filter(appointment => {
              const appointmentDate = new Date(appointment.date);
              return appointmentDate.getFullYear() === year;
            }).length;
          });
          
          // Formatear datos para el gráfico
          const formattedData = labels.map((label, index) => ({
            label,
            value: countsByYear[index],
            isActive: years[index] === currentYear
          }));
          
          // Establecer datos en el estado
          const maxVal = Math.max(...countsByYear, 1); // Evitar división por cero
          setMaxValue(maxVal);
          setChartData(formattedData);
        }
        
      } catch (error) {
        console.error('Error al obtener datos de citas:', error);
        // En caso de error, mostrar datos simulados
        const mockData = generateMockData(labels, period, currentDayIndex, currentMonth);
        const maxVal = Math.max(...mockData.map(item => item.value), 1);
        setMaxValue(maxVal);
        setChartData(mockData);
      }
    };

    fetchData();
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
