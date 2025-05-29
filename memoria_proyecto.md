# MEMÒRIA DEL PROJECTE CLÍNICA SÍNTESI

![Logo del Projecte](https://via.placeholder.com/200x100?text=Cl%C3%ADnica+S%C3%ADntesi)

## Autors
- **Mohamed Reda Akhazzan Akhazzan**
- **Joel Ortiz Rivas**

*Projecte de Síntesi - 2n DAM*

---

## ÍNDEX

1. [Dades del projecte i resum](#dades-del-projecte-i-resum)
2. [Introducció](#introducció)
3. [Objectius](#objectius)
4. [Entorn del projecte](#entorn-del-projecte)
   4.1 [Context](#context)
   4.2 [Justificació](#justificació)
   4.3 [Stakeholders](#stakeholders)
5. [Abast](#abast)
   5.1 [Situació actual](#situació-actual)
   5.2 [Abast i possibles obstacles](#abast-i-possibles-obstacles)
6. [Planificació temporal](#planificació-temporal)
   6.1 [Fases del projecte](#fases-del-projecte)
   6.2 [Planificació inicial](#planificació-inicial)
   6.3 [Punt de control](#punt-de-control)
      6.3.3 [Situació del projecte al punt de control](#situació-del-projecte-al-punt-de-control)
   6.4 [Planificació final](#planificació-final)
7. [Lleis i normatives](#lleis-i-normatives)
   7.1 [LOPD i LSSI](#lopd-i-lssi)
8. [Anàlisi](#anàlisi)
   8.1 [Especificació dels requisits](#especificació-dels-requisits)
      8.1.1 [Funcionals](#funcionals)
      8.1.2 [No funcionals](#no-funcionals)
9. [Disseny](#disseny)
   9.1 [Arquitectura](#arquitectura)
   9.2 [Seguretat](#seguretat)
   9.3 [Persistència](#persistència)
   9.4 [Interfície](#interfície)
   9.5 [Tecnologia](#tecnologia)
10. [Desenvolupament](#desenvolupament)
    10.1 [Estratègia de desenvolupament](#estratègia-de-desenvolupament)
11. [Proves](#proves)
    11.1 [Proves de l'aplicació](#proves-de-laplicació)
    11.2 [Usabilitat](#usabilitat)
12. [Llançament](#llançament)
13. [Conclusions](#conclusions)
14. [Bibliografia](#bibliografia)
15. [Annexos](#annexos)

---

## Introducción

El proyecto "Clínica Síntesis" es una aplicación web desarrollada como proyecto final para el segundo año del ciclo formativo de Desarrollo de Aplicaciones Multiplataforma (DAM). Esta aplicación está diseñada para la gestión integral de una clínica médica, permitiendo la administración de pacientes, citas, mensajes entre profesionales y acceso a documentación médica.

La aplicación cuenta con una interfaz de usuario moderna, intuitiva y responsive, que facilita su uso tanto en dispositivos de escritorio como en dispositivos móviles, adaptándose a las necesidades del personal médico en diferentes contextos de trabajo.

---

## Objetivos del Proyecto

Los principales objetivos de este proyecto son:

- Desarrollar una aplicación completa para la gestión de una clínica médica
- Implementar un sistema de autenticación seguro
- Crear una interfaz de usuario intuitiva y responsive
- Gestionar la información de pacientes, incluyendo historial médico
- Administrar citas médicas con calendario integrado
- Implementar un sistema de mensajería interna
- Gestionar documentos médicos
- Aplicar buenas prácticas de desarrollo y seguridad

---

## Tecnologías Utilizadas

### Frontend
- **React.js**: Biblioteca para la construcción de interfaces de usuario
- **CSS3**: Para estilizar los componentes
- **GSAP (GreenSock Animation Platform)**: Para animaciones avanzadas
- **Context API**: Para la gestión del estado global de la aplicación

### Backend
- **Node.js**: Entorno de ejecución para JavaScript en el servidor
- **Express.js**: Framework para la creación de APIs RESTful
- **Supabase**: Plataforma de base de datos y autenticación

### Base de Datos
- **PostgreSQL**: Sistema de gestión de bases de datos relacional

### Herramientas de Desarrollo
- **Git**: Para control de versiones
- **npm**: Gestor de paquetes de Node.js
- **dotenv**: Para gestión de variables de entorno

---

## Estructura del Proyecto

El proyecto sigue una estructura organizada que separa claramente el frontend del backend:

### Estructura del Frontend (src)
```
src/
├── components/         # Componentes reutilizables
│   ├── auth/           # Componentes de autenticación
│   ├── dashboard/      # Componentes del panel principal
│   ├── icons/          # Iconos SVG
│   ├── layout/         # Componentes de estructura
│   └── svg/            # Gráficos SVG
├── context/            # Contextos para estado global
├── hooks/              # Hooks personalizados
├── pages/              # Páginas principales
├── services/           # Servicios de API
├── styles/             # Estilos globales
└── utils/              # Utilidades y funciones auxiliares
```

### Estructura del Backend
```
backend/
├── controllers/        # Controladores de la API
├── db/                 # Configuración y scripts de base de datos
├── routes/             # Rutas de la API
├── services/           # Servicios de lógica de negocio
└── utils/              # Utilidades y funciones auxiliares
```

---

## Arquitectura de la Aplicación

"Clínica Síntesis" sigue una arquitectura cliente-servidor típica de las aplicaciones web modernas:

1. **Cliente (Frontend)**: Aplicación React que proporciona la interfaz de usuario
2. **Servidor (Backend)**: API RESTful desarrollada con Node.js y Express
3. **Base de Datos**: PostgreSQL gestionada a través de Supabase

La comunicación entre el frontend y el backend se realiza mediante peticiones HTTP a la API RESTful, que a su vez interactúa con la base de datos para persistir y recuperar información.

---

## Frontend

### Componentes Principales

#### Sistema de Autenticación
El sistema de autenticación permite a los usuarios iniciar sesión y registrarse en la aplicación. Cuenta con una animación de fondo dinámica que mejora la experiencia de usuario en las páginas de login y registro.

```jsx
// Ejemplo del componente AuthBackgroundEffect
const AuthBackgroundEffect = () => {
  const backgroundRef = useRef(null);
  
  useEffect(() => {
    // Animación con GSAP para crear un fondo dinámico
    // ...
  }, []);
  
  return (
    <div className="auth-background" ref={backgroundRef}></div>
  );
};
```

#### Selector de Condiciones Médicas
Componente avanzado que permite la selección jerárquica de condiciones médicas con filtrado en tiempo real.

```jsx
const MedicalConditionSelector = ({ value, onChange, placeholder }) => {
  // Estado para gestionar las categorías y condiciones médicas
  // ...
  
  // Filtrado de condiciones médicas basado en la entrada del usuario
  // ...
  
  return (
    <div className="medical-condition-selector">
      <input type="text" value={searchValue} onChange={handleInputChange} />
      {isOpen && (
        <div className="medical-dropdown-content">
          {/* Categorías y condiciones médicas */}
        </div>
      )}
    </div>
  );
};
```

#### Gestión de Pacientes
Permite ver, crear, editar y filtrar pacientes, incluyendo su información médica.

#### Calendario de Citas
Implementa un calendario interactivo para la gestión de citas médicas.

#### Sistema de Notificaciones
Proporciona notificaciones visuales para informar al usuario sobre eventos importantes en la aplicación.

### Páginas

- **Login y Registro**: Páginas de autenticación con animaciones de fondo
- **Dashboard**: Panel principal con resumen de información
- **Pacientes**: Gestión de pacientes
- **Citas**: Calendario y gestión de citas
- **Mensajes**: Sistema de mensajería interna
- **Documentos**: Gestión de documentos médicos
- **Perfil**: Información y edición del perfil de usuario

### Características Destacadas

#### Temas Claro/Oscuro
La aplicación implementa un sistema de temas que permite al usuario cambiar entre modo claro y oscuro según sus preferencias.

#### Diseño Responsive
La interfaz se adapta a diferentes tamaños de pantalla, garantizando una buena experiencia tanto en dispositivos móviles como en ordenadores de escritorio.

#### Animaciones con GSAP
Se utilizan animaciones avanzadas mediante la biblioteca GSAP para mejorar la experiencia de usuario, especialmente en las transiciones y en la página de autenticación.

#### Selección Jerárquica de Condiciones Médicas
Implementación de un sistema de filtrado jerárquico para condiciones médicas, que mejora la usabilidad al permitir categorizar y filtrar condiciones.

---

## Backend

### Estructura de la API

El backend está estructurado siguiendo una arquitectura MVC (Modelo-Vista-Controlador), aunque sin la parte de Vista ya que ésta es manejada por el frontend.

```javascript
// Ejemplo de configuración del servidor
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/appointments', appointmentRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/imap', imapRoutes);
```

### Controladores

Los controladores manejan la lógica de negocio y actúan como intermediarios entre las rutas y los servicios de acceso a datos.

#### Controlador de Pacientes
Gestiona las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los pacientes.

#### Controlador de Citas
Maneja la creación, actualización y eliminación de citas médicas.

#### Controlador de Mensajes
Administra el sistema de mensajería interna.

#### Controlador de Usuarios
Gestiona las operaciones relacionadas con los usuarios del sistema.

#### Controlador IMAP
Integra funcionalidades para la recepción de correos electrónicos externos.

### Modelos de Datos

Los modelos representan las entidades principales del sistema y su estructura en la base de datos:

- **Usuario**: Personal médico con acceso al sistema
- **Paciente**: Personas que reciben atención médica
- **Cita**: Encuentros programados entre médicos y pacientes
- **Mensaje**: Comunicaciones entre el personal médico
- **Informe**: Documentos médicos asociados a pacientes

### Seguridad

El backend implementa varias capas de seguridad:

- **Autenticación con JWT**: Para proteger las rutas de la API
- **Row Level Security (RLS)**: En Supabase para garantizar que los usuarios solo accedan a los datos que les corresponden
- **Validación de datos**: Para prevenir inyecciones y otros ataques
- **CORS configurado**: Para controlar qué dominios pueden acceder a la API

---

## Base de Datos

La base de datos utiliza PostgreSQL gestionado a través de Supabase, con las siguientes tablas principales:

- **users**: Información de los usuarios del sistema
- **patients**: Datos de los pacientes
- **appointments**: Registro de citas médicas
- **messages**: Sistema de mensajería interna
- **reports**: Informes médicos

Características destacadas:

- **Relaciones**: Implementación de claves foráneas para mantener la integridad referencial
- **Índices**: Creación de índices para optimizar las consultas frecuentes
- **Triggers**: Para actualizar automáticamente los campos de timestamp
- **Row Level Security**: Políticas de seguridad a nivel de fila para proteger los datos

```sql
-- Ejemplo de definición de tabla
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id TEXT UNIQUE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT,
  age INTEGER,
  address TEXT,
  medical_history JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  doctor_id UUID REFERENCES users ON DELETE SET NULL
);
```

---

## Funcionalidades Implementadas

### Gestión de Usuarios
- Registro e inicio de sesión
- Perfiles de usuario personalizables
- Cambio de contraseña
- Preferencias de tema (claro/oscuro)

### Gestión de Pacientes
- Registro de nuevos pacientes
- Visualización y edición de información de pacientes
- Clasificación de pacientes por condiciones médicas
- Filtrado y búsqueda avanzada

### Gestión de Citas
- Calendario interactivo
- Programación de citas
- Notificaciones de recordatorio
- Estado de citas (pendiente, confirmada, cancelada, completada)

### Sistema de Mensajería
- Comunicación interna entre profesionales
- Notificaciones de nuevos mensajes
- Integración con correo electrónico externo

### Gestión Documental
- Carga y visualización de documentos
- Asociación de documentos a pacientes
- Categorización de documentos

---

## Dificultades y Soluciones

### Reto 1: Selector de Condiciones Médicas
**Problema**: Necesidad de una interfaz intuitiva para seleccionar condiciones médicas con clasificación jerárquica.

**Solución**: Desarrollo de un componente personalizado `MedicalConditionSelector` que implementa un sistema de filtrado en tiempo real y navegación por categorías.

### Reto 2: Animaciones Fluidas
**Problema**: Conseguir animaciones fluidas que mejoren la experiencia de usuario sin afectar al rendimiento.

**Solución**: Utilización de GSAP para optimizar las animaciones y gestión cuidadosa de los recursos para evitar problemas de rendimiento.

### Reto 3: Seguridad de Datos Médicos
**Problema**: Garantizar la seguridad y privacidad de los datos médicos sensibles.

**Solución**: Implementación de Row Level Security en Supabase, autenticación robusta y validación estricta de datos.

---

## Mejoras Futuras

- **Integración con sistemas de telemedicina**
- **Módulo de facturación**
- **Aplicación móvil nativa**
- **Analítica avanzada para seguimiento de pacientes**
- **Integración con dispositivos médicos IoT**
- **Sistema de firma digital para documentos**

---

## Conclusiones

El desarrollo de "Clínica Síntesis" ha permitido aplicar y consolidar los conocimientos adquiridos durante el ciclo formativo de DAM, abordando tanto aspectos de frontend como de backend, seguridad, diseño de interfaces y gestión de bases de datos.

El resultado es una aplicación funcional, segura y con una experiencia de usuario cuidada que responde a las necesidades reales de gestión en un entorno clínico. La arquitectura modular facilita el mantenimiento y la ampliación futura de funcionalidades.

Este proyecto demuestra la capacidad para desarrollar soluciones software completas y profesionales, preparadas para su uso en entornos productivos.

---

## Referencias

- React Documentation: https://reactjs.org/docs
- Node.js Documentation: https://nodejs.org/en/docs
- Express.js Documentation: https://expressjs.com
- GSAP Documentation: https://greensock.com/docs
- Supabase Documentation: https://supabase.io/docs
- PostgreSQL Documentation: https://www.postgresql.org/docs
