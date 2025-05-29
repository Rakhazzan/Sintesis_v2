import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileMenu from '../../components/layout/ProfileMenu';

describe('ProfileMenu', () => {
  const mockUser = {
    name: 'Dr. Test',
    avatar: 'https://example.com/avatar.jpg'
  };

  test('renderiza correctamente cerrado', () => {
    render(<ProfileMenu user={mockUser} />);
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
    expect(screen.queryByText('Editar perfil')).not.toBeInTheDocument();
  });

  test('muestra el menú al hacer clic', () => {
    render(<ProfileMenu user={mockUser} />);
    fireEvent.click(screen.getByAltText('avatar'));
    expect(screen.getByText('Editar perfil')).toBeInTheDocument();
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
  });

  test('posiciona el menú correctamente en la parte inferior', () => {
    // Mock de getBoundingClientRect para simular espacio suficiente abajo
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      bottom: 100,
      right: 100,
      height: 40
    }));
    
    window.innerHeight = 800;
    
    render(<ProfileMenu user={mockUser} />);
    fireEvent.click(screen.getByAltText('avatar'));
    
    const menu = screen.getByRole('menu');
    expect(menu.style.top).toBe('100px');
  });

  test('posiciona el menú correctamente en la parte superior cuando no hay espacio abajo', () => {
    // Mock de getBoundingClientRect para simular falta de espacio abajo
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      top: 750,
      bottom: 790,
      right: 100,
      height: 40
    }));
    
    window.innerHeight = 800;
    
    render(<ProfileMenu user={mockUser} />);
    fireEvent.click(screen.getByAltText('avatar'));
    
    const menu = screen.getByRole('menu');
    expect(menu.style.bottom).toBe('10px');
  });
});
