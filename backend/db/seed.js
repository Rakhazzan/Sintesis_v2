const supabase = require('../services/supabaseClient');

/**
 * Script para poblar la base de datos con datos iniciales
 * Este script debe ejecutarse después de crear las tablas
 */

async function seedDatabase() {
  console.log('Iniciando carga de datos iniciales...');
  
  try {
    // 1. Crear usuarios de prueba
    console.log('Creando usuarios de prueba...');
    
    // Primero, crear el usuario en auth.users (en una aplicación real, esto se haría con signUp)
    // Aquí simulamos que los usuarios ya están creados en auth.users
    
    const doctorId = '550e8400-e29b-41d4-a716-446655440000'; // ID simulado
    const patientUserId = '550e8400-e29b-41d4-a716-446655440001'; // ID simulado
    
    // Insertar datos de usuario en la tabla users
    const { error: userError } = await supabase
      .from('users')
      .upsert([
        {
          id: doctorId,
          name: 'Dra. Martínez',
          email: 'martinez@email.com',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          preferences: {
            theme: 'light',
            language: 'es'
          }
        },
        {
          id: patientUserId,
          name: 'Carlos Rodríguez',
          email: 'carlos@email.com',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          preferences: {
            theme: 'dark',
            language: 'es'
          }
        }
      ]);
    
    if (userError) {
      console.error('Error al crear usuarios:', userError);
      return;
    }
    
    // 2. Crear pacientes de prueba
    console.log('Creando pacientes de prueba...');
    
    const { data: patients, error: patientError } = await supabase
      .from('patients')
      .upsert([
        {
          name: 'Carlos Rodríguez',
          email: 'carlos@email.com',
          phone: '+34 555 123 456',
          img: 'https://randomuser.me/api/portraits/men/32.jpg',
          birth_date: '1985-06-15',
          medical_history: 'Hipertensión leve. Tratamiento con Enalapril 10mg.',
          doctor_id: doctorId
        },
        {
          name: 'Ana Martín',
          email: 'ana@email.com',
          phone: '+34 555 789 012',
          img: 'https://randomuser.me/api/portraits/women/44.jpg',
          birth_date: '1990-03-22',
          medical_history: 'Alergia a penicilina. Control anual.',
          doctor_id: doctorId
        },
        {
          name: 'Miguel Sánchez',
          email: 'miguel@email.com',
          phone: '+34 555 345 678',
          img: 'https://randomuser.me/api/portraits/men/67.jpg',
          birth_date: '1978-11-10',
          medical_history: 'Diabetes tipo 2. Control trimestral.',
          doctor_id: doctorId
        }
      ])
      .select();
    
    if (patientError) {
      console.error('Error al crear pacientes:', patientError);
      return;
    }
    
    // 3. Crear citas de prueba
    console.log('Creando citas de prueba...');
    
    const carlosId = patients[0].id;
    const anaId = patients[1].id;
    
    const { error: appointmentError } = await supabase
      .from('appointments')
      .upsert([
        {
          patient_id: carlosId,
          doctor_id: doctorId,
          date: '2025-05-12',
          time: '10:30 - 11:00',
          type: 'Consulta general',
          status: 'confirmed',
          notes: 'Control de tensión arterial'
        },
        {
          patient_id: anaId,
          doctor_id: doctorId,
          date: '2025-05-12',
          time: '12:00 - 12:30',
          type: 'Seguimiento tratamiento',
          status: 'pending',
          notes: 'Revisión de analíticas recientes'
        },
        {
          patient_id: carlosId,
          doctor_id: doctorId,
          date: '2025-05-20',
          time: '09:00 - 09:30',
          type: 'Consulta seguimiento',
          status: 'pending',
          notes: 'Evaluación del tratamiento actual'
        }
      ]);
    
    if (appointmentError) {
      console.error('Error al crear citas:', appointmentError);
      return;
    }
    
    // 4. Crear mensajes de prueba
    console.log('Creando mensajes de prueba...');
    
    const { error: messageError } = await supabase
      .from('messages')
      .upsert([
        {
          sender_id: patientUserId,
          receiver_id: doctorId,
          content: 'Hola doctora, ¿podría adelantar mi cita del día 20?',
          read: true,
          created_at: new Date(2025, 4, 10, 9, 30).toISOString()
        },
        {
          sender_id: doctorId,
          receiver_id: patientUserId,
          content: 'Buenos días Carlos. Sí, podría atenderle el día 15 a las 10:00h. ¿Le viene bien?',
          read: true,
          created_at: new Date(2025, 4, 10, 10, 15).toISOString()
        },
        {
          sender_id: patientUserId,
          receiver_id: doctorId,
          content: 'Perfecto, muchas gracias. Nos vemos el día 15.',
          read: false,
          created_at: new Date(2025, 4, 10, 10, 30).toISOString()
        }
      ]);
    
    if (messageError) {
      console.error('Error al crear mensajes:', messageError);
      return;
    }
    
    console.log('Datos iniciales cargados correctamente.');
  } catch (error) {
    console.error('Error durante la carga de datos:', error);
  }
}

// Ejecutar la función si este archivo se ejecuta directamente
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Proceso de carga finalizado.');
      process.exit(0);
    })
    .catch(error => {
      console.error('Error en el proceso de carga:', error);
      process.exit(1);
    });
}

module.exports = seedDatabase;
