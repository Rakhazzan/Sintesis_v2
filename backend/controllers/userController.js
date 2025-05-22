const userService = require('../services/userService');

// Controlador para manejar las peticiones relacionadas con usuarios
const userController = {
  // Obtener un usuario por su ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener el usuario', 
        error: error.message 
      });
    }
  },
  
  // Crear un nuevo usuario (registro)
  createUser: async (req, res) => {
    try {
      const userData = req.body;
      
      // Verificar si el email ya existe
      try {
        const existingUser = await userService.getUserByEmail(userData.email);
        if (existingUser) {
          return res.status(409).json({ message: 'El email ya está registrado' });
        }
      } catch (error) {
        // Si hay error, probablemente es porque no existe el usuario, lo cual es lo que queremos
      }
      
      const newUser = await userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al crear el usuario', 
        error: error.message 
      });
    }
  },
  
  // Actualizar perfil de usuario
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      
      // Si se está actualizando el email, verificar que no exista ya
      if (userData.email) {
        try {
          const existingUser = await userService.getUserByEmail(userData.email);
          if (existingUser && existingUser.id !== id) {
            return res.status(409).json({ message: 'El email ya está registrado por otro usuario' });
          }
        } catch (error) {
          // Si hay error, probablemente es porque no existe el usuario con ese email
        }
      }
      
      const updatedUser = await userService.updateUser(id, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al actualizar el usuario', 
        error: error.message 
      });
    }
  },
  
  // Actualizar preferencias de usuario (tema, idioma, etc.)
  updateUserPreferences: async (req, res) => {
    try {
      const { id } = req.params;
      const { preferences } = req.body;
      
      const updatedUser = await userService.updateUserPreferences(id, preferences);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al actualizar las preferencias', 
        error: error.message 
      });
    }
  },
  
  // Obtener preferencias de usuario
  getUserPreferences: async (req, res) => {
    try {
      const { id } = req.params;
      const preferences = await userService.getUserPreferences(id);
      res.status(200).json(preferences);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener las preferencias', 
        error: error.message 
      });
    }
  },
  
  // Login de usuario
  loginUser: async (req, res) => {
    try {
      const { email } = req.body;
      
      const user = await userService.getUserByEmail(email);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      // En una aplicación real, aquí se verificaría la contraseña
      // pero para este ejemplo, solo devolvemos el usuario
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al iniciar sesión', 
        error: error.message 
      });
    }
  }
};

module.exports = userController;
