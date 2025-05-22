/**
 * Punto de entrada para el backend de la aplicación
 * Configura y arranca el servidor Express
 */

const server = require('./server');
const config = require('./utils/config');

const PORT = config.PORT;

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:${PORT}`);
  console.log(`Entorno: ${config.NODE_ENV}`);
});
