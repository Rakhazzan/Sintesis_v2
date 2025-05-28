const Imap = require(" imap\);
const { simpleParser } = require(\mailparser\);
const { v4: uuidv4 } = require(\uuid\);
const { supabase } = require(\./supabaseClient\);

// Configuración para la conexión IMAP
const imapConfig = {
 user: process.env.EMAIL_USER || \clinicaclinica640@gmail.com\,
 password: process.env.EMAIL_PASSWORD || process.env.PASS,
 host: process.env.IMAP_HOST || \imap.gmail.com\,
 port: process.env.IMAP_PORT || 993,
 tls: true,
 tlsOptions: { rejectUnauthorized: false }
};

// Servicio simplificado para manejar operaciones IMAP
const imapService = {
 fetchUnreadEmails: async (options = {}) => {
 return new Promise((resolve, reject) => {
 try {
 const imap = new Imap(imapConfig);
 const processedEmails = [];
 
 // Manejador para abrir el inbox
 const openInbox = (cb) => {
 imap.openBox(\INBOX\, false, cb);
 };
 
 // Cuando la conexión está lista
 imap.once(\ready\, () => {
 openInbox((err, box) => {
 if (err) {
 console.error(\Error al abrir la bandeja de entrada:\, err);
 return reject(err);
 }
 
 // Buscar emails no leídos (UNSEEN)
 imap.search([\UNSEEN\], (err, results) => {
 if (err) {
 console.error(\Error al buscar emails:\, err);
 return reject(err);
 }
 
 // Si no hay emails nuevos, terminamos
 if (!results || results.length === 0) {
 console.log(\No hay emails nuevos\);
 imap.end();
 return resolve([]);
 }
 
 console.log(Encontrados emails nuevos);
 
 // Obtener los emails y marcarlos como leídos
 const fetch = imap.fetch(results, { bodies: \\, markSeen: true });
 
 // Procesar cada mensaje
 fetch.on(\message\, (msg, seqno) => {
 let buffer = \\;
 
 // Obtener el cuerpo del mensaje
 msg.on(\body\, (stream) => {
 stream.on(\data\, (chunk) => {
 buffer += chunk.toString(\utf8\);
 });
 });
 
 // Cuando termina de recibir el mensaje
 msg.once(\end\, () => {
 // Procesamos de forma asíncrona e independiente del stream
 setTimeout(async () => {
 try {
 // Parsear el email usando mailparser
 let parsed;
 try {
 parsed = await simpleParser(buffer);
 } catch (error) {
 console.error(Error al parsear email #:, error);
 return;
 }
 
 // Extraer email del remitente de forma segura
 let fromEmail = null;
 
 try {
 if (parsed.from && parsed.from.value && 
 Array.isArray(parsed.from.value) && 
 parsed.from.value.length > 0 && 
 parsed.from.value[0].address) {
 fromEmail = parsed.from.value[0].address;
 } else if (parsed.from && parsed.from.text) {
 const matches = parsed.from.text.match(/[\\w.-]+@[\\w.-]+\\.[\\w.-]+/);
 if (matches && matches.length > 0) {
 fromEmail = matches[0];
 }
 }
 } catch (error) {
 console.error(\Error al extraer email:\, error);
 }
 
 if (!fromEmail) {
 console.log(No se pudo determinar el remitente del email #);
 return;
 }
 
 console.log(Remitente detectado: );
 
 // ID fijo del médico (receptor)
 const doctorId = \c8cc0e50-e427-43f3-a90c-f5a0bf8d3a49\;
 
 try {
 // Buscar paciente por email
 let { data: patient, error: findError } = await supabase
 .from(\patients\)
 .select(\id name email\)
 .eq(\email\, fromEmail)
 .maybeSingle();
 
 if (findError) {
 throw new Error(Error al buscar paciente: );
 }
 
 // Crear paciente si no existe
 let patientData = patient;
 
 if (!patientData) {
 console.log(Creando paciente para: );
 const newPatientId = uuidv4();
 
 const { error: createError } = await supabase
 .from(\patients\)
 .insert({
 id: newPatientId,
 name: fromEmail.split(\@\)[0],
 email: fromEmail,
 created_at: new Date().toISOString()
 });
 
 if (createError) {
 throw new Error(Error al crear paciente: );
 }
 
 patientData = {
 id: newPatientId,
 name: fromEmail.split(\@\)[0],
 email: fromEmail
 };
 }
 
 // Guardar mensaje
 console.log(Guardando mensaje de ());
 
 const messageId = uuidv4();
 const messageData = {
 id: messageId,
 patient_id: patientData.id,
 doctor_id: doctorId,
 subject: parsed.subject || \Sin asunto\,
 content: parsed.text || parsed.html || \\,
 is_from_patient: true,
 created_at: new Date().toISOString(),
 read: false
 };
 
 const { error: msgError } = await supabase
 .from(\messages\)
 .insert(messageData);
 
 if (msgError) {
 console.error(\Error al guardar mensaje:\, msgError);
 } else {
 console.log(Mensaje guardado con éxito con ID: );
 processedEmails.push({
 messageId: messageId,
 patientId: patientData.id,
 patientName: patientData.name
 });
 }
 } catch (error) {
 console.error(\Error en la operación de base de datos:\, error);
 }
 } catch (error) {
 console.error(Error general al procesar email #:, error);
 }
 }, 0);
 });
 });
 
 // Si hay error en el fetch
 fetch.once(\error\, (err) => {
 console.error(\Error al obtener emails:\, err);
 reject(err);
 });
 
 // Cuando termina el fetch
 fetch.once(\end\, () => {
 console.log(\Procesamiento de emails completado\);
 // Dar tiempo para que se completen las operaciones asíncronas
 setTimeout(() => {
 console.log(Se procesaron emails);
 imap.end();
 }, 2000);
 });
 });
 });
 });
 
 // Manejar errores de conexión
 imap.once(\error\, (err) => {
 console.error(\Error en conexión IMAP:\, err);
 reject(err);
 });
 
 // Cuando se cierra la conexión
 imap.once(\end\, () => {
 console.log(\Conexión IMAP cerrada\);
 resolve(processedEmails);
 });
 
 // Iniciar conexión
 imap.connect();
 } catch (error) {
 console.error(\Error general en fetchUnreadEmails:\, error);
 reject(error);
 }
 });
 },

 // Obtiene las direcciones de correo de todos los pacientes
 getPatientEmails: async () => {
 try {
 const { data, error } = await supabase
 .from(\patients\)
 .select(\id name email\)
 .not(\email\, \is\, null);
 
 if (error) {
 console.error(\Error al obtener emails de pacientes:\, error);
 throw error;
 }
 
 return data.filter(p => p.email && p.email.trim() !== \\);
 } catch (error) {
 console.error(\Error en getPatientEmails:\, error);
 throw error;
 }
 }
};

module.exports = imapService;
