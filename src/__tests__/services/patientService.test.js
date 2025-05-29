import { getPatients, getPatientById, createPatient, updatePatient, deletePatient } from '../../services/patientService';
import { supabase } from '../../utils/supabaseClient';

// Mock de Supabase
jest.mock('../../utils/supabaseClient', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    then: jest.fn()
  }
}));

describe('patientService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getPatients llama a Supabase correctamente', async () => {
    const mockPatients = [{ id: '1', name: 'Paciente 1' }, { id: '2', name: 'Paciente 2' }];
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        then: jest.fn().mockResolvedValue({ data: mockPatients, error: null })
      })
    });
    
    const result = await getPatients();
    
    expect(supabase.from).toHaveBeenCalledWith('patients');
    expect(result).toEqual(mockPatients);
  });

  test('getPatientById llama a Supabase con ID correcto', async () => {
    const mockPatient = { id: '1', name: 'Paciente 1' };
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          then: jest.fn().mockResolvedValue({ data: [mockPatient], error: null })
        })
      })
    });
    
    const result = await getPatientById('1');
    
    expect(supabase.from).toHaveBeenCalledWith('patients');
    expect(result).toEqual(mockPatient);
  });

  test('createPatient inserta datos correctamente', async () => {
    const newPatient = { name: 'Nuevo Paciente', email: 'paciente@example.com' };
    const mockResponse = { data: { id: '3', ...newPatient }, error: null };
    
    supabase.from.mockReturnValue({
      insert: jest.fn().mockReturnValue({
        then: jest.fn().mockResolvedValue(mockResponse)
      })
    });
    
    const result = await createPatient(newPatient);
    
    expect(supabase.from).toHaveBeenCalledWith('patients');
    expect(result).toEqual(mockResponse.data);
  });

  test('updatePatient actualiza datos correctamente', async () => {
    const patientId = '1';
    const updatedData = { name: 'Paciente Actualizado' };
    const mockResponse = { data: { id: patientId, ...updatedData }, error: null };
    
    supabase.from.mockReturnValue({
      update: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          then: jest.fn().mockResolvedValue(mockResponse)
        })
      })
    });
    
    const result = await updatePatient(patientId, updatedData);
    
    expect(supabase.from).toHaveBeenCalledWith('patients');
    expect(result).toEqual(mockResponse.data);
  });

  test('deletePatient elimina paciente correctamente', async () => {
    const patientId = '1';
    const mockResponse = { data: {}, error: null };
    
    supabase.from.mockReturnValue({
      delete: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          then: jest.fn().mockResolvedValue(mockResponse)
        })
      })
    });
    
    const result = await deletePatient(patientId);
    
    expect(supabase.from).toHaveBeenCalledWith('patients');
    expect(result).toEqual(true);
  });
});
