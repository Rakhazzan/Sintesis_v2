# Documentació d'Esquema de Base de Dades

## Índex
1. [Introducció](#introducció)
2. [Taules Principals](#taules-principals)
3. [Relacions entre Taules](#relacions-entre-taules)
4. [Polítiques de Seguretat (RLS)](#polítiques-de-seguretat-rls)
5. [Índexs](#índexs)
6. [Triggers i Funcions](#triggers-i-funcions)
7. [Optimització de Consultes](#optimització-de-consultes)

## Introducció

Aquest document descriu l'esquema de base de dades PostgreSQL utilitzat pel projecte Sintesis_v2 a Supabase. L'esquema està dissenyat per gestionar dades d'usuaris, pacients, cites, missatges i informes mèdics en un entorn de clínica mèdica.

## Taules Principals

### Taula `users`

Emmagatzema els usuaris del sistema (metges i personal clínic).

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  type TEXT
);
```

#### Notes:
- `id` està vinculat directament a la taula d'autenticació `auth.users` de Supabase
- `preferences` permet emmagatzemar configuracions personalitzades en format JSON
- `type` permet diferenciar entre els diferents tipus d'usuaris del sistema
- Políticas RLS garanteixen que cada usuari només pot veure i modificar el seu propi perfil

### Taula `patients`

Emmagatzema la informació dels pacients.

```sql
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar TEXT,
  birthdate DATE,
  gender TEXT,
  medical_condition TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  doctor_id UUID REFERENCES users ON DELETE SET NULL
);
```

#### Notes:
- `id` és generat automàticament mitjançant l'extensió `uuid-ossp`
- `avatar` emmagatzema l'URL de la imatge de perfil del pacient
- `birthdate` conté la data de naixement del pacient
- `medical_condition` emmagatzema la condició mèdica principal del pacient
- `color` permet assignar un color personalitzat per a la visualització del pacient a la interfície
- `doctor_id` vincula el pacient amb el seu metge principal
- Si un metge és eliminat del sistema, els seus pacients mantenen `doctor_id = NULL`

### Taula `appointments`

Emmagatzema les cites mèdiques.

```sql
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients ON DELETE CASCADE,
  doctor_id UUID REFERENCES users ON DELETE SET NULL,
  date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT,
  appointment_type TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  diagnosis TEXT,
  phone_call BOOLEAN DEFAULT FALSE,
  video_call BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Notes:
- `patient_id` i `doctor_id` vinculen la cita amb el pacient i el metge
- `start_time` i `end_time` defineixen l'interval horàri de la cita
- `appointment_type` indica el tipus de visita (ex: "Revisió", "Consulta", etc.)
- `diagnosis` permet registrar el diagnòstic després de la cita
- `phone_call` i `video_call` indiquen si la cita és per telèfon o vídeo
- `status` té una restricció CHECK per garantir que només conté valors vàlids
- Si un pacient és eliminat, totes les seves cites també s'eliminen automàticament (CASCADE)
- Si un metge és eliminat, les seves cites romanen amb `doctor_id = NULL`

### Taula `messages`

Emmagatzema els missatges entre usuaris del sistema.

```sql
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  subject TEXT,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email_sent BOOLEAN DEFAULT FALSE,
  sender_type TEXT,
  receiver_type TEXT
);
```

#### Notes:
- Cada missatge té un remitent i un destinatari
- `sender_id` i `receiver_id` no estàn vinculats directament a la taula users
- `sender_type` i `receiver_type` permeten classificar l'origen/destí (ex: "doctor", "patient")
- `email_sent` indica si s'ha enviat notificació per correu electrònic
- No hi ha `updated_at` perquè els missatges no es poden editar després d'enviar-se

<!-- La tabla reports ha sido eliminada del esquema -->
- No hi ha `updated_at` perquè els informes són documents oficials que no es modifiquen

## Relacions entre Taules

L'esquema implementa les següents relacions:

1. **Un usuari pot tenir molts pacients** (relació 1:N entre `users` i `patients`)
2. **Un pacient pot tenir moltes cites** (relació 1:N entre `patients` i `appointments`)
3. **Un metge pot tenir moltes cites** (relació 1:N entre `users` i `appointments`)
4. **Els usuaris poden enviar i rebre missatges** (relacions N:M entre `users` i `messages`)

## Polítiques de Seguretat

Les polítiques de seguretat s'apliquen directament sense habilitar explícitament RLS.

### Per a la taula `users`

```sql
-- Els usuaris poden veure el seu propi perfil
CREATE POLICY "Los usuarios pueden ver su propio perfil" ON users
  FOR SELECT USING (auth.uid() = id);
  
-- Els usuaris poden actualitzar el seu propi perfil
CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON users
  FOR UPDATE USING (auth.uid() = id);
```

### Per a la taula `patients`

```sql
-- Els metges poden veure els seus pacients
CREATE POLICY "Los médicos pueden ver sus pacientes" ON patients
  FOR SELECT USING (auth.uid() = doctor_id);
  
-- Els metges poden crear pacients
CREATE POLICY "Los médicos pueden crear pacientes" ON patients
  FOR INSERT WITH CHECK (auth.uid() = doctor_id);

-- Els metges poden actualitzar els seus pacients
CREATE POLICY "Los médicos pueden actualizar sus pacientes" ON patients
  FOR UPDATE USING (auth.uid() = doctor_id);

-- Els metges poden eliminar els seus pacients
CREATE POLICY "Los médicos pueden eliminar sus pacientes" ON patients
  FOR DELETE USING (auth.uid() = doctor_id);
```

Les polítiques RLS per a `appointments`, `messages` i `reports` segueixen un patró similar, assegurant que cada usuari només pugui accedir a les dades relacionades amb el seu rol.

## Índexs

Per optimitzar el rendiment de les consultes, s'han creat els següents índexs:

```sql
-- Índexs per a cites
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments (date);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments (patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments (doctor_id);

-- Índexs per a pacients
CREATE INDEX IF NOT EXISTS idx_patients_doctor_id ON patients (doctor_id);
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients (name);

-- Índexs per a missatges
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages (sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages (receiver_id);

-- Els índexs per a informes s'han eliminat ja que la taula reports no existeix
```

Aquests índexs milloren significativament el rendiment de les consultes més freqüents, com:
- Cercar cites per data
- Cercar pacients per nom
- Obtenir els missatges d'un usuari
- Filtrar informes per pacient o metge

## Triggers i Funcions

Per mantenir automàticament els camps `updated_at`, s'utilitzen triggers PostgreSQL:

```sql
-- Funció per actualitzar el timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger per a la taula users
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at();

-- Trigger per a la taula patients
CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at();

-- Trigger per a la taula appointments
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at();
```

## Optimització de Consultes

Per a millorar el rendiment, les consultes haurien de:

1. **Utilitzar els índexs existents**:
   ```sql
   -- Bon rendiment: usa l'índex idx_appointments_date
   SELECT * FROM appointments WHERE date = '2025-05-29';
   
   -- Bon rendiment: usa l'índex idx_patients_name
   SELECT * FROM patients WHERE name ILIKE '%Mohamed%';
   ```

2. **Limitar la quantitat de dades seleccionades**:
   ```sql
   -- Millor que SELECT *
   SELECT id, name, email FROM patients WHERE doctor_id = 'user-uuid';
   ```

3. **Utilitzar JOIN en comptes de consultes anidades**:
   ```sql
   -- Millor rendiment que subqueries
   SELECT a.*, p.name as patient_name
   FROM appointments a
   JOIN patients p ON a.patient_id = p.id
   WHERE a.date = '2025-05-29';
   ```

4. **Implementar paginació per a grans conjunts de dades**:
   ```sql
   SELECT * FROM patients 
   ORDER BY name 
   LIMIT 20 OFFSET 0;  -- primera pàgina
   ```
