# Documentación para Desarrolladores - Sintesis_v2

## Índice
1. [Introducción](#introducción)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Estructura de Directorios](#estructura-de-directorios)
4. [Componentes Principales](#componentes-principales)
5. [Servicios y Hooks](#servicios-y-hooks)
6. [API y Conexión con Base de Datos](#api-y-conexión-con-base-de-datos)
7. [Guía de Estilo y Nomenclatura](#guía-de-estilo-y-nomenclatura)
8. [Testing](#testing)
9. [Flujos de Trabajo](#flujos-de-trabajo)
10. [Integración y Despliegue](#integración-y-despliegue)
11. [Resolución de Problemas Comunes](#resolución-de-problemas-comunes)

---

## Introducción

Sintesis_v2 es una aplicación de gestión clínica desarrollada en React que permite a los profesionales de la salud administrar pacientes, citas, mensajes y documentación médica. Esta documentación está diseñada para desarrolladores que trabajarán en el mantenimiento y expansión del sistema.

### Tecnologías Utilizadas

- **Frontend**: React.js (Create React App con configuración personalizada)
- **Backend**: Node.js con Express
- **Base de Datos**: PostgreSQL (a través de Supabase)
- **Autenticación**: JWT con Supabase Auth
- **Estilos**: CSS personalizado con variables para temas
- **Estado**: React Context API y hooks personalizados
- **Peticiones HTTP**: Combinación de cliente Supabase y fetch API

---

## Arquitectura del Sistema

La aplicación sigue un patrón de arquitectura de componentes con separación de responsabilidades:

```
+-------------------+     +-------------------+     +-------------------+
|                   |     |                   |     |                   |
|   Presentación    |<--->|     Lógica de     |<--->|   Servicios de    |
|   (Componentes)   |     |     Negocio       |     |     Datos         |
|                   |     |   (Hooks/Context) |     | (API/Supabase)    |
+-------------------+     +-------------------+     +-------------------+
```

### Patrones de Diseño Implementados

1. **Provider Pattern**: Para la gestión de estado global (AuthContext, ThemeContext)
2. **Custom Hooks**: Para la encapsulación de lógica reutilizable
3. **Componentes Presentacionales vs Contenedores**: Separación clara entre componentes que gestionan datos y los que solo renderizan UI
4. **Componentes de Alto Orden (HOC)**: Para añadir funcionalidades compartidas como autenticación

---

## Estructura de Directorios

```
/src
  /components        # Componentes de React
    /dashboard       # Componentes específicos del dashboard
    /layout          # Componentes estructurales (Header, Sidebar, etc.)
    /shared          # Componentes reutilizables (PatientAvatar, etc.)
  /context           # Contextos de React (Auth, Theme)
  /hooks             # Hooks personalizados
  /pages             # Componentes de página completa
  /services          # Servicios para conexión a API externa
  /styles            # Archivos CSS globales y por componente
  /utils             # Funciones utilitarias
/backend
  /db                # Scripts de base de datos
  /routes            # Definición de endpoints API
  /services          # Lógica de negocio del backend
  /middlewares       # Middlewares de Express
/public              # Archivos estáticos
```

---

## Componentes Principales

### `App.js`

El componente principal de la aplicación que gestiona:
- Proveedores de contexto
- Enrutamiento basado en estado
- Autenticación y redirección

```javascript
// Pseudocódigo del flujo principal
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />  // Componente que muestra contenido según estado de auth
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### Componentes de Layout

#### `MainLayout`

Encapsula la estructura común para todas las páginas autenticadas:
- Header
- Sidebar (en desktop)
- BottomNav (en móvil)
- Contenido principal

El componente tiene detección inteligente de dispositivo para mostrar la navegación adecuada.

#### `Sidebar`

Navegación principal para versión desktop:
- Implementa posicionamiento fixed
- Maneja selección de sección activa
- Proporciona navegación a todas las áreas principales

**Mejora de UX implementada**: Posicionamiento inteligente del menú desplegable para evitar que quede fuera de la vista.

### Componentes de Funcionalidad

#### `Citas.js`

Gestiona todas las funcionalidades relacionadas con citas:
- Calendario visual
- Formulario de creación/edición
- Filtros y búsqueda
- Actualización en tiempo real de estados

```javascript
/**
 * @component Citas
 * @description Componente principal para la gestión de citas médicas
 */
const Citas = () => {
  // Estado y hooks
  const { appointments, loading, handleAppointmentStatusChange } = useAppointments();
  
  // Implementación de funcionalidad
  // ...
}
```

#### `DocumentosPage.js`

Generador de informes médicos con las siguientes características:
- Selección de pacientes
- Formularios personalizables
- Vista previa en tiempo real
- Generación de PDF con formato profesional
- ID único para cada informe con formato: `INFMED-[timestamp]-[iniciales del paciente]-[código aleatorio]-[fecha].pdf`

#### `Mensajes.js`

Sistema de mensajería interna con:
- Listado de conversaciones
- Selección de destinatarios con alto contraste visual
- Envío y recepción de mensajes
- Integración con sistema de email externo

---

## Servicios y Hooks

### Custom Hooks

#### `useAppointments`

```javascript
/**
 * Hook personalizado para gestionar citas
 * @param {string} userId - ID del usuario actual
 * @returns {Object} Métodos y estado para trabajar con citas
 */
export function useAppointments(userId) {
  // Estado interno
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const subscriptionRef = useRef(null);
  
  // Funciones de carga y manipulación
  const fetchAppointmentsWithPatients = useCallback(async () => {...});
  const fetchAllAppointments = useCallback(async () => {...});
  const handleAppointmentStatusChange = useCallback(async (appointmentId, newStatus) => {...});
  const subscribeToAppointments = useCallback(() => {...});
  
  // Efectos para inicialización y limpieza
  useEffect(() => {...}, []);
  
  return {
    appointments,
    loading,
    fetchAppointmentsWithPatients,
    fetchAllAppointments,
    handleAppointmentStatusChange,
    subscribeToAppointments
  };
}
```

#### `useAuth`

Gestiona la autenticación de usuarios con Supabase, incluyendo:
- Login/Logout
- Registro
- Recuperación de contraseña
- Estado de autenticación
- Información de perfil

### Contextos

#### `AuthContext`

Proporciona acceso global al estado de autenticación:

```javascript
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Estado de autenticación y métodos
  
  const value = {
    user,
    auth,
    loading,
    login,
    logout,
    register,
    resetPassword,
    saveProfile
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
```

#### `ThemeContext`

Gestiona el tema de la aplicación (claro/oscuro):

```javascript
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Recuperar tema de localStorage o usar valor por defecto
  });
  
  // Cambiar entre temas
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // Aplicar clase CSS según tema
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

---

## API y Conexión con Base de Datos

### Supabase

La aplicación utiliza Supabase como backend principal, aprovechando sus características:

- **Autenticación**: JWT basada en Supabase Auth
- **Base de datos**: PostgreSQL con acceso directo
- **Tiempo real**: Suscripciones para actualizaciones en vivo
- **Almacenamiento**: Para imágenes de pacientes y documentos

#### Esquema de Base de Datos

Las principales tablas son:

- `users`: Información de usuarios del sistema
- `patients`: Datos de pacientes
- `appointments`: Citas médicas
- `messages`: Sistema de mensajería interna
- `reports`: Informes médicos generados

### API REST

Para funcionalidades adicionales, se implementa una API REST en Node.js:

```javascript
// Ejemplo de endpoint para obtener citas
app.get('/api/appointments', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await appointmentService.getAppointmentsByUser(userId);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Utilidades de Conexión

#### `supabaseUtils.js`

Inicializa y configura el cliente de Supabase:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  persistSession: true
});

export default supabase;
```

#### `appointmentUtils.js`

Contiene funciones para interactuar con las citas:

```javascript
/**
 * Actualiza el estado de una cita
 * @param {string} id - ID de la cita
 * @param {string} status - Nuevo estado (confirmed, pending, cancelled, completed)
 * @returns {Promise<Object>} Promesa que resuelve con {success: true, data} si la operación fue exitosa
 */
export async function updateAppointmentStatus(id, status) {
  try {
    const updatedAt = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('appointments')
      .update({ 
        status, 
        updated_at: updatedAt 
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    
    return { success: true, data: data[0] };
  } catch (error) {
    console.error(`Error al actualizar estado de cita ${id}:`, error);
    return { success: false, error: error.message };
  }
}
```

---

## Guía de Estilo y Nomenclatura

### Componentes

- Nombres en PascalCase: `PatientAvatar`, `AppointmentControls`
- Un componente por archivo
- Props destructuradas en la firma de la función
- PropTypes para documentación y verificación

```javascript
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Muestra avatar de paciente con iniciales o imagen
 */
const PatientAvatar = ({ patient, size = 'medium' }) => {
  // Implementación
};

PatientAvatar.propTypes = {
  patient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default PatientAvatar;
```

### CSS

- Archivos CSS para cada componente principal
- Variables CSS para temas
- Convención BEM simplificada para nombres de clase
- Media queries para responsividad

```css
/* Ejemplo de nomenclatura y variables */
:root {
  --primary-color: #5a4ff3;
  --primary-dark: #4338ca;
  --text-color: #333333;
  --card-bg: white;
}

.dark-theme {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --text-color: #e5e7eb;
  --card-bg: #1f2937;
}

.mensaje-card {
  background-color: var(--card-bg);
  color: var(--text-color);
}

.mensaje-card.unread {
  border-left: 3px solid var(--primary-color);
}
```

### JavaScript

- Hooks y utilidades: camelCase
- Funciones asíncronas: try/catch con manejo consistente de errores
- Comentarios JSDoc para funciones exportadas

---

## Testing

El proyecto utiliza Jest para pruebas unitarias y React Testing Library para pruebas de componentes.

### Configuración

```javascript
// setupTests.js
import '@testing-library/jest-dom';
```

### Ejemplos de Tests

```javascript
// App.test.js
describe('App component', () => {
  test('renders login page when not authenticated', () => {
    render(<App />);
    const loginTitle = screen.getByText(/iniciar sesión/i);
    expect(loginTitle).toBeInTheDocument();
  });

  test('renders registration link', () => {
    render(<App />);
    const registerLink = screen.getByText(/regístrate/i);
    expect(registerLink).toBeInTheDocument();
  });
});
```

---

## Flujos de Trabajo

### Gestión de Citas

1. Usuario navega a la sección "Citas"
2. El hook `useAppointments` carga las citas desde Supabase
3. Se inicia una suscripción en tiempo real para actualizaciones
4. El usuario puede:
   - Ver citas en formato de calendario o lista
   - Filtrar por fecha/estado
   - Crear nuevas citas
   - Actualizar estado (completada/cancelada)
5. Los cambios se sincronizan con la base de datos y se reflejan en tiempo real

### Generación de Documentos

1. Usuario navega a la sección "Documentos"
2. Selecciona un paciente del desplegable
3. Completa el formulario con:
   - Tipo de informe
   - Diagnóstico
   - Tratamiento
   - Observaciones
4. Ve una vista previa en tiempo real
5. Al generar el documento:
   - Se crea un ID único con formato INFMED-[timestamp]-[iniciales]-[código]-[fecha]
   - Se abre el diálogo de impresión nativo
   - Se registra el documento generado en la base de datos

---

## Integración y Despliegue

### Entorno de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo con backend
npm run dev

# Iniciar solo frontend
npm start

# Iniciar solo backend
npm run start:backend
```

### Variables de Entorno

La aplicación utiliza un archivo `.env` para configurar:

```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_API_URL=http://localhost:4000/api
```

### Build de Producción

```bash
# Generar build optimizado
npm run build

# Desplegar build (depende del servicio de hosting)
```

---

## Resolución de Problemas Comunes

### Problemas de Autenticación

- **Síntoma**: Usuario no puede iniciar sesión a pesar de credenciales correctas
- **Solución**: Verificar que el token de Supabase no ha expirado y que las claves API son correctas

### Datos No Actualizados

- **Síntoma**: Los cambios en citas no se reflejan en tiempo real
- **Solución**: Verificar que las suscripciones de tiempo real están funcionando correctamente:
  ```javascript
  const subscription = supabase
    .channel('appointment-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'appointments' }, 
      handleChange)
    .subscribe();
  ```

### Problemas con Generación de PDF

- **Síntoma**: El documento no se genera o aparece incompleto
- **Solución**: Utilizar la API de impresión nativa del navegador en lugar de bibliotecas externas:
  ```javascript
  const printFrame = document.createElement('iframe');
  // Configurar iframe
  document.body.appendChild(printFrame);
  printFrame.contentWindow.document.body.innerHTML = contenidoHTML;
  printFrame.contentWindow.print();
  ```

---

© 2025 Sintesis_v2 - Documentación para Desarrolladores
