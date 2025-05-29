import { formatDate, getDayOfWeek, isWeekend, getMonthName, calculateAge } from '../../utils/dateUtils';

describe('dateUtils', () => {
  test('formatDate da formato correcto', () => {
    const date = new Date('2025-05-15');
    expect(formatDate(date)).toBe('15/05/2025');
    expect(formatDate(date, 'yyyy-MM-dd')).toBe('2025-05-15');
  });

  test('getDayOfWeek devuelve el día correcto', () => {
    const date = new Date('2025-05-15'); // Es un jueves
    expect(getDayOfWeek(date)).toBe('Jueves');
  });

  test('isWeekend identifica correctamente fines de semana', () => {
    const weekday = new Date('2025-05-15'); // Jueves
    const weekend1 = new Date('2025-05-17'); // Sábado
    const weekend2 = new Date('2025-05-18'); // Domingo
    
    expect(isWeekend(weekday)).toBe(false);
    expect(isWeekend(weekend1)).toBe(true);
    expect(isWeekend(weekend2)).toBe(true);
  });

  test('getMonthName devuelve el nombre del mes correcto', () => {
    const date = new Date('2025-05-15');
    expect(getMonthName(date)).toBe('Mayo');
  });

  test('calculateAge calcula la edad correctamente', () => {
    const birthDate = new Date('1990-01-01');
    const today = new Date('2025-05-15');
    
    // Mock de Date.now para tener una fecha fija en las pruebas
    const originalNow = Date.now;
    Date.now = jest.fn(() => today.getTime());
    
    expect(calculateAge(birthDate)).toBe(35);
    
    // Restaurar la función original
    Date.now = originalNow;
  });

  test('calculateAge maneja fechas inválidas', () => {
    expect(calculateAge(null)).toBe(null);
    expect(calculateAge('no-es-fecha')).toBe(null);
  });
});
