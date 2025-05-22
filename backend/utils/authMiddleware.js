const supabase = require('../services/supabaseClient');

/**
 * Middleware para verificar si un usuario está autenticado
 * Comprueba el token JWT en el encabezado de autorización
 */
const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado. Token no proporcionado.' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    // Verificar el token JWT con Supabase
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data.user) {
      return res.status(401).json({ message: 'No autorizado. Token inválido.' });
    }
    
    // Añadir el usuario a la solicitud para uso posterior
    req.user = data.user;
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(401).json({ message: 'No autorizado. Error en autenticación.' });
  }
};

/**
 * Middleware para verificar si un usuario es médico
 * Debe usarse después del middleware requireAuth
 */
const requireDoctor = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No autorizado. Usuario no autenticado.' });
  }
  
  try {
    // Obtener el rol del usuario desde la base de datos
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', req.user.id)
      .single();
    
    if (error || !data) {
      return res.status(401).json({ message: 'No autorizado. Usuario no encontrado.' });
    }
    
    if (data.role !== 'doctor') {
      return res.status(403).json({ message: 'Prohibido. Se requiere rol de médico.' });
    }
    
    next();
  } catch (error) {
    console.error('Error al verificar rol de usuario:', error);
    return res.status(500).json({ message: 'Error al verificar rol de usuario.' });
  }
};

module.exports = { requireAuth, requireDoctor };
