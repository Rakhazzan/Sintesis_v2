import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MedicalConditionSelector from '../../components/shared/MedicalConditionSelector';

describe('MedicalConditionSelector', () => {
  test('renderiza correctamente', () => {
    render(<MedicalConditionSelector placeholder="Seleccionar condición médica" />);
    expect(screen.getByPlaceholderText('Seleccionar condición médica')).toBeInTheDocument();
  });

  test('muestra dropdown al hacer clic', () => {
    render(<MedicalConditionSelector placeholder="Seleccionar condición médica" />);
    fireEvent.click(screen.getByPlaceholderText('Seleccionar condición médica'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  test('filtra opciones al escribir', () => {
    render(<MedicalConditionSelector placeholder="Seleccionar condición médica" />);
    const input = screen.getByPlaceholderText('Seleccionar condición médica');
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'diab' } });
    
    // Asumiendo que "Diabetes" está en las opciones
    expect(screen.getByText('Diabetes')).toBeInTheDocument();
    // Asumiendo que "Hipertensión" no debería mostrarse con este filtro
    expect(screen.queryByText('Hipertensión')).not.toBeInTheDocument();
  });

  test('selecciona una condición correctamente', () => {
    const onSelectMock = jest.fn();
    render(<MedicalConditionSelector placeholder="Seleccionar condición médica" onSelect={onSelectMock} />);
    
    const input = screen.getByPlaceholderText('Seleccionar condición médica');
    fireEvent.click(input);
    fireEvent.click(screen.getByText('Diabetes'));
    
    expect(onSelectMock).toHaveBeenCalledWith('Diabetes');
    expect(input.value).toBe('Diabetes');
  });
});
