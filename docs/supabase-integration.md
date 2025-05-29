# Guía de Integración con Supabase

Esta guía explica cómo se ha migrado la aplicación Clinica App de localStorage a Supabase como base de datos y capa de autenticación.

## ¿Qué es Supabase?

Supabase es una alternativa open source a Firebase que proporciona:
- Base de datos PostgreSQL
- Autenticación de usuarios
- Almacenamiento de archivos
- API REST y GraphQL automática
- Funciones en tiempo real

## Configuración de proyecto

### 1. Crear proyecto en Supabase

1. Regístrate en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto 
3. Anota la URL y las claves API (anon y service)
4. Configura las variables de entorno en el archivo `.env`

### 2. Configuración inicial

Estructura de archivos creada:
```
├── backend/           # Capa API 
│   ├── controllers/   # Lógica de negocio
│   ├── db/            # Scripts de base de datos 
│   ├── routes/        # Rutas API
│   ├── services/      # Servicios de datos
│   └── utils/         # Utilidades
├── src/
│   └── utils/         # Utilidades frontend
│       ├── authUtils.js       # Autenticación con Supabase
│       ├── supabaseUtils.js   # Cliente Supabase
│       ├── appointmentUtils.js # Gestión de citas
│       ├── patientUtils.js    # Gestión de pacientes
│       ├── messageUtils.js    # Gestión de mensajes
│       └── themeUtils.js      # Gestión del tema
```

## Tablas Creadas

Se han creado las siguientes tablas en Supabase:

- **users**: Perfiles de usuarios (médicos y pacientes)
- **patients**: Datos de pacientes
- **appointments**: Citas médicas
- **messages**: Mensajes entre usuarios

## Migrar desde localStorage

Se han reemplazado todas las funciones que usaban localStorage con llamadas a la API de Supabase:

- **Autenticación**: De `localStorage.getItem(AUTH_TOKEN_KEY)` a `supabase.auth.getSession()`
- **Gestión de usuario**: De `localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))` a `supabase.from('users').upsert(userData)`
- **Preferencias**: De `localStorage.getItem('theme')` a `supabase.from('users').select('preferences')`
- **Citas**: Ahora se obtienen mediante `supabase.from('appointments').select('*')`

## Estructura de la API REST

La API implementada sigue un patrón de 3 capas:

1. **Rutas** (routes): Define los endpoints disponibles.
2. **Controladores** (controllers): Implementa la lógica de negocio.
3. **Servicios** (services): Interactúa directamente con Supabase.

## Seguridad

- Se usa Row Level Security (RLS) en Supabase para garantizar que cada usuario solo acceda a sus propios datos.
- Los tokens JWT proporcionados por Supabase se utilizan para la autenticación.
- Se implementan validaciones en los controladores para datos entrantes.

## Manejo de Estado en el Frontend

- El componente App ahora carga datos de manera asíncrona desde Supabase.
- Se ha añadido un estado de `loading` para gestionar la carga asíncrona.
- Los datos de usuario y preferencias se obtienen de Supabase al iniciar.

## Ejecutar la Aplicación

```bash
# Iniciar solo el backend
npm run start:backend

# Iniciar backend y frontend simultáneamente
npm run dev

# Poblar la base de dades amb dades inicials
npm run seed
```

## Troubleshooting

# Documentació d'Integració amb Supabase - Sintesis_v2

