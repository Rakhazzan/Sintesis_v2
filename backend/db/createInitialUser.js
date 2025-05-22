require('dotenv').config({ path: '../../.env' });
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Se requieren las variables de entorno REACT_APP_SUPABASE_URL y SUPABASE_SERVICE_KEY');
  process.exit(1);
}

// Crear cliente Supabase con la clave de servicio para tener permisos admin
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createInitialUser() {
  console.log('Creando usuario inicial para testeo...');
  
  const userEmail = 'martinez@email.com';
  const userPassword = '12345678';
  
  try {
    // 1. Verificar si el usuario ya existe
    const { data: existingUsers, error: checkError } = await supabase.auth.admin.listUsers();
    
    if (checkError) {
      console.error('Error al verificar usuarios existentes:', checkError);
      return;
    }
    
    const userExists = existingUsers.users.some(user => user.email === userEmail);
    
    if (userExists) {
      console.log(`El usuario ${userEmail} ya existe en Auth. No es necesario crearlo.`);
      return;
    }
    
    // 2. Crear usuario en Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: userEmail,
      password: userPassword,
      email_confirm: true, // Confirmar email automáticamente
      user_metadata: {
        name: 'Dra. Martínez'
      }
    });
    
    if (authError) {
      console.error('Error al crear usuario en Auth:', authError);
      return;
    }
    
    console.log(`Usuario creado exitosamente en Auth con ID: ${authUser.user.id}`);
    
    // 3. Crear registro en la tabla users
    const { error: userError } = await supabase
      .from('users')
      .upsert({
        id: authUser.user.id,
        name: 'Dra. Martínez',
        email: userEmail,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        preferences: {
          theme: 'light',
          language: 'es'
        }
      });
    
    if (userError) {
      console.error('Error al crear registro en tabla users:', userError);
      return;
    }
    
    console.log('Usuario creado exitosamente en la tabla users');
    console.log('\nAhora puedes iniciar sesión con:');
    console.log(`Email: ${userEmail}`);
    console.log(`Contraseña: ${userPassword}`);
    
  } catch (error) {
    console.error('Error inesperado:', error);
  }
}

// Ejecutar función
createInitialUser()
  .then(() => {
    console.log('Proceso completado.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error fatal:', err);
    process.exit(1);
  });
