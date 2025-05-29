import { loginUser, registerUser, resetPassword, getCurrentUser, logoutUser } from '../../services/authService';
import { supabase } from '../../utils/supabaseClient';

// Mock de Supabase
jest.mock('../../utils/supabaseClient', () => ({
  supabase: {
    auth: {
      signIn: jest.fn(),
      signUp: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      user: jest.fn(),
      signOut: jest.fn()
    }
  }
}));

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loginUser llama a supabase.auth.signIn con credenciales correctas', async () => {
    const mockResponse = { user: { id: '123' }, error: null };
    supabase.auth.signIn.mockResolvedValue(mockResponse);
    
    const result = await loginUser('test@example.com', 'password123');
    
    expect(supabase.auth.signIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(result).toEqual(mockResponse);
  });

  test('registerUser llama a supabase.auth.signUp con datos correctos', async () => {
    const mockResponse = { user: { id: '123' }, error: null };
    supabase.auth.signUp.mockResolvedValue(mockResponse);
    
    const result = await registerUser('test@example.com', 'password123', 'Dr. Test');
    
    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(result).toEqual(mockResponse);
  });

  test('resetPassword llama a supabase.auth.resetPasswordForEmail', async () => {
    const mockResponse = { data: {}, error: null };
    supabase.auth.resetPasswordForEmail.mockResolvedValue(mockResponse);
    
    const result = await resetPassword('test@example.com');
    
    expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith('test@example.com');
    expect(result).toEqual(mockResponse);
  });

  test('getCurrentUser devuelve el usuario actual', async () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    supabase.auth.user.mockReturnValue(mockUser);
    
    const result = getCurrentUser();
    
    expect(supabase.auth.user).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });

  test('logoutUser llama a supabase.auth.signOut', async () => {
    const mockResponse = { error: null };
    supabase.auth.signOut.mockResolvedValue(mockResponse);
    
    const result = await logoutUser();
    
    expect(supabase.auth.signOut).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
});
