import { classifyMedicalCondition } from '../../utils/classifyMedicalCondition';

describe('classifyMedicalCondition', () => {
  test('clasifica correctamente condiciones cardíacas', () => {
    const result = classifyMedicalCondition('Infarto de miocardio');
    expect(result.category).toBe('cardiology');
    expect(result.color).toBe('#e53935'); // Asumiendo color rojo para cardiología
  });

  test('clasifica correctamente condiciones respiratorias', () => {
    const result = classifyMedicalCondition('Asma bronquial');
    expect(result.category).toBe('respiratory');
    expect(result.color).toBe('#43a047'); // Asumiendo color verde para respiratorio
  });

  test('clasifica correctamente condiciones neurológicas', () => {
    const result = classifyMedicalCondition('Epilepsia');
    expect(result.category).toBe('neurology');
    expect(result.color).toBe('#3949ab'); // Asumiendo color azul para neurología
  });

  test('devuelve categoría general para condiciones no reconocidas', () => {
    const result = classifyMedicalCondition('Condición no específica');
    expect(result.category).toBe('general');
    expect(result.color).toBe('#757575'); // Asumiendo color gris para general
  });

  test('maneja correctamente entradas vacías', () => {
    const result = classifyMedicalCondition('');
    expect(result.category).toBe('general');
    expect(result.color).toBe('#757575');
  });

  test('no es sensible a mayúsculas/minúsculas', () => {
    const result1 = classifyMedicalCondition('DIABETES');
    const result2 = classifyMedicalCondition('diabetes');
    
    expect(result1.category).toBe(result2.category);
    expect(result1.color).toBe(result2.color);
  });
});
