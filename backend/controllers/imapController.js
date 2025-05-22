const imapService = require('../services/imapService');

const imapController = {
  /**
   * Verifica y procesa correos electrónicos no leídos
   * @param {Object} req - Objeto de petición
   * @param {Object} res - Objeto de respuesta
   */
  checkEmails: async (req, res) => {
    try {
      console.log('Iniciando verificación de correos no leídos...');
      const emails = await imapService.fetchUnreadEmails();
      
      res.status(200).json({
        message: `Se han procesado ${emails.length} correos nuevos`,
        count: emails.length
      });
    } catch (error) {
      console.error('Error al verificar correos:', error);
      res.status(500).json({
        message: 'Error al verificar correos',
        error: error.message
      });
    }
  },
  
  /**
   * Obtiene la lista de correos electrónicos de pacientes
   * @param {Object} req - Objeto de petición
   * @param {Object} res - Objeto de respuesta
   */
  getPatientEmails: async (req, res) => {
    try {
      const emails = await imapService.getPatientEmails();
      
      res.status(200).json({
        message: `Se encontraron ${emails.length} direcciones de correo`,
        emails
      });
    } catch (error) {
      console.error('Error al obtener correos de pacientes:', error);
      res.status(500).json({
        message: 'Error al obtener correos de pacientes',
        error: error.message
      });
    }
  },
  
  /**
   * Configura una verificación automática de correos
   * @param {Object} req - Objeto de petición
   * @param {Object} res - Objeto de respuesta
   */
  setupAutoCheck: async (req, res) => {
    try {
      const { intervalMinutes = 5 } = req.body;
      
      // Validar el intervalo
      if (intervalMinutes < 1) {
        return res.status(400).json({
          message: 'El intervalo debe ser al menos 1 minuto'
        });
      }
      
      // Configurar el intervalo global (lo guardamos en el objeto global para acceder desde cualquier parte)
      global.emailCheckInterval = setInterval(async () => {
        console.log(`Verificación automática de correos (cada ${intervalMinutes} minutos)...`);
        try {
          await imapService.fetchUnreadEmails();
        } catch (error) {
          console.error('Error en verificación automática de correos:', error);
        }
      }, intervalMinutes * 60 * 1000);
      
      res.status(200).json({
        message: `Verificación automática configurada cada ${intervalMinutes} minutos`
      });
    } catch (error) {
      console.error('Error al configurar verificación automática:', error);
      res.status(500).json({
        message: 'Error al configurar verificación automática',
        error: error.message
      });
    }
  },
  
  /**
   * Detiene la verificación automática de correos
   * @param {Object} req - Objeto de petición
   * @param {Object} res - Objeto de respuesta
   */
  stopAutoCheck: async (req, res) => {
    try {
      if (global.emailCheckInterval) {
        clearInterval(global.emailCheckInterval);
        global.emailCheckInterval = null;
        
        res.status(200).json({
          message: 'Verificación automática detenida'
        });
      } else {
        res.status(400).json({
          message: 'No hay verificación automática configurada'
        });
      }
    } catch (error) {
      console.error('Error al detener verificación automática:', error);
      res.status(500).json({
        message: 'Error al detener verificación automática',
        error: error.message
      });
    }
  }
};

module.exports = imapController;
