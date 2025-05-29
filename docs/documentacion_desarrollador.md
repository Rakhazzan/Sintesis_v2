# Documentació per a Desenvolupadors - Sintesis_v2

## Índex
1. [Introducció](#introducció)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Estructura de Directoris](#estructura-de-directoris)
4. [Components Principals](#components-principals)
5. [Serveis i Hooks](#serveis-i-hooks)
6. [API i Connexió amb Base de Dades](#api-i-connexió-amb-base-de-dades)
7. [Guia d'Estil i Nomenclatura](#guia-destil-i-nomenclatura)
8. [Testing](#testing)
9. [Fluxos de Treball](#fluxos-de-treball)
10. [Integració i Desplegament](#integració-i-desplegament)
11. [Resolució de Problemes Comuns](#resolució-de-problemes-comuns)

---

## Introducció

Sintesis_v2 és una aplicació de gestió clínica desenvolupada en React que permet als professionals de la salut administrar pacients, cites, missatges i documentació mèdica. Aquesta documentació està dissenyada per a desenvolupadors que treballaran en el manteniment i expansió del sistema.

### Tecnologies Utilitzades

- **Frontend**: React.js (Create React App amb configuració personalitzada)
- **Backend**: Node.js amb Express
- **Base de Dades**: PostgreSQL (a través de Supabase)
- **Autenticació**: JWT amb Supabase Auth
- **Estils**: CSS personalitzat amb variables per a temes
- **Estat**: React Context API i hooks personalitzats
- **Peticions HTTP**: Combinació de client Supabase i fetch API

---

## Arquitectura del Sistema

L'aplicació segueix un patró d'arquitectura de components amb separació de responsabilitats:

```
+-------------------+     +-------------------+     +-------------------+
|                   |     |                   |     |                   |
|   Presentació     |<--->|     Lògica de     |<--->|   Serveis de      |
|   (Components)    |     |     Negoci        |     |     Dades         |
|                   |     |   (Hooks/Context) |     | (API/Supabase)    |
+-------------------+     +-------------------+     +-------------------+
```

### Patrons de Disseny Implementats

1. **Provider Pattern**: Per a la gestió d'estat global (AuthContext, ThemeContext)
2. **Custom Hooks**: Per a l'encapsulació de lògica reutilitzable
3. **Components Presentacionals vs Contenidors**: Separació clara entre components que gestionen dades i els que només renderitzen UI
4. **Components d'Alt Ordre (HOC)**: Per afegir funcionalitats compartides com autenticació

---

## Estructura de Directoris

```
/src
  /components        # Components de React
    /dashboard       # Components específics del dashboard
    /layout          # Components estructurals (Header, Sidebar, etc.)
    /shared          # Components reutilitzables (PatientAvatar, etc.)
  /context           # Contextos de React (Auth, Theme)
  /hooks             # Hooks personalitzats
  /pages             # Components de pàgina completa
  /services          # Serveis per a connexió a API externa
  /styles            # Arxius CSS globals i per component
  /utils             # Funcions utilitàries
/backend
  /db                # Scripts de base de dades
  /routes            # Definició d'endpoints API
  /services          # Lògica de negoci del backend
  /middlewares       # Middlewares d'Express
/public              # Arxius estàtics
```

---

## Components Principals

### `App.js`

El component principal de l'aplicació que gestiona:
- Proveïdors de context
- Encaminament basat en estat
- Autenticació i redirecció

```javascript
// Pseudocodi del flux principal
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />  // Component que mostra contingut segons estat d'auth
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### Components de Layout

#### `MainLayout`

Encapsula l'estructura comuna per a totes les pàgines autenticades:
- Header
- Sidebar (en desktop)
- BottomNav (en mòbil)
- Contingut principal

El component té detecció intel·ligent de dispositiu per mostrar la navegació adequada.

#### `Sidebar`

Navegació principal per a versió desktop:
- Implementa posicionament fixed
- Gestiona selecció de secció activa
- Proporciona navegació a totes les àrees principals

**Millora d'UX implementada**: Posicionament intel·ligent del menú desplegable per evitar que quedi fora de la vista.

### Components de Funcionalitat

#### `Citas.js`

Gestiona totes les funcionalitats relacionades amb cites:
- Calendari visual
- Formulari de creació/edició
- Filtres i cerca
- Actualització en temps real d'estats

```javascript
/**
 * @component Citas
 * @description Component principal per a la gestió de cites mèdiques
 */
const Citas = () => {
  // Estat i hooks
  const { appointments, loading, handleAppointmentStatusChange } = useAppointments();
  
  // Implementació de funcionalitat
  // ...
}
```

#### `DocumentosPage.js`

Generador d'informes mèdics amb les següents característiques:
- Selecció de pacients
- Formularis personalitzables
- Vista prèvia en temps real
- Generació de PDF amb format professional
- ID únic per a cada informe amb format: `INFMED-[timestamp]-[inicials del pacient]-[codi aleatori]-[data].pdf`

#### `Mensajes.js`

Sistema de missatgeria interna amb:
- Llistat de converses
- Selecció de destinataris amb alt contrast visual
- Enviament i recepció de missatges
- Integració amb sistema d'email extern

---

## Serveis i Hooks

### Custom Hooks

#### `useAppointments`

```javascript
/**
 * Hook personalitzat per gestionar cites
 * @param {string} userId - ID de l'usuari actual
 * @returns {Object} Mètodes i estat per treballar amb cites
 */
export function useAppointments(userId) {
  // Estat intern
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const subscriptionRef = useRef(null);
  
  // Funcions de càrrega i manipulació
  const fetchAppointmentsWithPatients = useCallback(async () => {...});
  const fetchAllAppointments = useCallback(async () => {...});
  const handleAppointmentStatusChange = useCallback(async (appointmentId, newStatus) => {...});
  const subscribeToAppointments = useCallback(() => {...});
  
  // Efectes per a inicialització i neteja
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

Gestiona l'autenticació d'usuaris amb Supabase, incloent:
- Login/Logout
- Registre
- Recuperació de contrasenya
- Estat d'autenticació
- Informació de perfil

### Contextos

#### `AuthContext`

Proporciona accés global a l'estat d'autenticació:

```javascript
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Estat d'autenticació i mètodes
  
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

Gestiona el tema de l'aplicació (clar/fosc):

```javascript
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Recuperar tema de localStorage o usar valor per defecte
  });
  
  // Canviar entre temes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // Aplicar classe CSS segons tema
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

## API i Connexió amb Base de Dades

### Supabase

L'aplicació utilitza Supabase com a backend principal, aprofitant les seves característiques:

- **Autenticació**: JWT basada en Supabase Auth
- **Base de dades**: PostgreSQL amb accés directe
- **Temps real**: Subscripcions per a actualitzacions en viu
- **Emmagatzematge**: Per a imatges de pacients i documents

#### Esquema de Base de Dades

Les principals taules són:

- `users`: Informació d'usuaris del sistema
- `patients`: Dades de pacients
- `appointments`: Cites mèdiques
- `messages`: Sistema de missatgeria interna
- `reports`: Informes mèdics generats

### API REST

Per a funcionalitats addicionals, s'implementa una API REST en Node.js:

```javascript
// Exemple d'endpoint per obtenir cites
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

### Utilitats de Connexió

#### `supabaseUtils.js`

Inicialitza i configura el client de Supabase:

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

Conté funcions per interactuar amb les cites:

```javascript
/**
 * Actualitza l'estat d'una cita
 * @param {string} id - ID de la cita
 * @param {string} status - Nou estat (confirmed, pending, cancelled, completed)
 * @returns {Promise<Object>} Promesa que resol amb {success: true, data} si l'operació ha estat exitosa
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
    console.error(`Error en actualitzar l'estat de la cita ${id}:`, error);
    return { success: false, error: error.message };
  }
}
```

---

## Guia d'Estil i Nomenclatura

### Components

- Noms en PascalCase: `PatientAvatar`, `AppointmentControls`
- Un component per arxiu
- Props destructurades a la signatura de la funció
- PropTypes per a documentació i verificació

```javascript
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Mostra avatar de pacient amb inicials o imatge
 */
const PatientAvatar = ({ patient, size = 'medium' }) => {
  // Implementació
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

- Arxius CSS per a cada component principal
- Variables CSS per a temes
- Convenció BEM simplificada per a noms de classe
- Media queries per a responsivitat

```css
/* Exemple de nomenclatura i variables */
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

- Hooks i utilitats: camelCase
- Funcions asíncrones: try/catch amb gestió consistent d'errors
- Comentaris JSDoc per a funcions exportades

---

## Testing

El projecte utilitza Jest per a proves unitàries i React Testing Library per a proves de components.

### Configuració

```javascript
// setupTests.js
import '@testing-library/jest-dom';
```

### Exemples de Tests

```javascript
// App.test.js
describe('App component', () => {
  test('renders login page when not authenticated', () => {
    render(<App />);
    const loginTitle = screen.getByText(/iniciar sessió/i);
    expect(loginTitle).toBeInTheDocument();
  });

  test('renders registration link', () => {
    render(<App />);
    const registerLink = screen.getByText(/registra't/i);
    expect(registerLink).toBeInTheDocument();
  });
});
```

---

## Fluxos de Treball

### Gestió de Cites

1. L'usuari navega a la secció "Cites"
2. El hook `useAppointments` carrega les cites des de Supabase
3. S'inicia una subscripció en temps real per a actualitzacions
4. L'usuari pot:
   - Veure cites en format de calendari o llista
   - Filtrar per data/estat
   - Crear noves cites
   - Actualitzar estat (completada/cancel·lada)
5. Els canvis es sincronitzen amb la base de dades i es reflecteixen en temps real

### Generació de Documents

1. L'usuari navega a la secció "Documents"
2. Selecciona un pacient del desplegable
3. Completa el formulari amb:
   - Tipus d'informe
   - Diagnòstic
   - Tractament
   - Observacions
4. Veu una vista prèvia en temps real
5. En generar el document:
   - Es crea un ID únic amb format INFMED-[timestamp]-[inicials]-[codi]-[data]
   - S'obre el diàleg d'impressió natiu
   - Es registra el document generat a la base de dades

---

## Integració i Desplegament

### Entorn de Desenvolupament

```bash
# Instal·lar dependències
npm install

# Iniciar servidor de desenvolupament amb backend
npm run dev

# Iniciar només frontend
npm start

# Iniciar només backend
npm run start:backend
```

### Variables d'Entorn

L'aplicació utilitza un arxiu `.env` per configurar:

```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_API_URL=http://localhost:4000/api
```

### Build de Producció

```bash
# Generar build optimitzat
npm run build

# Desplegar build (depèn del servei d'allotjament)
```

---

## Resolució de Problemes Comuns

### Problemes d'Autenticació

- **Símptoma**: L'usuari no pot iniciar sessió malgrat les credencials correctes
- **Solució**: Verificar que el token de Supabase no ha expirat i que les claus API són correctes

### Dades No Actualitzades

- **Símptoma**: Els canvis en cites no es reflecteixen en temps real
- **Solució**: Verificar que les subscripcions de temps real estan funcionant correctament:
  ```javascript
  const subscription = supabase
    .channel('appointment-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'appointments' }, 
      handleChange)
    .subscribe();
  ```

### Problemes amb Generació de PDF

- **Símptoma**: El document no es genera o apareix incomplet
- **Solució**: Utilitzar l'API d'impressió nativa del navegador en lloc de biblioteques externes:
  ```javascript
  const printFrame = document.createElement('iframe');
  // Configurar iframe
  document.body.appendChild(printFrame);
  printFrame.contentWindow.document.body.innerHTML = contingutHTML;
  printFrame.contentWindow.print();
  ```

---

© 2025 Sintesis_v2 - Documentació per a Desenvolupadors
