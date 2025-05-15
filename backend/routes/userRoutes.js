const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Obtener un usuario específico
router.get('/:id', userController.getUserById);

// Crear un nuevo usuario (registro)
router.post('/', userController.createUser);

// Login de usuario
router.post('/login', userController.loginUser);

// Actualizar perfil de usuario
router.put('/:id', userController.updateUser);

// Obtener preferencias de usuario
router.get('/:id/preferences', userController.getUserPreferences);

// Actualizar preferencias de usuario
router.patch('/:id/preferences', userController.updateUserPreferences);

module.exports = router;
