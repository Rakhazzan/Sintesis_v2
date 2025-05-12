import React from 'react';
import { 
  getCalendarDays, 
  getCurrentWeekDays, 
  getLastSixYears,
  formatPeriodHeader
} from '../utils/calendarUtils';
import './Calendar.css';

/**
 * Componente de calendario interactivo y dinámico
 * Soporta vista semanal, mensual y anual
 */
const Calendar = ({ currentDate, onDateChange, onPeriodChange }) => {
  const [periodType, setPeriodType] = React.useState('month');
  const [calendarData, setCalendarData] = React.useState([]);
  
  // Actualizar datos del calendario cuando cambia la fecha o el tipo de periodo
  React.useEffect(() => {
    let data;
    
    switch (periodType) {
      case 'week':
        data = getCurrentWeekDays(currentDate);
        break;
      case 'year':
        data = getLastSixYears();
        break;
      case 'month':
      default:
        data = getCalendarDays(currentDate);
        break;
    }
    
    setCalendarData(data);
  }, [currentDate, periodType]);
  
  // Manejar cambio de periodo
  const handlePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setPeriodType(newPeriod);
    if (onPeriodChange) {
      onPeriodChange(newPeriod);
    }
  };
  
  // Manejar navegación anterior
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    
    switch (periodType) {
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() - 1);
        break;
      case 'month':
      default:
        newDate.setMonth(newDate.getMonth() - 1);
        break;
    }
    
    if (onDateChange) {
      onDateChange(newDate);
    }
  };
  
  // Manejar navegación siguiente
  const handleNext = () => {
    const newDate = new Date(currentDate);
    
    switch (periodType) {
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
      case 'month':
      default:
        newDate.setMonth(newDate.getMonth() + 1);
        break;
    }
    
    if (onDateChange) {
      onDateChange(newDate);
    }
  };
  
  // Renderizar vista de calendario según el tipo
  const renderCalendarView = () => {
    if (periodType === 'week') {
      return renderWeekView();
    } else if (periodType === 'year') {
      return renderYearView();
    } else {
      return renderMonthView();
    }
  };
  
  // Renderizar vista de semana
  const renderWeekView = () => {
    const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    
    return (
      <>
        <div className="calendar-header">
          {weekDays.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>
        <div className="calendar-week">
          {calendarData.map((day, index) => (
            <div 
              key={index} 
              className={`week-day${day.isToday ? ' current-day' : ''}`}
              onClick={() => onDateChange && onDateChange(day.date)}
            >
              {day.day}
            </div>
          ))}
        </div>
      </>
    );
  };
  
  // Renderizar vista de mes
  const renderMonthView = () => {
    const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    
    return (
      <>
        <div className="calendar-header">
          {weekDays.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>
        <div className="calendar-days">
          {calendarData.map((day, index) => (
            <div 
              key={index} 
              className={`${day.month === 'current' ? '' : day.month + '-month'} ${day.isToday ? 'current-day' : ''}`}
              onClick={() => day.month === 'current' && onDateChange && onDateChange(day.date)}
            >
              {day.day}
            </div>
          ))}
        </div>
      </>
    );
  };
  
  // Renderizar vista de año
  const renderYearView = () => {
    return (
      <div className="calendar-years">
        {calendarData.map((yearData, index) => (
          <div 
            key={index} 
            className={`year-item${yearData.isCurrent ? ' current-year' : ''}`}
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setFullYear(yearData.year);
              onDateChange && onDateChange(newDate);
            }}
          >
            {yearData.year}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="calendar-component">
      <div className="section-header">
        <h3>{formatPeriodHeader(currentDate, periodType)}</h3>
        <div className="calendar-controls">
          <select 
            className="period-selector" 
            value={periodType}
            onChange={handlePeriodChange}
            aria-label="Seleccionar periodo"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="year">Este año</option>
          </select>
          <button 
            className="calendar-nav prev" 
            onClick={handlePrevious}
            aria-label="Periodo anterior"
          >
            &#x2190;
          </button>
          <button 
            className="calendar-nav next" 
            onClick={handleNext}
            aria-label="Periodo siguiente"
          >
            &#x2192;
          </button>
        </div>
      </div>
      <div className="mini-calendar">
        {renderCalendarView()}
      </div>
    </div>
  );
};

export default Calendar;
