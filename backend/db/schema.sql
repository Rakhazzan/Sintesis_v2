-- Schema para Supabase
-- Este archivo contiene las definiciones de tablas para la base de datos

-- Extensión para generación de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- Políticas de seguridad para usuarios
CREATE POLICY "Los usuarios pueden ver su propio perfil" ON users
  FOR SELECT USING (auth.uid() = id);
  
CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Tabla de pacientes
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



-- Políticas de seguridad para pacientes
CREATE POLICY "Los médicos pueden ver sus pacientes" ON patients
  FOR SELECT USING (auth.uid() = doctor_id);
  
CREATE POLICY "Los médicos pueden crear pacientes" ON patients
  FOR INSERT WITH CHECK (auth.uid() = doctor_id);

CREATE POLICY "Los médicos pueden actualizar sus pacientes" ON patients
  FOR UPDATE USING (auth.uid() = doctor_id);

CREATE POLICY "Los médicos pueden eliminar sus pacientes" ON patients
  FOR DELETE USING (auth.uid() = doctor_id);

-- Tabla de citas
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients ON DELETE CASCADE,
  doctor_id UUID REFERENCES users ON DELETE SET NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  duration INTEGER,
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);



-- Políticas de seguridad para citas
CREATE POLICY "Los médicos pueden ver sus citas" ON appointments
  FOR SELECT USING (auth.uid() = doctor_id);
  
CREATE POLICY "Los médicos pueden crear citas" ON appointments
  FOR INSERT WITH CHECK (auth.uid() = doctor_id);

CREATE POLICY "Los médicos pueden actualizar sus citas" ON appointments
  FOR UPDATE USING (auth.uid() = doctor_id);

CREATE POLICY "Los médicos pueden eliminar sus citas" ON appointments
  FOR DELETE USING (auth.uid() = doctor_id);

-- Tabla de mensajes
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
  subject TEXT,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);



-- Políticas de seguridad para mensajes
CREATE POLICY "Los usuarios pueden ver mensajes en los que participan" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
  
CREATE POLICY "Los usuarios pueden enviar mensajes" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "El remitente puede eliminar sus mensajes" ON messages
  FOR DELETE USING (auth.uid() = sender_id);



-- Políticas de seguridad para informes
CREATE POLICY "Los médicos pueden ver sus informes" ON reports
  FOR SELECT USING (auth.uid() = doctor_id);
  
CREATE POLICY "Los médicos pueden crear informes" ON reports
  FOR INSERT WITH CHECK (auth.uid() = doctor_id);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments (date);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments (patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments (doctor_id);
CREATE INDEX IF NOT EXISTS idx_patients_doctor_id ON patients (doctor_id);
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients (name);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages (sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages (receiver_id);
CREATE INDEX IF NOT EXISTS idx_reports_patient_id ON reports (patient_id);
CREATE INDEX IF NOT EXISTS idx_reports_doctor_id ON reports (doctor_id);

-- Funciones para actualizar timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar timestamps
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
