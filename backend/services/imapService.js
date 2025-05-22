const Imap = require('imap');
const { simpleParser } = require('mailparser');
const { v4: uuidv4 } = require('uuid');
const { supabase } = require('./supabaseClient');

// Configuración para la conexión IMAP
const imapConfig = {
  user: process.env.EMAIL_USER || 'clinicaclinica640@gmail.com',
  password: process.env.EMAIL_PASSWORD || process.env.PASS,
  host: process.env.IMAP_HOST || 'imap.gmail.com',
  port: process.env.IMAP_PORT || 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }
};

const imapService = {
  /**
   * Conecta con el servidor IMAP y procesa los mensajes no leídos
   * @param {Object} options - Opciones adicionales
   * @returns {Promise} - Promesa con el resultado de la operación
   */
  fetchUnreadEmails: async (options = {}) => {
    return new Promise((resolve, reject) => {
      try {
        const imap = new Imap(imapConfig);
        const processedEmails = [];

        const openInbox = (cb) => {
          imap.openBox('INBOX', false, cb);
        };

        imap.once('ready', () => {
          openInbox((err, box) => {
            if (err) {
              console.error('Error al abrir la bandeja de entrada:', err);
              return reject(err);
            }

            // Buscar emails no leídos
            imap.search(['UNSEEN'], (err, results) => {
              if (err) {
                console.error('Error al buscar emails:', err);
                return reject(err);
              }

              if (results.length === 0) {
                console.log('No hay emails nuevos');
                imap.end();
                return resolve([]);
              }

              console.log(`Encontrados ${results.length} emails nuevos`);
              
              const fetch = imap.fetch(results, { bodies: '', markSeen: true });
              
              fetch.on('message', (msg) => {
                const emailData = {
                  from: null,
                  to: null,
                  subject: null,
                  text: null,
                  html: null,
                  date: null,
                  messageId: null
                };

                msg.on('body', (stream) => {
                  let buffer = '';
                  
                  stream.on('data', (chunk) => {
                    buffer += chunk.toString('utf8');
                  });
                  
                  stream.once('end', async () => {
                    try {
                      // Parsear el email
                      const parsed = await simpleParser(buffer);
                      
                      emailData.from = parsed.from?.text;
                      emailData.to = parsed.to?.text;
                      emailData.subject = parsed.subject;
                      emailData.text = parsed.text;
                      emailData.html = parsed.html;
                      emailData.date = parsed.date;
                      emailData.messageId = parsed.messageId;

                      // Intentar identificar al paciente por su dirección de correo
                      let patientId = null;
                      const fromEmail = parsed.from?.value?.[0]?.address;
                      
                      if (fromEmail) {
                        // Buscar en la base de datos el paciente con ese email
                        const { data: patient, error } = await supabase
                          .from('patients')
                          .select('id, name')
                          .eq('email', fromEmail)
                          .single();
                        
                        if (patient) {
                          patientId = patient.id;
                          console.log(`Email de ${patient.name} (${patientId})`);
                        } else {
                          console.log(`No se encontró un paciente con el email ${fromEmail}`);
                        }
                      }

                      // Si encontramos el paciente, guardamos el mensaje en la base de datos
                      if (patientId) {
                        // Determinar si es respuesta a un mensaje anterior
                        const isReply = parsed.subject?.toLowerCase().startsWith('re:');
                        
                        // ID del médico (debe existir en la base de datos)
                        const doctorId = process.env.DEFAULT_DOCTOR_ID || 'c8cc0e50-e427-43f3-a90c-f5a0bf8d3a49';
                        
                        try {
                          // Crear mensaje en la base de datos
                          const { data: message, error } = await supabase
                            .from('messages')
                            .insert({
                              id: uuidv4(),
                              sender_id: patientId,
                              receiver_id: doctorId,
                              sender_type: 'patient',
                              receiver_type: 'doctor',
                              subject: parsed.subject || 'Sin asunto',
                              content: parsed.text || parsed.html || 'Sin contenido',
                              created_at: new Date().toISOString(),
                              read: false,
                              email_sent: 'received' // Marcamos que este mensaje fue recibido por email
                            });
                          
                          if (error) {
                            console.error('Error al guardar el mensaje:', error);
                          } else {
                            console.log('Mensaje guardado en la base de datos');
                          }
                        } catch (dbError) {
                          console.error('Error al interactuar con la base de datos:', dbError);
                        }
                      }
                      
                      processedEmails.push(emailData);
                    } catch (parseError) {
                      console.error('Error al procesar el email:', parseError);
                    }
                  });
                });
              });
              
              fetch.once('error', (err) => {
                console.error('Error en fetch:', err);
                reject(err);
              });
              
              fetch.once('end', () => {
                console.log('Procesamiento de emails completado');
                imap.end();
              });
            });
          });
        });

        imap.once('error', (err) => {
          console.error('Error en la conexión IMAP:', err);
          reject(err);
        });

        imap.once('end', () => {
          console.log('Conexión IMAP cerrada');
          resolve(processedEmails);
        });

        imap.connect();
      } catch (error) {
        console.error('Error al conectar con el servidor IMAP:', error);
        reject(error);
      }
    });
  },

  /**
   * Obtiene las direcciones de correo de todos los pacientes
   * @returns {Promise<Array>} - Lista de emails de pacientes
   */
  getPatientEmails: async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('id, name, email')
        .not('email', 'is', null);
      
      if (error) {
        console.error('Error al obtener emails de pacientes:', error);
        throw error;
      }
      
      return data.filter(p => p.email && p.email.trim() !== '');
    } catch (error) {
      console.error('Error en getPatientEmails:', error);
      throw error;
    }
  }
};

module.exports = imapService;
