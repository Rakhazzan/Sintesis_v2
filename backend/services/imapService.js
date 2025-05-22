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
        // Creamos una instancia de cliente IMAP
        const imap = new Imap(imapConfig);
        const processedEmails = [];
        
        // Manejador para abrir el inbox
        const openInbox = (cb) => {
          imap.openBox('INBOX', false, cb);
        };
        
        // Cuando la conexión está lista
        imap.once('ready', () => {
          openInbox((err, box) => {
            if (err) {
              console.error('Error al abrir la bandeja de entrada:', err);
              return reject(err);
            }
            
            // Buscar emails no leídos (UNSEEN)
            imap.search(['UNSEEN'], (err, results) => {
              if (err) {
                console.error('Error al buscar emails:', err);
                return reject(err);
              }
              
              // Si no hay emails nuevos, terminamos
              if (!results || results.length === 0) {
                console.log('No hay emails nuevos');
                imap.end();
                return resolve([]);
              }
              
              console.log(`Encontrados ${results.length} emails nuevos`);
              
              // Obtener los emails y marcarlos como leídos
              const fetch = imap.fetch(results, { bodies: '', markSeen: true });
              
              // Procesar cada mensaje
              fetch.on('message', (msg) => {
                let emailData = {
                  from: null,
                  to: null,
                  subject: null,
                  text: null,
                  html: null,
                  date: new Date().toISOString(),
                  messageId: null,
                  fromEmail: null
                };
                
                // Obtener el cuerpo del mensaje
                msg.on('body', (stream) => {
                  let buffer = '';
                  
                  stream.on('data', (chunk) => {
                    buffer += chunk.toString('utf8');
                  });
                  
                  // Cuando termina de recibir el cuerpo
                  stream.once('end', async () => {
                    try {
                      // Parsear el email usando mailparser
                      const parsed = await simpleParser(buffer);
                      
                      // Extraer información básica del email
                      let fromEmail = null;
                      
                      // Intentar obtener el email del remitente de diferentes formas
                      if (parsed.from && parsed.from.value && parsed.from.value.length > 0) {
                        fromEmail = parsed.from.value[0].address;
                      } else if (parsed.from && parsed.from.text) {
                        // Intentar extraer con regex como respaldo
                        const matches = parsed.from.text.match(/[\w.-]+@[\w.-]+\.[\w.-]+/);
                        if (matches && matches.length > 0) {
                          fromEmail = matches[0];
                        }
                      }
                      
                      if (fromEmail) {
                        console.log(`Remitente detectado: ${fromEmail}`);
                      } else {
                        console.log('No se pudo determinar el remitente del email');
                        processedEmails.push({
                          error: 'No se pudo identificar el remitente',
                          savedToDb: false
                        });
                        return; // Salimos si no hay remitente
                      }
                      
                      // Rellenar los datos del email
                      emailData = {
                        from: parsed.from ? parsed.from.text : null,
                        to: parsed.to ? parsed.to.text : null,
                        subject: parsed.subject || 'Sin asunto',
                        text: parsed.text || '',
                        html: parsed.html || '',
                        date: parsed.date || new Date(),
                        messageId: parsed.messageId || `msg_${Date.now()}`,
                        fromEmail: fromEmail
                      };
                      
                      // ID fijo del médico (receptor)
                      const doctorId = 'c8cc0e50-e427-43f3-a90c-f5a0bf8d3a49';
                      
                      // PASO 1: Buscar o crear el paciente
                      try {
                        // Primero buscar en la tabla de pacientes
                        let { data: patient } = await supabase
                          .from('patients')
                          .select('id, name, email')
                          .eq('email', fromEmail)
                          .maybeSingle();
                        
                        // Si no existe, crearlo
                        if (!patient) {
                          console.log(`Creando paciente para: ${fromEmail}`);
                          const newPatientId = uuidv4();
                          
                          const { data: newPatient, error: createError } = await supabase
                            .from('patients')
                            .insert({
                              id: newPatientId,
                              name: fromEmail.split('@')[0] || 'Nuevo Paciente',
                              email: fromEmail,
                              created_at: new Date().toISOString()
                            })
                            .select();
                            
                          if (createError) {
                            console.error('Error al crear paciente:', createError);
                            processedEmails.push({
                              ...emailData,
                              error: `Error al crear paciente: ${createError.message}`,
                              savedToDb: false
                            });
                            return;
                          }
                          
                          patient = newPatient[0];
                          console.log(`Paciente creado con ID: ${patient.id}`);
                        }
                        
                        // PASO 2: Guardar el mensaje
                        const messageId = uuidv4();
                        const messageData = {
                          id: messageId,
                          sender_id: patient.id,
                          receiver_id: doctorId,
                          sender_type: 'patient',
                          receiver_type: 'doctor',
                          subject: emailData.subject,
                          content: emailData.text || emailData.html || 'Sin contenido',
                          created_at: new Date().toISOString(),
                          read: false,
                          email_sent: 'received'
                        };
                        
                        console.log(`Guardando mensaje de ${patient.name} (${patient.id})`);
                        
                        const { error: msgError } = await supabase
                          .from('messages')
                          .insert(messageData);
                        
                        if (msgError) {
                          console.error('Error al guardar mensaje:', msgError);
                          processedEmails.push({
                            ...emailData,
                            error: `Error al guardar mensaje: ${msgError.message}`,
                            savedToDb: false,
                            patientId: patient.id
                          });
                        } else {
                          console.log(`Mensaje guardado con éxito con ID: ${messageId}`);
                          processedEmails.push({
                            ...emailData,
                            savedToDb: true,
                            messageId: messageId,
                            patientId: patient.id,
                            patientName: patient.name
                          });
                        }
                      } catch (dbError) {
                        console.error('Error en la operación de base de datos:', dbError);
                        processedEmails.push({
                          ...emailData,
                          error: `Error en la base de datos: ${dbError.message}`,
                          savedToDb: false
                        });
                      }
                    } catch (parseError) {
                      console.error('Error al procesar email:', parseError);
                      processedEmails.push({
                        error: `Error al procesar email: ${parseError.message}`,
                        savedToDb: false
                      });
                    }
                  });
                });
              });
              
              // Si hay error en el fetch
              fetch.once('error', (err) => {
                console.error('Error al obtener emails:', err);
                reject(err);
              });
              
              // Cuando termina el fetch
              fetch.once('end', () => {
                console.log('Procesamiento de emails completado');
                // Dar tiempo para que se completen las operaciones asíncronas
                setTimeout(() => {
                  console.log(`Se procesaron ${processedEmails.length} emails`);
                  imap.end();
                }, 2000); // 2 segundos para asegurar que todo se complete
              });
            });
          });
        });
        
        // Manejar errores de conexión
        imap.once('error', (err) => {
          console.error('Error en conexión IMAP:', err);
          reject(err);
        });
        
        // Cuando se cierra la conexión
        imap.once('end', () => {
          console.log('Conexión IMAP cerrada');
          resolve(processedEmails);
        });
        
        // Iniciar conexión
        imap.connect();
      } catch (error) {
        console.error('Error general en fetchUnreadEmails:', error);
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
