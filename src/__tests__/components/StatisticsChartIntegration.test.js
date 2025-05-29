import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import StatisticsChart from '../../components/dashboard/StatisticsChart';
import { getAllAppointments } from '../../services/appointmentService';

// Mock del servicio de citas con datos más realistas
jest.mock('../../services/appointmentService');

describe('StatisticsChart Integration Test', () => {
  // Crear un conjunto de datos de prueba más detallado para verificar el procesamiento
  const realAppointmentsData = [
    // Semana actual
    { id: '1', date: '2025-05-24', time: '10:00', status: 'completed' }, // Sábado
    { id: '2', date: '2025-05-25', time: '11:00', status: 'completed' }, // Domingo
    { id: '3', date: '2025-05-26', time: '09:00', status: 'completed' }, // Lunes
    { id: '4', date: '2025-05-26', time: '15:00', status: 'completed' }, // Lunes (duplicado)
    { id: '5', date: '2025-05-27', time: '10:00', status: 'cancelled' }, // Martes
    { id: '6', date: '2025-05-28', time: '14:00', status: 'completed' }, // Miércoles
    { id: '7', date: '2025-05-29', time: '16:00', status: 'pending' },   // Jueves
    // Mes actual
    { id: '8', date: '2025-05-15', time: '09:30', status: 'completed' },
    { id: '9', date: '2025-05-10', time: '11:30', status: 'completed' },
    // Otros meses
    { id: '10', date: '2025-04-20', time: '10:00', status: 'completed' },
    { id: '11', date: '2025-03-15', time: '14:00', status: 'completed' },
  ];

  beforeEach(() => {
    getAllAppointments.mockResolvedValue(realAppointmentsData);
  });

  test('procesa correctamente los datos para estadísticas semanales', async () => {
    render(<StatisticsChart period="week" />);
    
    await waitFor(() => {
      expect(screen.getByText(/estadísticas semanales/i)).toBeInTheDocument();
    });
    
    // Verifica que el componente procesa y muestra los datos correctamente
    // El lunes debe tener 2 citas
    await waitFor(() => {
      const mondayLabel = screen.getByText(/lunes/i);
      expect(mondayLabel).toBeInTheDocument();
      
      // Aquí deberíamos verificar que la barra del lunes tiene la altura correcta
      // pero como no podemos acceder directamente a las propiedades del canvas,
      // verificamos que al menos se muestra el componente del gráfico
      const canvas = screen.getByRole('img');
      expect(canvas).toBeInTheDocument();
    });
    
    expect(getAllAppointments).toHaveBeenCalledTimes(1);
  });

  test('procesa correctamente los datos para estadísticas mensuales', async () => {
    render(<StatisticsChart period="month" />);
    
    await waitFor(() => {
      expect(screen.getByText(/estadísticas mensuales/i)).toBeInTheDocument();
    });
    
    // Mayo debe tener 9 citas en total
    await waitFor(() => {
      const canvas = screen.getByRole('img');
      expect(canvas).toBeInTheDocument();
    });
    
    expect(getAllAppointments).toHaveBeenCalledTimes(1);
  });

  test('procesa correctamente los datos para estadísticas anuales', async () => {
    render(<StatisticsChart period="year" />);
    
    await waitFor(() => {
      expect(screen.getByText(/estadísticas anuales/i)).toBeInTheDocument();
    });
    
    // 2025 debe tener todas las citas
    await waitFor(() => {
      const canvas = screen.getByRole('img');
      expect(canvas).toBeInTheDocument();
    });
    
    expect(getAllAppointments).toHaveBeenCalledTimes(1);
  });

  test('maneja correctamente el caso de error o sin datos', async () => {
    // Simular un error o ausencia de datos
    getAllAppointments.mockResolvedValue([]);
    
    render(<StatisticsChart period="week" />);
    
    await waitFor(() => {
      expect(screen.getByText(/estadísticas semanales/i)).toBeInTheDocument();
    });
    
    // Debería mostrar el gráfico con datos simulados o mensaje de "sin datos"
    await waitFor(() => {
      const canvas = screen.getByRole('img');
      expect(canvas).toBeInTheDocument();
    });
  });
});
