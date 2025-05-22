const express = require('express');
const router = express.Router();
const imapController = require('../controllers/imapController');

// Ruta para verificar correos electrónicos nuevos
router.get('/check', imapController.checkEmails);

// Ruta para obtener lista de correos de pacientes
router.get('/patient-emails', imapController.getPatientEmails);

// Ruta para configurar verificación automática
router.post('/auto-check', imapController.setupAutoCheck);

// Ruta para detener verificación automática
router.delete('/auto-check', imapController.stopAutoCheck);

module.exports = router;