## Índex
1. [Introducció](#introducció)
2. [Configuració](#configuració)
3. [Autenticació](#autenticació)
4. [Esquema de Base de Dades](#esquema-de-base-de-dades)
5. [Utilitats d'Accés a Dades](#utilitats-daccés-a-dades)
   - [Pacients](#pacients)
   - [Cites](#cites)
   - [Missatges](#missatges)
6. [Patró de Resiliència](#patró-de-resiliència)
7. [Subscripcions en Temps Real](#subscripcions-en-temps-real)
8. [Polítiques de Seguretat (RLS)](#polítiques-de-seguretat-rls)
9. [Resolució de Problemes](#resolució-de-problemes)

## Introducció

Sintesis_v2 utilitza Supabase com a backend principal per a la gestió de dades. Supabase ofereix una plataforma completa que inclou base de dades PostgreSQL, autenticació, emmagatzematge d'arxius i funcionalitats en temps real.

Aquesta documentació descriu la integració entre Sintesis_v2 i Supabase, incloent l'estructura de la base de dades, patrons d'accés a dades i consideracions de seguretat.
Aquesta documentació descriu la integració entre Sintesis_v2 i Supabase, incloent l'estructura de la base de dades, patrons d'accés a dades i consideracions de seguretat.

## Configuració

### Extensió UUID

Per generar identificadors únics, la base de dades utilitza l'extensió `uuid-ossp` de PostgreSQL:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### Connexió a Supabase

La connexió amb Supabase es configura a través de variables d'entorn i s'inicialitza a l'arxiu `src/utils/supabaseUtils.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

// Inicialitzar client de Supabase per al frontend
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL o Anon Key no trobats. Verifica les teves variables d\'entorn.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
```

Variables d'entorn requerides al fitxer `.env`:

```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

## Autenticació

L'aplicació utilitza el sistema d'autenticació de Supabase mitjançant JWT. Les principals operacions d'autenticació estan implementades a `src/utils/authUtils.js`:

### Inici de Sessió

```javascript
export async function saveAuthData(userData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userData.email,
    password: userData.password
  });
  
  // Resta del codi per desar dades addicionals...
}
```

### Registre d'Usuaris

```javascript
export async function registerUser(userData) {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: { name: userData.name }
    }
  });
  
  // Desar dades addicionals a la taula users...
}
```

### Tancament de Sessió

```javascript
export async function clearAuthData() {
  const { error } = await supabase.auth.signOut();
  // Gestió d'errors...
}
```

### Verificació de Sessió

```javascript
export async function hasActiveSession() {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}
```

## Esquema de Base de Dades

L'aplicació utilitza les següents taules principals a Supabase:

### Taula `users`

Emmagatzema informació dels usuaris del sistema.

| Camp | Tipus | Descripció |
|-------|------|-------------|
| id | uuid | Identificador únic de l'usuari (clau primària, vinculat a auth.users) |
| email | text | Correu electrònic de l'usuari (ha de ser únic) |
| name | text | Nom complet de l'usuari |
| avatar | text | URL de la imatge de perfil |
| preferences | jsonb | Preferències de l'usuari en format JSON |
| type | text | Tipus d'usuari (ex: admin, metge, etc.) |
| created_at | timestamptz | Data de creació del registre |
| updated_at | timestamptz | Data d'última actualització |

### Taula `patients`

Emmagatzema la informació dels pacients.

| Camp | Tipus | Descripció |
|-------|------|-------------|
| id | uuid | Identificador únic del pacient (clau primària) |
| name | text | Nom complet del pacient |
| email | text | Correu electrònic del pacient |
| phone | text | Telèfon de contacte |
| avatar | text | URL de la imatge de perfil del pacient |
| birthdate | date | Data de naixement |
| gender | text | Gènere |
| medical_condition | text | Condició mèdica principal del pacient |
| color | text | Codi de color per a la visualització a la interfície |
| doctor_id | uuid | ID del metge principal (clau forana a users.id) |
| updated_at | timestamptz | Data d'última actualització |

### Taula `appointments`

Emmagatzema les cites mèdiques.

| Camp | Tipus | Descripció |
|-------|------|-------------|
| id | uuid | Identificador únic de la cita (clau primària) |
| patient_id | uuid | ID del pacient (clau forana a patients.id) |
| doctor_id | uuid | ID del metge (clau forana a users.id) |
| date | date | Data de la cita |
| start_time | text | Hora d'inici de la cita |
| end_time | text | Hora de finalització de la cita |
| appointment_type | text | Tipus de cita (Revisió, Consulta, etc.) |
| status | text | Estat (confirmed, pending, cancelled, completed) |
| diagnosis | text | Diagnòstic mèdic |
| phone_call | boolean | Indica si la cita és per telèfon |
| video_call | boolean | Indica si la cita és per videoconferència |
| created_at | timestamptz | Data de creació del registre |
| updated_at | timestamptz | Data d'última actualització |

### Taula `messages`

Emmagatzema els missatges entre usuaris.

| Camp | Tipus | Descripció |
|-------|------|-------------|
| id | uuid | Identificador únic del missatge (clau primària) |
| sender_id | uuid | ID del remitent |
| receiver_id | uuid | ID del destinatari |
| subject | text | Assumpte del missatge |
| content | text | Contingut del missatge |
| read | boolean | Indica si el missatge ha estat llegit |
| created_at | timestamptz | Data de creació del missatge |
| email_sent | boolean | Indica si s'ha enviat notificació per email |
| sender_type | text | Tipus del remitent (doctor, patient, etc.) |
| receiver_type | text | Tipus del destinatari (doctor, patient, etc.) |



## Utilitats d'Accés a Dades

### Pacients

Les operacions CRUD per a pacients estan implementades a `src/utils/patientUtils.js`:

#### Obtenir tots els pacients

```javascript
export async function getAllPatients() {
  const { data, error } = await supabase
    .from('patients')
    .select('*');
  // Gestió de resultats i errors...
}
```

#### Obtenir pacient per ID

```javascript
export async function getPatientById(id) {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single();
  // Gestió de resultats i errors...
}
```

#### Cercar pacients

```javascript
export async function searchPatients(query) {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .ilike('name', `%${query}%`);
  // Gestió de resultats i errors...
}
```

#### Crear pacient

```javascript
export async function createPatient(patientData) {
  const { data, error } = await supabase
    .from('patients')
    .insert([patientData])
    .select();
  // Gestió de resultats i errors...
}
```

#### Actualitzar pacient

```javascript
export async function updatePatient(id, patientData) {
  const { data, error } = await supabase
    .from('patients')
    .update(patientData)
    .eq('id', id)
    .select();
  // Gestió de resultats i errors...
}
```

#### Eliminar pacient

```javascript
export async function deletePatient(id) {
  const { error } = await supabase
    .from('patients')
    .delete()
    .eq('id', id);
  // Gestió d'errors...
}
```

### Citas

Les operacions per a cites estan implementades a `src/utils/appointmentUtils.js`:

#### Obtenir totes les cites

```javascript
export async function getAllAppointments() {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, patient:patients(*)');
  // Gestió de resultats i errors...
}
```

#### Obtenir cites per data

```javascript
export async function getAppointmentsByDate(date) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, patient:patients(*)')
    .eq('date', date);
  // Gestió de resultats i errors...
}
```

#### Actualitzar estat de cita

```javascript
export async function updateAppointmentStatus(id, status) {
  const updatedAt = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('appointments')
    .update({ 
      status, 
      updated_at: updatedAt 
    })
    .eq('id', id)
    .select();
  // Gestió de resultats i errors...
}
```

### Missatges

Les operacions per a missatges estan implementades a `src/utils/messageUtils.js`:

#### Obtenir missatges d'un usuari

```javascript
export async function getUserMessages(userId) {
  const { data, error } = await supabase
    .from('messages')
    .select('*, sender:users!sender_id(*), receiver:users!receiver_id(*)')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order('created_at', { ascending: false });
  // Gestió de resultats i errors...
}
```

#### Obtenir conversa entre dos usuaris

```javascript
export async function getConversation(userId1, userId2) {
  const { data, error } = await supabase
    .from('messages')
    .select('*, sender:users!sender_id(*), receiver:users!receiver_id(*)')
    .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
    .order('created_at', { ascending: true });
  // Gestió de resultats i errors...
}
```

#### Marcar missatge com a llegit

```javascript
export async function markMessageAsRead(messageId) {
  const { data, error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('id', messageId)
    .select();
  // Gestió de resultats i errors...
}
```

```

### Polítiques per a la taula `messages`

```sql
-- Permetre als usuaris veure missatges en els quals participen
CREATE POLICY "Els usuaris poden veure missatges en els quals participen" 
  ON messages FOR SELECT 
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Permetre als usuaris enviar missatges
CREATE POLICY "Els usuaris poden enviar missatges" 
  ON messages FOR INSERT 
  WITH CHECK (auth.uid() = sender_id);

-- Permetre al remitent eliminar els seus missatges
CREATE POLICY "El remitent pot eliminar els seus missatges" 
  ON messages FOR DELETE 
  USING (auth.uid() = sender_id);
```

<!-- La sección de políticas para la tabla reports ha sido eliminada ya que esta tabla ya no existe -->

## Índexs i Rendiment

Per optimitzar el rendiment de les consultes, s'han creat diversos índexs:

```sql
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments (date);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments (patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments (doctor_id);
CREATE INDEX IF NOT EXISTS idx_patients_doctor_id ON patients (doctor_id);
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients (name);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages (sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages (receiver_id);
```

## Automatització de Timestamps

Per mantenir automàticament les dates d'actualització, s'utilitzen triggers PostgreSQL:

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at();
```

## Patró de Resiliència

L'aplicació implementa un patró de resiliència per gestionar possibles fallades en la connexió amb Supabase. Totes les funcions d'accés a dades inclouen:

1. **Intent principal amb Supabase** - Primera opció d'accés a dades
2. **Fallback a API REST** - Si Supabase falla, s'intenta amb una API alternativa
3. **Dades d'exemple hardcodejades** - Com a últim recurs per mantenir l'aplicació funcional

Exemple del patró implementat:

```javascript
try {
  // Intent principal amb Supabase
  const { data, error } = await supabase.from('patients').select('*');
  if (error) throw error;
  return data;
} catch (error) {
  console.error('Error amb Supabase:', error);
  // Fallback a API REST
  try {
    const response = await fetch(`${API_URL}/patients`);
    if (!response.ok) throw new Error('Error HTTP');
    return await response.json();
  } catch (fetchError) {
    console.error('Error amb fetch:', fetchError);
    // Últim recurs: dades hardcodejades
    return [{ id: '1', name: 'Paciente Ejemplo' }];
  }
}
```

## Subscripcions en Temps Real

L'aplicació utilitza les capacitats de temps real de Supabase per mantenir les dades actualitzades sense necessitat de recarregar la pàgina. S'implementen mitjançant subscripcions a canals:

```javascript
const setupRealtimeSubscription = () => {
  const subscription = supabase
    .channel('appointment-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'appointments' }, 
      handleChange)
    .subscribe();
  
  // Desar referència per a neteja
  subscriptionRef.current = subscription;
  
  return () => {
    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
    }
  };
};
```

## Polítiques de Seguretat (RLS)

La seguretat de les dades s'implementa mitjançant les polítiques Row Level Security (RLS) de Supabase. Les polítiques s'apliquen directament sense necessitat d'habilitar explícitament RLS per a cada taula.

A continuació es detallen les polítiques per a cada taula:

### Polítiques per a la taula `patients`

```sql
-- Permetre als metges veure els seus pacients
CREATE POLICY "Els metges poden veure els seus pacients" 
  ON patients FOR SELECT 
  USING (auth.uid() = doctor_id);

-- Permetre als metges crear pacients
CREATE POLICY "Els metges poden crear pacients" 
  ON patients FOR INSERT 
  WITH CHECK (auth.uid() = doctor_id);

-- Permetre als metges actualitzar els seus pacients
CREATE POLICY "Els metges poden actualitzar els seus pacients" 
  ON patients FOR UPDATE 
  USING (auth.uid() = doctor_id);

-- Permetre als metges eliminar els seus pacients
CREATE POLICY "Els metges poden eliminar els seus pacients" 
  ON patients FOR DELETE 
  USING (auth.uid() = doctor_id);
```

### Polítiques per a la taula `appointments`

```sql
-- Permetre als metges veure les seves cites
CREATE POLICY "Els metges poden veure les seves cites" 
  ON appointments FOR SELECT 
  USING (auth.uid() = doctor_id);

-- Permetre als metges crear cites
CREATE POLICY "Els metges poden crear cites" 
  ON appointments FOR INSERT 
  WITH CHECK (auth.uid() = doctor_id);

-- Permetre als metges actualitzar les seves cites
CREATE POLICY "Els metges poden actualitzar les seves cites" 
  ON appointments FOR UPDATE 
  USING (auth.uid() = doctor_id);

-- Permetre als metges eliminar les seves cites
CREATE POLICY "Els metges poden eliminar les seves cites" 
  ON appointments FOR DELETE 
  USING (auth.uid() = doctor_id);
```

## Resolució de Problemes

### Problemes d'Autenticació

Si trobes problemes amb l'autenticació, verifica:

- Que les variables d'entorn estiguin correctament configurades
- Que les polítiques RLS a Supabase estiguin ben definides
- Els logs del navegador per a errors específics de Supabase
- Que la sessió no hagi expirat (per defecte duren 1 setmana)

### Problemes de CORS

Per solucionar problemes de CORS:

- Assegura't que la URL de la teva aplicació estigui a la llista d'URLs permeses a Supabase
- Verifica que el middleware CORS al backend estigui correctament configurat
- Comprova les capçaleres de sol·licitud i resposta a les eines de desenvolupament

### Problemes de Rendiment

Per millorar el rendiment de les consultes:

- Utilitza índexs a les columnes freqüentment consultades
- Limita la quantitat de dades seleccionades amb `select('columna1, columna2')`
- Implementa paginació per a grans conjunts de dades
- Evita consultes imbricades excessives

### Monitoratge i Depuració

- Utilitza la consola de Supabase per veure logs de consultes
- Implementa registre detallat d'errors a l'aplicació
- Configura alertes per a consultes lentes o errors freqüents
