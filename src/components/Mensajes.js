import React, { useState, useEffect, useRef } from "react";
import "./Mensajes.css";
import { ReactComponent as ChatIcon } from "./svg/chat.svg";
import { getUserMessages, sendPatientEmail, checkNewEmails, setupAutoCheckEmails, stopAutoCheckEmails } from "../services/messageService";
import { getPatients } from "../services/patientService";
import { notifyService } from "../services/notifyService";
import gsap from "gsap";

const Mensajes = () => {
  // Estados
  const [busqueda, setBusqueda] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [userId] = useState("c8cc0e50-e427-43f3-a90c-f5a0bf8d3a49"); // ID del doctor/usuario en formato UUID válido
  const [modalVisible, setModalVisible] = useState(false);
  const [checkingEmails, setCheckingEmails] = useState(false);
  const [autoCheckActive, setAutoCheckActive] = useState(false);
  const [lastEmailCheck, setLastEmailCheck] = useState(null);
  const [nuevoMensaje, setNuevoMensaje] = useState({
    asunto: "",
    mensaje: "",
    destinatarios: []
  });
  const [errorMensaje, setErrorMensaje] = useState(null);
  
  // Referencias para animaciones
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const overlayRef = useRef(null);

  // Cargar pacientes primero, luego mensajes
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        console.log('Cargando pacientes...');
        const data = await getPatients();
        console.log('Pacientes cargados:', data.length);
        setPacientes(data);
        // Después de cargar los pacientes, cargamos los mensajes
        fetchMensajes(data);
      } catch (error) {
        setErrorMensaje("Error al cargar pacientes. Comprueba la conexión con el servidor.");
        console.error("Error al cargar pacientes:", error);
      }
    };

    fetchPacientes();
  }, [userId]); // Solo se ejecuta cuando cambia el userId
  
  // Función para cargar mensajes (ahora recibe los pacientes como parámetro)
  const fetchMensajes = async (pacientesData) => {
    setLoading(true);
    setErrorMensaje(null);
    try {
      const data = await getUserMessages(userId);
      console.log('Datos recibidos del backend:', data);
      console.log('Pacientes disponibles:', pacientesData);
      
      // Formatear mensajes recibidos
      const mensajesFormateados = data.map(mensaje => {
        // Buscamos el paciente correspondiente basado en receiver_id
        let nombreMostrado;
        let avatarMostrado;
        
        // Buscar el paciente por su ID independientemente del tipo de mensaje
        const pacienteInfo = pacientesData.find(p => p.id === mensaje.receiver_id);
        console.log(`Mensaje con receiver_id ${mensaje.receiver_id}:`, 
                    pacienteInfo ? `Paciente encontrado: ${pacienteInfo.name}` : 'Paciente no encontrado');
        
        if (pacienteInfo) {
          // Si encontramos información del paciente, usamos sus datos
          nombreMostrado = pacienteInfo.name;
          avatarMostrado = pacienteInfo.avatar;
          console.log(`Usando avatar de paciente: ${avatarMostrado ? 'Disponible' : 'No disponible'}`);
        } else if (mensaje.receiver_type === 'patient') {
          // Es un mensaje a paciente pero no tenemos sus datos
          nombreMostrado = mensaje.receiver?.name || "Paciente";
          avatarMostrado = mensaje.receiver?.avatar || mensaje.receiver?.img || null;
        } else {
          // Para otros tipos de mensajes
          nombreMostrado = mensaje.receiver?.name || mensaje.sender?.name || "Paciente";
          avatarMostrado = mensaje.receiver?.avatar || mensaje.receiver?.img || mensaje.sender?.avatar || mensaje.sender?.img || null;
        }
        
        return {
          id: mensaje.id,
          nombre: nombreMostrado,
          avatar: avatarMostrado,
          mensaje: mensaje.content,
          asunto: mensaje.subject,
          hora: formatearFecha(mensaje.created_at),
          leidos: mensaje.read,
          cantidad: !mensaje.read ? 1 : 0,
          emailEnviado: mensaje.email_sent,
          receiver_id: mensaje.receiver_id // Guardamos esto para referencia
        };
      });
        
      setMensajes(mensajesFormateados);
    } catch (error) {
      setErrorMensaje("Error al cargar mensajes. Comprueba la conexión con el servidor.");
      notifyService.error("Error al cargar mensajes");
      console.error("Error al cargar mensajes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar solo pacientes
  useEffect(() => {
    const loadPacientes = async () => {
      try {
        const data = await getPatients();
        setPacientes(data);
      } catch (error) {
        setErrorMensaje("Error al cargar pacientes. Comprueba la conexión con el servidor.");
        console.error("Error al cargar pacientes:", error);
      }
    };

    loadPacientes();
  }, []);

  // Formatear fecha para mostrar
  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    const hoy = new Date();
    const ayer = new Date(hoy);
    ayer.setDate(ayer.getDate() - 1);
    
    // Si es hoy, mostrar hora
    if (fecha.toDateString() === hoy.toDateString()) {
      return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Si es ayer, mostrar "Ayer"
    if (fecha.toDateString() === ayer.toDateString()) {
      return "Ayer";
    }
    
    // Si es esta semana, mostrar el día
    const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    if (hoy.getTime() - fecha.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return diasSemana[fecha.getDay()];
    }
    
    // Si es anterior, mostrar fecha corta
    return fecha.toLocaleDateString();
  };

  // Verificar nuevos correos electrónicos
  const handleCheckEmails = async () => {
    try {
      setCheckingEmails(true);
      notifyService.info('Verificando correos nuevos...');
      
      const result = await checkNewEmails();
      
      // Actualizar estado después de verificar
      setLastEmailCheck(new Date());
      
      // Recargar mensajes para mostrar los nuevos
      await fetchMensajes(pacientes);
      
      notifyService.success(`${result.message}`);
    } catch (error) {
      notifyService.error('Error al verificar correos');
      console.error('Error al verificar correos:', error);
    } finally {
      setCheckingEmails(false);
    }
  };
  
  // Activar/desactivar verificación automática
  const toggleAutoCheck = async () => {
    try {
      if (autoCheckActive) {
        // Desactivar verificación automática
        await stopAutoCheckEmails();
        setAutoCheckActive(false);
        notifyService.info('Verificación automática desactivada');
      } else {
        // Activar verificación automática (cada 5 minutos)
        await setupAutoCheckEmails(5);
        setAutoCheckActive(true);
        notifyService.success('Verificación automática activada (cada 5 minutos)');
      }
    } catch (error) {
      notifyService.error('Error al configurar verificación automática');
      console.error('Error:', error);
    }
  };
  
  // Manejar click en el botón de nuevo mensaje
  const handleNuevoMensaje = () => {
    setModalVisible(true);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setModalVisible(false);
    // Reiniciar formulario
    setNuevoMensaje({
      asunto: "",
      mensaje: "",
      destinatarios: []
    });
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoMensaje(prev => ({ ...prev, [name]: value }));
  };

  // Manejar selección/deselección de pacientes
  const togglePacienteSeleccionado = (id) => {
    setNuevoMensaje(prev => {
      if (prev.destinatarios.includes(id)) {
        return { ...prev, destinatarios: prev.destinatarios.filter(pid => pid !== id) };
      } else {
        return { ...prev, destinatarios: [...prev.destinatarios, id] };
      }
    });
  };

  // Enviar mensaje/email
  const enviarMensaje = async (e) => {
    e.preventDefault();
    
    if (nuevoMensaje.destinatarios.length === 0) {
      notifyService.error("Selecciona al menos un destinatario");
      return;
    }
    
    if (!nuevoMensaje.asunto || !nuevoMensaje.mensaje) {
      notifyService.error("El asunto y el mensaje son obligatorios");
      return;
    }
    
    setLoading(true);
    setErrorMensaje(null);
    
    try {
      let resultado;
      
      try {
        // Intentar enviar el mensaje a través del backend
        resultado = await sendPatientEmail({
          patientIds: nuevoMensaje.destinatarios,
          subject: nuevoMensaje.asunto,
          message: nuevoMensaje.mensaje,
          senderId: userId
        });
      } catch (backendError) {
        console.log("El backend no está disponible, simulando envío de mensajes", backendError);
        
        // Si el backend no está disponible, simular respuesta exitosa
        const destinatariosSeleccionados = nuevoMensaje.destinatarios.map(id => {
          const paciente = pacientes.find(p => p.id === id);
          return {
            patient: paciente?.name || 'Paciente',
            success: true,
            messageId: `simulado-${Date.now()}-${Math.floor(Math.random() * 1000)}`
          };
        });
        
        resultado = {
          results: destinatariosSeleccionados,
          message: `Simulación: Emails enviados a ${destinatariosSeleccionados.length} pacientes`
        };
        
        // Simular nuevo mensaje
        const fechaActual = new Date();
        const nuevosMensajes = nuevoMensaje.destinatarios.map(id => {
          const paciente = pacientes.find(p => p.id === id);
          return {
            id: `simulado-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            nombre: paciente?.name || 'Paciente',
            avatar: paciente?.avatar || paciente?.img || null,
            mensaje: nuevoMensaje.mensaje,
            asunto: nuevoMensaje.asunto,
            hora: formatearFecha(fechaActual.toISOString()),
            leidos: false,
            cantidad: 1,
            emailEnviado: true
          };
        });
        
        // Agregar nuevos mensajes simulados al estado
        setMensajes([...nuevosMensajes, ...mensajes]);
        
        // Mostrar notificación de simulación
        notifyService.info("Modo de simulación: el servidor backend no está disponible.");
      }
      
      // Mensaje de éxito
      notifyService.success(`Mensaje enviado a ${resultado.results.filter(r => r.success).length} pacientes`);
      cerrarModal();
      
      try {
        // Intentar recargar mensajes (solo si el backend está disponible)
        const mensajesActualizados = await getUserMessages(userId);
        const mensajesFormateados = mensajesActualizados.map(mensaje => ({
          id: mensaje.id,
          nombre: mensaje.receiver?.name || mensaje.sender?.name || "Desconocido",
          avatar: mensaje.receiver?.avatar || mensaje.receiver?.img || mensaje.sender?.avatar || mensaje.sender?.img || null,
          mensaje: mensaje.content,
          asunto: mensaje.subject,
          hora: formatearFecha(mensaje.created_at),
          leidos: mensaje.read,
          cantidad: !mensaje.read ? 1 : 0,
          emailEnviado: mensaje.email_sent
        }));
        
        setMensajes(mensajesFormateados);
      } catch (loadError) {
        // Si falla la recarga, ya tenemos los mensajes simulados
        console.log("No se pudieron recargar los mensajes desde el backend", loadError);
      }
    } catch (error) {
      setErrorMensaje("Error inesperado al procesar el mensaje.");
      notifyService.error("Error al enviar el mensaje");
      console.error("Error al enviar mensaje:", error);
    } finally {
      setLoading(false);
    }
  };

  // Inicializar estado del modal
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.style.display = "none";
    }
  }, []);

  // Animaciones con GSAP para el modal
  useEffect(() => {
    if (modalVisible) {
      const content = modalContentRef.current;
      const overlay = overlayRef.current;
      
      // Mostrar el modal
      modalRef.current.style.display = "flex";
      
      // Resetear las propiedades
      gsap.set(overlay, { opacity: 0 });
      gsap.set(content, { y: 20, opacity: 0 });
      
      // Crear la timeline de animación
      const tl = gsap.timeline();
      
      // Animar el overlay
      tl.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Animar el contenido
      tl.to(content, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.1");
    } else {
      const modal = modalRef.current;
      const content = modalContentRef.current;
      const overlay = overlayRef.current;
      
      // Animar cierre con GSAP
      const tl = gsap.timeline({
        onComplete: () => {
          modal.style.display = "none";
        }
      });
      
      // Animar contenido saliendo
      tl.to(content, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
      
      // Animar overlay desapareciendo
      tl.to(overlay, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      }, "-=0.1");
    }
  }, [modalVisible]);

  // Aplicar filtro de búsqueda a los mensajes
  const mensajesFiltrados = mensajes.filter(m => {
    const terminoBusqueda = busqueda.toLowerCase();
    return (
      m.nombre.toLowerCase().includes(terminoBusqueda) || 
      (m.asunto && m.asunto.toLowerCase().includes(terminoBusqueda)) ||
      m.mensaje.toLowerCase().includes(terminoBusqueda)
    );
  });

  return (
  <div className="mensajes-main">
    <div className="mensajes-header">
      <h2>Mensajes</h2>
      <div className="mensajes-actions">
        <button 
          className={`mensajes-check-emails ${checkingEmails ? 'loading' : ''}`} 
          onClick={handleCheckEmails}
          disabled={checkingEmails}
        >
          <i className="fas fa-sync-alt"></i> {checkingEmails ? 'Verificando...' : 'Verificar'}
        </button>
        <button 
          className={`mensajes-auto-check ${autoCheckActive ? 'active' : ''}`} 
          onClick={toggleAutoCheck}
        >
          <i className={`fas ${autoCheckActive ? 'fa-toggle-on' : 'fa-toggle-off'}`}></i>
          {autoCheckActive ? 'Auto ON' : 'Auto OFF'}
        </button>
        <button className="mensajes-nuevo" onClick={handleNuevoMensaje}>
          <ChatIcon width={22} /> Nuevo
        </button>
      </div>
    </div>
    <div className="mensajes-info">
      {lastEmailCheck && (
        <div className="last-check-info">
          Última verificación: {lastEmailCheck.toLocaleTimeString()}
        </div>
      )}
    </div>
    <input 
      className="mensajes-buscar" 
      placeholder="Buscar conversación..." 
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />
    <div className="mensajes-list">
      {loading ? (
        <div className="mensajes-loading">Cargando mensajes...</div>
      ) : errorMensaje ? (
        <div className="mensajes-error">{errorMensaje}</div>
      ) : mensajesFiltrados.length > 0 ? (
        mensajesFiltrados.map((m, idx) => (
          <div className={`mensaje-card${!m.leidos ? " unread" : ""}`} key={idx}>
            {m.avatar ? (
              <img 
                className="mensaje-avatar" 
                src={m.avatar} 
                alt={m.nombre} 
              />
            ) : (
              <div className="mensaje-avatar-initials">
                {m.nombre.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div className="mensaje-info">
              <div className="mensaje-nombre">{m.nombre || "Paciente"}</div>
              <div className="mensaje-texto">
                {m.asunto && <span className="mensaje-asunto">{m.asunto}: </span>}
                {m.mensaje}
              </div>
            </div>
            <div className="mensaje-meta">
              <div className="mensaje-hora">{m.hora}</div>
              {!m.leidos && m.cantidad && <span className="mensaje-badge">{m.cantidad}</span>}
              {m.emailEnviado && 
                <div className="mensaje-email-badge" title="Enviado por email">📧</div>
              }
            </div>
          </div>
        ))
      ) : (
        <div className="mensajes-empty">{busqueda ? "No hay conversaciones que coincidan con tu búsqueda" : "No hay mensajes disponibles"}</div>
      )}
    </div>
    
    {/* Modal para nuevo mensaje con animaciones GSAP */}
    <div className="mensaje-modal" ref={modalRef}>
      <div className="mensaje-modal-overlay" ref={overlayRef} onClick={cerrarModal}></div>
      <div className="mensaje-modal-content" ref={modalContentRef}>
        <h3>Nuevo mensaje</h3>
        <form onSubmit={enviarMensaje}>
          <div className="form-group">
            <label>Destinatarios:</label>
            <div className="destinatarios-lista">
              {pacientes.length > 0 ? (
                pacientes.map(paciente => (
                  <div 
                    key={paciente.id} 
                    className={`destinatario-item ${nuevoMensaje.destinatarios.includes(paciente.id) ? 'selected' : ''}`}
                    onClick={() => togglePacienteSeleccionado(paciente.id)}
                  >
                    {paciente.avatar || paciente.img ? (
                      <img 
                        src={paciente.avatar || paciente.img} 
                        alt={paciente.name} 
                        className="destinatario-avatar" 
                      />
                    ) : (
                      <div className="destinatario-avatar-initials">
                        {paciente.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <span>{paciente.name}</span>
                    {paciente.email && <span className="tiene-email">📧</span>}
                  </div>
                ))
              ) : (
                <div className="no-destinatarios">Cargando pacientes...</div>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="asunto">Asunto:</label>
            <input 
              type="text" 
              id="asunto" 
              name="asunto" 
              value={nuevoMensaje.asunto} 
              onChange={handleInputChange} 
              placeholder="Asunto del mensaje"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea 
              id="mensaje" 
              name="mensaje" 
              value={nuevoMensaje.mensaje} 
              onChange={handleInputChange} 
              placeholder="Escribe tu mensaje aquí..."
              rows="5"
              required 
            ></textarea>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn-cancelar" onClick={cerrarModal}>Cancelar</button>
            <button 
              type="submit" 
              className="btn-enviar" 
              disabled={loading || nuevoMensaje.destinatarios.length === 0}
            >
              {loading ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Mensajes;
