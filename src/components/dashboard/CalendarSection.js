import React, { useState } from 'react';
import Calendar from '../Calendar';
import '../../styles/CalendarSection.css';

const CalendarSection = ({ isMobile = false }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 12)); // 12 de Mayo de 2025

  if (isMobile) {
    return (
      <section className="calendar-section mobile-calendar">
        <div className="calendar-component">
          <div className="section-header">
            <h3>Mayo 2025</h3>
            <div className="calendar-controls">
              <button className="calendar-nav prev" aria-label="Mes anterior">←</button>
              <button className="calendar-nav next" aria-label="Mes siguiente">→</button>
            </div>
          </div>
          {/* Mini calendario similar al de desktop */}
          <div className="mini-calendar">
            <div className="calendar-header">
              <div>L</div>
              <div>M</div>
              <div>X</div>
              <div>J</div>
              <div>V</div>
              <div>S</div>
              <div>D</div>
            </div>
            <div className="calendar-days">
              {/* Se generará dinámicamente con JavaScript */}
              {Array(42).fill(null).map((_, i) => {
                const day = i - 2; // Ajuste para Mayo 2025
                const currentDay = day === 13; // Día actual
                const prevMonth = day < 1;
                const nextMonth = day > 31;
                let className = "";
                if (prevMonth) className = "prev-month ";
                if (nextMonth) className = "next-month ";
                if (currentDay) className += "current-day";
                
                // Valor a mostrar
                let value;
                if (prevMonth) value = 28 + day;
                else if (nextMonth) value = day - 31;
                else value = day;
                
                return <div className={className} key={i}>{value}</div>;
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <Calendar 
      currentDate={currentDate}
      onDateChange={(newDate) => setCurrentDate(newDate)}
      onPeriodChange={(period) => console.log(`Periodo cambiado a: ${period}`)}
    />
  );
};

export default CalendarSection;
