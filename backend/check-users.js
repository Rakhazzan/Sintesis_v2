const supabase = require('./services/supabaseClient');

// Función para verificar los usuarios existentes
const checkUsers = async () => {
  try {
    console.log('Consultando usuarios existentes en Supabase...');
    
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, role')
      .limit(10);
    
    if (error) {
      console.error('Error al consultar usuarios:', error);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log('No se encontraron usuarios en la base de datos.');
      
      // Verificar estructura de la tabla
      console.log('\nVerificando estructura de la tabla users...');
      const { data: structureData, error: structureError } = await supabase
        .rpc('get_table_structure', { table_name: 'users' });
      
      if (structureError) {
        console.error('Error al verificar estructura:', structureError);
      } else {
        console.log('Estructura de la tabla users:', structureData);
      }
      
      console.log('\nCreando un usuario de prueba para desarrollo...');
      // Crear un usuario de prueba
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([
          { 
            id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
            name: 'Doctor Prueba',
            email: 'doctor@example.com',
            role: 'doctor',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
          }
        ])
        .select();
      
      if (createError) {
        console.error('Error al crear usuario de prueba:', createError);
      } else {
        console.log('Usuario de prueba creado:', newUser);
      }
      
      return;
    }
    
    console.log('Usuarios encontrados:', data);
    
    // Verificar si existe el usuario con el ID específico
    const testUserId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
    const { data: specificUser, error: specificError } = await supabase
      .from('users')
      .select('id, name, email, role')
      .eq('id', testUserId)
      .single();
    
    if (specificError) {
      if (specificError.code === 'PGRST116') {
        console.log(`\nEl usuario con ID ${testUserId} no existe.`);
        
        console.log('\nCreando el usuario con ID específico para desarrollo...');
        // Crear el usuario con el ID específico
        const { data: newSpecificUser, error: createSpecificError } = await supabase
          .from('users')
          .insert([
            { 
              id: testUserId,
              name: 'Doctor Prueba',
              email: 'doctor@example.com',
              role: 'doctor',
              avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
            }
          ])
          .select();
        
        if (createSpecificError) {
          console.error('Error al crear usuario específico:', createSpecificError);
        } else {
          console.log('Usuario específico creado:', newSpecificUser);
        }
      } else {
        console.error('Error al buscar usuario específico:', specificError);
      }
    } else {
      console.log(`\nUsuario con ID ${testUserId} encontrado:`, specificUser);
    }
    
  } catch (error) {
    console.error('Error inesperado:', error);
  }
};

// Ejecutar la verificación
checkUsers().then(() => {
  console.log('Verificación completa.');
  process.exit(0);
}).catch(error => {
  console.error('Error al ejecutar verificación:', error);
  process.exit(1);
});
