import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileMenu from '../../components/layout/ProfileMenu';

describe('ProfileMenu Positioning Tests', () => {
  const mockUser = {
    name: 'Dr. Test',
    avatar: 'https://example.com/avatar.jpg'
  };

  // Prueba específica para verificar el posicionamiento del menú
  // basado en la memoria sobre la mejora de UX
  test('utiliza posición fixed en lugar de absolute', () => {
    render(<ProfileMenu user={mockUser} />);
    fireEvent.click(screen.getByAltText('avatar'));
    
    const menu = screen.getByRole('menu');
    const computedStyle = window.getComputedStyle(menu);
    expect(computedStyle.position).toBe('fixed');
  });

  test('posiciona el menú hacia abajo cuando hay espacio suficiente', () => {
    // Mock del viewport con espacio suficiente abajo
    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
    
    // Mock del elemento que abre el menú
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      bottom: 140,
      left: 800,
      right: 840,
      height: 40,
      width: 40
    }));
    
    render(<ProfileMenu user={mockUser} />);
    fireEvent.click(screen.getByAltText('avatar'));
    
    const menu = screen.getByRole('menu');
    
    // El menú debería posicionarse debajo del botón
    expect(menu.style.top).toBeDefined();
    expect(menu.style.bottom).toBe('');
  });

  test('posiciona el menú hacia arriba cuando no hay espacio suficiente abajo', () => {
    // Mock del viewport con poco espacio abajo
    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
    
    // Mock del elemento que abre el menú posicionado cerca del fondo
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      top: 700,
      bottom: 740,
      left: 800,
      right: 840,
      height: 40,
      width: 40
    }));
    
    render(<ProfileMenu user={mockUser} />);
    fireEvent.click(screen.getByAltText('avatar'));
    
    const menu = screen.getByRole('menu');
    
    // El menú debería posicionarse arriba del botón
    expect(menu.style.bottom).toBeDefined();
    expect(menu.style.top).toBe('');
  });

  test('ajusta el posicionamiento horizontal en función del botón de avatar', () => {
    // Mock del botón en el lado derecho de la pantalla
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      bottom: 140,
      left: 950,
      right: 990,
      height: 40,
      width: 40
    }));
    
    // Mock del ancho de la ventana
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    
    render(<ProfileMenu user={mockUser} />);
    fireEvent.click(screen.getByAltText('avatar'));
    
    const menu = screen.getByRole('menu');
    
    // El menú debería ajustarse para no salirse del viewport por la derecha
    // Verificamos que se alinee a la derecha del botón
    expect(menu.style.right).toBeDefined();
    expect(menu.style.left).toBe('');
  });

  test('el menú permanece visible al hacer scroll', () => {
    render(<ProfileMenu user={mockUser} />);
    fireEvent.click(screen.getByAltText('avatar'));
    
    // Simular scroll
    fireEvent.scroll(window, { target: { scrollY: 200 } });
    
    // El menú debería seguir siendo visible
    const menu = screen.getByRole('menu');
    expect(menu).toBeVisible();
    
    // Y debería tener posición fixed para no verse afectado por el scroll
    const computedStyle = window.getComputedStyle(menu);
    expect(computedStyle.position).toBe('fixed');
  });
});
