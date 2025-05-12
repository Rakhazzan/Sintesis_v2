/**
 * Utilidades para manejo de calendario y fechas
 */

/**
 * Obtiene un arreglo con los días del mes para mostrar en un calendario
 * incluyendo los días del mes anterior y siguiente para completar la cuadrícula
 * @param {Date} date - Fecha para generar el calendario
 * @returns {Array} Arreglo de objetos representando los días con su información
 */
export function getCalendarDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // Primer día del mes (0 = Domingo, 1 = Lunes, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Ajuste para que la semana empiece en lunes (0 = Lunes, 6 = Domingo)
  const firstDayAdjusted = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  // Último día del mes
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  
  // Último día del mes anterior
  const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
  
  const days = [];
  
  // Días del mes anterior para completar la primera semana
  for (let i = 0; i < firstDayAdjusted; i++) {
    const day = lastDayOfPrevMonth - firstDayAdjusted + i + 1;
    days.push({
      day,
      month: 'prev',
      date: new Date(year, month - 1, day)
    });
  }
  
  // Días del mes actual
  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
  const currentDay = today.getDate();
  
  for (let day = 1; day <= lastDayOfMonth; day++) {
    days.push({
      day,
      month: 'current',
      isToday: isCurrentMonth && day === currentDay,
      date: new Date(year, month, day)
    });
  }
  
  // Completar con días del mes siguiente si es necesario
  const totalDaysDisplayed = 42; // 6 filas de 7 días
  const daysToAdd = totalDaysDisplayed - days.length;
  
  for (let day = 1; day <= daysToAdd; day++) {
    days.push({
      day,
      month: 'next',
      date: new Date(year, month + 1, day)
    });
  }
  
  return days;
}

/**
 * Obtiene los días de la semana actual
 * @param {Date} date - Fecha de referencia
 * @returns {Array} Arreglo de objetos representando los días de la semana
 */
export function getCurrentWeekDays(date) {
  const result = [];
  const day = date.getDay(); // 0 = Domingo, 1 = Lunes, ...
  
  // Ajuste para que la semana empiece en lunes
  const startDayOffset = day === 0 ? 6 : day - 1;
  
  // Primer día de la semana (lunes)
  const firstDay = new Date(date);
  firstDay.setDate(date.getDate() - startDayOffset);
  
  // Generar los 7 días de la semana
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(firstDay);
    currentDate.setDate(firstDay.getDate() + i);
    
    result.push({
      day: currentDate.getDate(),
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
      date: currentDate,
      isToday: isSameDay(currentDate, new Date())
    });
  }
  
  return result;
}

/**
 * Obtiene los meses del año actual
 * @returns {Array} Arreglo de objetos representando los meses del año
 */
export function getMonthsOfYear() {
  const result = [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const MONTH_NAMES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  for (let i = 0; i < 12; i++) {
    result.push({
      month: i,
      year: currentYear,
      name: MONTH_NAMES[i],
      isCurrent: i === currentMonth
    });
  }
  
  return result;
}

/**
 * Obtiene los últimos 6 años incluyendo el actual
 * @returns {Array} Arreglo de objetos representando los años
 */
export function getLastSixYears() {
  const result = [];
  const currentYear = new Date().getFullYear();
  
  for (let i = 5; i >= 0; i--) {
    const year = currentYear - i;
    result.push({
      year,
      isCurrent: year === currentYear
    });
  }
  
  return result;
}

/**
 * Comprueba si dos fechas representan el mismo día
 * @param {Date} date1 - Primera fecha
 * @param {Date} date2 - Segunda fecha
 * @returns {boolean} true si son el mismo día
 */
export function isSameDay(date1, date2) {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
}

/**
 * Formatea una fecha al formato corto día/mes
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha formateada (ej: "12 May")
 */
export function formatShortDate(date) {
  const day = date.getDate();
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const month = months[date.getMonth()];
  return `${day} ${month}`;
}

/**
 * Formatea una fecha como texto para la cabecera del calendario
 * @param {Date} date - Fecha a formatear
 * @param {string} period - Periodo actual ('week', 'month', 'year')
 * @returns {string} Texto formateado según el periodo
 */
export function formatPeriodHeader(date, period) {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  if (period === 'week') {
    const weekDays = getCurrentWeekDays(date);
    const firstDay = weekDays[0];
    const lastDay = weekDays[6];
    
    // Si la semana está dentro del mismo mes
    if (firstDay.month === lastDay.month) {
      return `${firstDay.day} - ${lastDay.day} ${months[firstDay.month]} ${firstDay.year}`;
    }
    
    // Si la semana abarca dos meses
    return `${firstDay.day} ${months[firstDay.month]} - ${lastDay.day} ${months[lastDay.month]} ${firstDay.year}`;
  }
  
  if (period === 'month') {
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }
  
  if (period === 'year') {
    return `${date.getFullYear()}`;
  }
  
  return '';
}
