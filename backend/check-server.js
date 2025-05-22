const http = require('http');

// Función para verificar si el servidor está respondiendo
const checkServerStatus = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: '/',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};

// Función para verificar si la ruta específica existe
const checkRouteExists = (route) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: route,
      method: 'OPTIONS'
    };

    const req = http.request(options, (res) => {
      resolve({
        status: res.statusCode,
        exists: res.statusCode !== 404
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};

// Ejecutar comprobaciones
const runChecks = async () => {
  console.log('Verificando el estado del servidor...');
  
  try {
    // Verificar si el servidor está respondiendo
    const serverStatus = await checkServerStatus();
    console.log(`✅ Servidor respondiendo con estado: ${serverStatus.status}`);
    
    // Verificar rutas
    console.log('\nVerificando rutas importantes:');
    
    // Ruta de mensajes
    const messagesRoute = await checkRouteExists('/api/messages');
    console.log(`${messagesRoute.exists ? '✅' : '❌'} Ruta /api/messages: ${messagesRoute.status}`);
    
    // Ruta de email
    const emailRoute = await checkRouteExists('/api/messages/email');
    console.log(`${emailRoute.exists ? '✅' : '❌'} Ruta /api/messages/email: ${emailRoute.status}`);
    
    console.log('\nResumen:');
    if (!messagesRoute.exists) {
      console.log('❗ La ruta base de mensajes no está disponible. Verifica que el servidor esté usando correctamente el router de mensajes.');
    }
    
    if (!emailRoute.exists) {
      console.log('❗ La ruta para enviar emails no está disponible. Posibles causas:');
      console.log('  - El router no está configurado correctamente');
      console.log('  - La ruta no está registrada correctamente en el router');
      console.log('  - El método HTTP no está soportado (debería ser POST)');
    }
    
  } catch (error) {
    console.error('❌ El servidor no está respondiendo:', error.message);
    console.log('\nPasos para solucionar:');
    console.log('1. Asegúrate de que el servidor backend esté en ejecución (node server.js)');
    console.log('2. Verifica que el puerto 4000 esté disponible y no bloqueado');
    console.log('3. Comprueba los logs del servidor para ver posibles errores de inicialización');
  }
};

runChecks();
