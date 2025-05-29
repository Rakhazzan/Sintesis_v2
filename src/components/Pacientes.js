import React, { useState, useEffect } from "react";
import "./Pacientes.css";
import { ReactComponent as MaleIcon } from "./svg/male.svg";
import { ReactComponent as FemaleIcon } from "./svg/female.svg";
import { ReactComponent as AddIcon } from "./svg/add.svg";
import { getAllPatients, createPatient } from "../utils/patientUtils";
import { notifyService } from "../components/NotificationManager";
import { classifyMedicalCondition, getContrastTextColor } from "../utils/medicalConditionUtils";
import MedicalConditionSelector from "./MedicalConditionSelector";

// Datos iniciales para desarrollo
const pacientesIniciales = [];

const Pacientes = () => {
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [popupVisible, setPopupVisible] = useState(false);
  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: "",
    email: "",
    phone: "",
    fechaNacimiento: "",
    genero: "Masculino",
    avatar: "", // Ahora será una imagen cargada por el usuario o generada aleatoriamente
    avatarPreview: "", // Para mostrar la vista previa de la imagen
    customAvatar: false, // Para indicar si el usuario ha cargado una imagen personalizada
    etiqueta: "",
    color: "#b6c5ff"
  });
  
  // Estado para almacenar la lista de pacientes
  const [listaPacientes, setListaPacientes] = useState(pacientesIniciales);
  const [loading, setLoading] = useState(true);
  
  // Cargar pacientes al montar el componente
  useEffect(() => {
    async function cargarPacientes() {
      try {
        setLoading(true);
        const pacientes = await getAllPatients();
        
        // Formatear los datos recibidos al formato que usa el componente
        const pacientesFormateados = pacientes.map(p => {
          // Generar color basado en la condición médica
          const color = p.color || getRandomColor(p.medical_condition);
          
          // Generar avatar con iniciales si no hay avatar personalizado
          const avatar = p.avatar || generateInitialsAvatar(p.name, color);
          
          return {
            id: p.id,
            nombre: p.name,
            // Calculamos la edad a partir de la fecha de nacimiento
            edad: calcularEdad(p.birthdate),
            genero: p.gender,
            avatar: avatar,
            etiqueta: p.medical_condition || '',
            color: color,
            fechaNacimiento: p.birthdate
          };
        });
        
        setListaPacientes(pacientesFormateados);
      } catch (error) {
        console.error('Error al cargar pacientes:', error);
        notifyService.error('Error al cargar pacientes: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
    
    cargarPacientes();
  }, []);
  
  // Función para obtener un color según la condición médica usando clasificación IA
  const getRandomColor = (condition) => {
    // Si no hay condición, devolver un color por defecto
    if (!condition || condition.trim() === '') {
      return '#CFD8DC'; // Gris claro
    }
    
    // Usar la utilidad de clasificación de condiciones médicas
    const classification = classifyMedicalCondition(condition);
    
    // Si se encontró una clasificación, devolver su color
    if (classification && classification.color) {
      return classification.color;
    }
    
    // Color aleatorio como fallback
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
  };
  
  // Función para generar un avatar SVG con las iniciales del nombre
  const generateInitialsAvatar = (name, backgroundColor) => {
    if (!name) return null;
    
    // Obtener iniciales (máximo 2 caracteres)
    const initials = name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
    
    // Asegurarse de que tenemos un color de fondo válido
    const bgColor = backgroundColor || '#CFD8DC';
    
    // Determinar el color del texto (blanco o negro) según el contraste
    const textColor = getContrastTextColor(bgColor);
    
    // Crear el SVG
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="${bgColor}"/>
        <text x="100" y="100" font-family="Arial" font-size="80" text-anchor="middle" dominant-baseline="middle" fill="${textColor}">
          ${initials}
        </text>
      </svg>
    `;
    
    // Convertir el SVG a una URL de datos
    const dataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;
    return dataUrl;
  };
  
  // Función para filtrar pacientes según la categoría seleccionada
  const getPacientesFiltrados = () => {
    switch(filtroActivo) {
      case "Todos":
        return listaPacientes;
      case "Recientes":
        // Mostramos los últimos 2 pacientes añadidos
        return [...listaPacientes].slice(-2);
      case "Crónicos":
        // Filtramos pacientes con condiciones crónicas (diabetes, hipertensión, cardiopatía)
        return listaPacientes.filter(p => 
          ["Diabetes", "Hipertensión", "Cardiopatía"].includes(p.etiqueta)
        );
      case "Urgentes":
        // Filtramos pacientes marcados como urgentes
        return listaPacientes.filter(p => p.urgente === true);
      default:
        return listaPacientes;
    }
  };
  
  // Función para calcular la edad a partir de la fecha de nacimiento
  const calcularEdad = (fechaNacimiento) => {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    
    return edad;
  };
  
  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    // Si el cambio es en el campo de archivo (avatar)
    if (name === "avatarUpload" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setNuevoPaciente({
          ...nuevoPaciente,
          avatar: reader.result,
          avatarPreview: reader.result,
          customAvatar: true
        });
      };
      
      reader.readAsDataURL(file);
    } else if (name === "etiqueta") {
      // Si cambia la etiqueta, actualizamos el color automáticamente
      const color = getRandomColor(value);
      setNuevoPaciente({
        ...nuevoPaciente,
        etiqueta: value,
        color: color
      });
    } else if (name === "nombre") {
      // Si cambia el nombre y no hay avatar personalizado, actualizar el avatar con las iniciales
      const updatedState = {
        ...nuevoPaciente,
        nombre: value
      };
      
      if (!nuevoPaciente.customAvatar) {
        const initialsAvatar = generateInitialsAvatar(value, nuevoPaciente.color);
        updatedState.avatar = initialsAvatar;
        updatedState.avatarPreview = initialsAvatar;
      }
      
      setNuevoPaciente(updatedState);
    } else {
      // Para el resto de campos, actualizamos el estado normalmente
      setNuevoPaciente({
        ...nuevoPaciente,
        [name]: value
      });
    }
  };
  
  // Función para añadir un nuevo paciente
  const handleAddPaciente = async (e) => {
    e.preventDefault();
    
    // Validamos que los campos obligatorios estén completos
    if (!nuevoPaciente.nombre || !nuevoPaciente.fechaNacimiento) {
      notifyService.error("Por favor complete todos los campos obligatorios");
      return;
    }
    
    try {
      setLoading(true);
      
      // Preparamos los datos para la API
      const pacienteData = {
        name: nuevoPaciente.nombre,
        email: nuevoPaciente.email,
        phone: nuevoPaciente.phone,
        birthdate: nuevoPaciente.fechaNacimiento,
        gender: nuevoPaciente.genero,
        medical_condition: nuevoPaciente.etiqueta,
        color: nuevoPaciente.color,
        avatar: nuevoPaciente.customAvatar ? nuevoPaciente.avatar : generateInitialsAvatar(nuevoPaciente.nombre, nuevoPaciente.color)
      };
      
      // Enviamos al backend
      const createdPatient = await createPatient(pacienteData);
      
      // Formateamos el paciente recibido del backend
      const nuevoPacienteCompleto = {
        id: createdPatient.id,
        nombre: createdPatient.name,
        edad: calcularEdad(createdPatient.birthdate),
        genero: createdPatient.gender,
        avatar: createdPatient.avatar,
        etiqueta: createdPatient.medical_condition || '',
        color: createdPatient.color,
        fechaNacimiento: createdPatient.birthdate
      };
      
      // Actualizamos la lista de pacientes
      setListaPacientes([...listaPacientes, nuevoPacienteCompleto]);
      
      // Notificamos al usuario
      notifyService.success("Paciente añadido correctamente");
      
      // Limpiamos el formulario y cerramos el popup
      setNuevoPaciente({
        nombre: "",
        email: "",
        phone: "",
        fechaNacimiento: "",
        genero: "Masculino",
        avatar: "",
        avatarPreview: "",
        customAvatar: false,
        etiqueta: "",
        color: "#b6c5ff"
      });
      
      setPopupVisible(false);
    } catch (error) {
      console.error('Error al crear paciente:', error);
      notifyService.error('Error al crear paciente: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const pacientesFiltrados = getPacientesFiltrados();
  
  return (
    <div className="pacientes-main">
      <div className="pacientes-header">
        <div className="pacientes-filtros">
          <select 
            className="pacientes-select-filtro"
            value={filtroActivo}
            onChange={(e) => setFiltroActivo(e.target.value)}
          >
            <option value="Todos">Todos los pacientes</option>
            <option value="Recientes">Pacientes recientes</option>
            <option value="Crónicos">Pacientes crónicos</option>
            <option value="Urgentes">Pacientes urgentes</option>
          </select>
        </div>
        <button 
          className="add-paciente-btn"
          onClick={() => setPopupVisible(true)}
          disabled={loading}
        >
          <AddIcon /> Añadir paciente
        </button>
      </div>
      
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Cargando pacientes...</p>
        </div>
      )}
      
      <div className="pacientes-list">
        {!loading && pacientesFiltrados.length === 0 && (
          <div className="no-pacientes">
            <p>No hay pacientes que coincidan con este filtro</p>
          </div>
        )}
        
        {pacientesFiltrados.map((paciente) => (
          <div className="paciente-card" key={paciente.id || `temp-${paciente.nombre}`}>
            <img 
              className="paciente-avatar" 
              src={paciente.avatar} 
              alt={paciente.nombre}
              onError={(e) => {
                // Si hay error al cargar la imagen, mostramos un avatar por defecto
                e.target.src = paciente.genero === "Masculino" ? 
                  "https://randomuser.me/api/portraits/men/1.jpg" : 
                  "https://randomuser.me/api/portraits/women/1.jpg";
              }}
            />
            <div className="paciente-info">
              <div className="paciente-nombre">{paciente.nombre}</div>
              <div className="paciente-detalle">
                <span>{paciente.edad} años</span>
                <span className="paciente-genero">
                  {paciente.genero === "Masculino" ? 
                    <MaleIcon /> : 
                    <FemaleIcon />}
                  {paciente.genero}
                </span>
              </div>
            </div>
            {paciente.etiqueta && (
              <span 
                className="paciente-etiqueta"
                style={{ 
                  background: paciente.color,
                  color: getContrastTextColor(paciente.color)
                }}
              >
                {paciente.etiqueta}
              </span>
            )}
          </div>
        ))}
      </div>
    
    {/* Popup para añadir nuevo paciente */}
    {popupVisible && (
      <div className="popup-overlay">
        <div className="popup-container">
          <h2>Añadir nuevo paciente</h2>
          <form onSubmit={handleAddPaciente}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo*</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                value={nuevoPaciente.nombre} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={nuevoPaciente.email} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input 
                type="text" 
                id="phone" 
                name="phone" 
                value={nuevoPaciente.phone} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="avatarUpload">Imagen de perfil (opcional)</label>
              <div className="avatar-upload-container">
                {nuevoPaciente.avatarPreview && (
                  <div className="avatar-preview">
                    <img 
                      src={nuevoPaciente.avatarPreview} 
                      alt="Vista previa" 
                      className="avatar-preview-img" 
                    />
                  </div>
                )}
                <input 
                  type="file" 
                  id="avatarUpload" 
                  name="avatarUpload" 
                  onChange={handleInputChange} 
                  accept="image/*" 
                  className="avatar-input"
                />
                <label htmlFor="avatarUpload" className="avatar-upload-btn">
                  {nuevoPaciente.avatarPreview ? 'Cambiar imagen' : 'Subir imagen'}
                </label>
              </div>
              <small className="avatar-note">Si no selecciona una imagen, se generará un avatar con sus iniciales.</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="fechaNacimiento">Fecha de nacimiento*</label>
              <input 
                type="date" 
                id="fechaNacimiento" 
                name="fechaNacimiento" 
                value={nuevoPaciente.fechaNacimiento} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="genero">Género*</label>
              <select 
                id="genero" 
                name="genero" 
                value={nuevoPaciente.genero} 
                onChange={handleInputChange} 
                required
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="etiqueta">Condición médica (opcional)</label>
              <MedicalConditionSelector
                value={nuevoPaciente.etiqueta}
                onChange={(value) => {
                  // Al seleccionar una condición, actualizar el color automáticamente
                  const color = getRandomColor(value);
                  setNuevoPaciente({
                    ...nuevoPaciente,
                    etiqueta: value,
                    color: color
                  });
                }}
                placeholder="Seleccionar o escribir condición médica"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="color">Color (para etiqueta)</label>
              <input 
                type="color" 
                id="color" 
                name="color" 
                value={nuevoPaciente.color} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="popup-actions">
              <button type="button" className="cancel-btn" onClick={() => setPopupVisible(false)}>Cancelar</button>
              <button type="submit" className="save-btn">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
  );
};

export default Pacientes;
