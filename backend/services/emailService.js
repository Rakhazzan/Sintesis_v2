const nodemailer = require('nodemailer');

// Configuración del transporte de correo con Mailtrap
const transport = nodemailer.createTransport({
  host: process.env.SMTPHOST,
  port: process.env.SMTPPORT,
  auth: {
    user: "clinicaclinica640@gmail.com",
    pass: process.env.PASS
  }
});

// Servicio para manejar operaciones con correos electrónicos
const emailService = {
  /**
   * Enviar un correo electrónico
   * @param {Object} options - Opciones del correo
   * @param {string} options.to - Dirección de correo del destinatario
   * @param {string} options.subject - Asunto del correo
   * @param {string} options.text - Texto plano del correo
   * @param {string} options.html - Contenido HTML del correo (opcional)
   * @param {string} options.from - Remitente del correo (opcional, por defecto es la clínica)
   * @returns {Promise} - Promesa con el resultado del envío
   */
  sendEmail: async (options) => {
    try {
      const mailOptions = {
        from: options.from || '"Clínica App" <clinicaclinica640@gmail.com>',
        to: options.to,
        subject: options.subject,
        text: options.text
      };

      if (options.html) {
        mailOptions.html = options.html;
      }

      const info = await transport.sendMail(mailOptions);
      console.log('Correo enviado: %s', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error al enviar correo:', error);
      throw error;
    }
  },

  /**
   * Enviar un correo al paciente
   * @param {Object} patient - Datos del paciente
   * @param {string} subject - Asunto del correo
   * @param {string} message - Mensaje del correo
   * @returns {Promise} - Promesa con el resultado del envío
   */
  sendToPatient: async (patient, subject, message) => {
    if (!patient.email) {
      throw new Error('El paciente no tiene un correo electrónico asociado');
    }

    return emailService.sendEmail({
      to: patient.email,
      subject,
      text: message,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #4f46e5;">${subject}</h2>
        <p style="font-size: 16px; line-height: 1.5;">${message}</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="color: #666;">Saludos,<br>Equipo Clínica App</p>
        </div>
      </div>`
    });
  },

  /**
   * Enviar correo a todos los pacientes seleccionados
   * @param {Array} patients - Lista de pacientes
   * @param {string} subject - Asunto del correo
   * @param {string} message - Mensaje del correo
   * @returns {Promise} - Promesa con los resultados de los envíos
   */
  sendBulkToPatients: async (patients, subject, message) => {
    const results = [];
    
    for (const patient of patients) {
      if (patient.email) {
        try {
          const result = await emailService.sendToPatient(patient, subject, message);
          results.push({ patient: patient.name, success: true, messageId: result.messageId });
        } catch (error) {
          results.push({ patient: patient.name, success: false, error: error.message });
        }
      } else {
        results.push({ patient: patient.name, success: false, error: 'No tiene correo electrónico' });
      }
    }
    
    return results;
  }
};

module.exports = emailService;
