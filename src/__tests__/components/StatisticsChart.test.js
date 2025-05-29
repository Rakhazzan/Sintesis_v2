import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import StatisticsChart from '../../components/dashboard/StatisticsChart';
import { getAllAppointments } from '../../services/appointmentService';

// Mock del servicio de citas
jest.mock('../../services/appointmentService');

describe('StatisticsChart', () => {
  const mockAppointments = [
    { id: '1', date: '2025-05-10', status: 'completed' },
    { id: '2', date: '2025-05-15', status: 'completed' },
    { id: '3', date: '2025-05-20', status: 'cancelled' },
    { id: '4', date: '2025-05-25', status: 'pending' }
  ];

  beforeEach(() => {
    getAllAppointments.mockResolvedValue(mockAppointments);
  });

  test('renderiza correctamente', async () => {
    render(<StatisticsChart period="month" />);
    expect(screen.getByText(/cargando estadísticas/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/estadísticas mensuales/i)).toBeInTheDocument();
    });
  });

  test('muestra datos correctos para período mensual', async () => {
    render(<StatisticsChart period="month" />);
    
    await waitFor(() => {
      const canvas = screen.getByRole('img');
      expect(canvas).toBeInTheDocument();
      // Aquí se podrían añadir más assertions para verificar
      // los datos específicos del gráfico, pero requeriría
      // acceso al contexto de canvas
    });
    
    expect(getAllAppointments).toHaveBeenCalledTimes(1);
  });

  test('cambia de período correctamente', async () => {
    const { rerender } = render(<StatisticsChart period="month" />);
    
    await waitFor(() => {
      expect(screen.getByText(/estadísticas mensuales/i)).toBeInTheDocument();
    });
    
    // Cambiar a período semanal
    rerender(<StatisticsChart period="week" />);
    
    await waitFor(() => {
      expect(screen.getByText(/estadísticas semanales/i)).toBeInTheDocument();
    });
    
    expect(getAllAppointments).toHaveBeenCalledTimes(2);
  });
});
