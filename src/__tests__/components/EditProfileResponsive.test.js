import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditProfilePage from '../../pages/EditProfilePage';
import App from '../../App';
import { AuthContext } from '../../context/AuthContext';

// Mock de React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/profile/edit' })
}));

// Mock de servicios
jest.mock('../../services/userService', () => ({
  updateUserProfile: jest.fn().mockResolvedValue({ success: true })
}));

describe('EditProfile Responsive Behavior Tests', () => {
  const mockUser = {
    id: 'user123',
    name: 'Dr. Test',
    email: 'test@example.com',
    avatar: 'https://example.com/avatar.jpg'
  };
  
  const mockAuthContext = {
    currentUser: mockUser,
    isAuthenticated: true,
    updateUserData: jest.fn()
  };

  test('renderiza correctamente en modo inline', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <EditProfilePage inlineMode={true} />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    
    expect(screen.getByText(/editar perfil/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Dr. Test')).toBeInTheDocument();
    
    // Verificar que está en modo inline
    const form = screen.getByRole('form');
    expect(form.classList.contains('inline-mode')).toBe(true);
  });

  test('renderiza correctamente en modo estándar', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <EditProfilePage inlineMode={false} />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    
    expect(screen.getByText(/editar perfil/i)).toBeInTheDocument();
    
    // Verificar que está en modo estándar
    const form = screen.getByRole('form');
    expect(form.classList.contains('inline-mode')).toBe(false);
  });

  test('los botones "Guardar" y "Cancelar" redirigen correctamente', () => {
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockImplementation(() => navigateMock);
    
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <EditProfilePage inlineMode={false} />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    
    // Simular clic en Cancelar
    fireEvent.click(screen.getByText(/cancelar/i));
    expect(navigateMock).toHaveBeenCalledWith('/');
    
    // Simular envío del formulario
    fireEvent.change(screen.getByDisplayValue('Dr. Test'), { target: { value: 'Dr. Updated' } });
    fireEvent.submit(screen.getByRole('form'));
    
    // Verificar que después de guardar se redirige al dashboard
    setTimeout(() => {
      expect(mockAuthContext.updateUserData).toHaveBeenCalled();
      expect(navigateMock).toHaveBeenCalledWith('/');
    }, 0);
  });

  // Test de integración simulando App.js con estado "configuracion"
  test('App.js gestiona correctamente el estado "configuracion" para EditProfilePage', () => {
    // Mock del componente App.js con el estado configuracion
    const MockApp = () => {
      const [configuracion, setConfiguracion] = React.useState(false);
      
      return (
        <AuthContext.Provider value={mockAuthContext}>
          <div>
            {configuracion ? (
              <EditProfilePage inlineMode={true} />
            ) : (
              <button onClick={() => setConfiguracion(true)}>Abrir Configuración</button>
            )}
          </div>
        </AuthContext.Provider>
      );
    };
    
    render(
      <BrowserRouter>
        <MockApp />
      </BrowserRouter>
    );
    
    // Verificar que inicialmente no se muestra el formulario
    expect(screen.queryByText(/editar perfil/i)).not.toBeInTheDocument();
    
    // Abrir configuración
    fireEvent.click(screen.getByText(/abrir configuración/i));
    
    // Verificar que ahora se muestra el formulario en modo inline
    expect(screen.getByText(/editar perfil/i)).toBeInTheDocument();
    const form = screen.getByRole('form');
    expect(form.classList.contains('inline-mode')).toBe(true);
  });

  // Prueba específica para comportamiento móvil vs desktop
  test('detecta correctamente modo móvil vs desktop', () => {
    // Mock de window.matchMedia para simular viewport móvil
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: query.includes('max-width: 768px'), // true para móvil
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });
    
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <EditProfilePage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    
    // Verificar elementos específicos de vista móvil
    expect(screen.getByRole('form')).toHaveClass('mobile-view');
    
    // Cambiar a desktop
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: !query.includes('max-width: 768px'), // false para móvil = desktop
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });
    
    // Re-renderizar
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <EditProfilePage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    
    // Verificar elementos específicos de vista desktop
    expect(screen.getByRole('form')).toHaveClass('desktop-view');
  });
});
