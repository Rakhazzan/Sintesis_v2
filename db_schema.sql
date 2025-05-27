-- Crear tabla statistics para almacenar estadísticas
CREATE TABLE IF NOT EXISTS public.statistics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    period_type TEXT NOT NULL, -- 'week', 'month', 'year'
    period_index INTEGER NOT NULL, -- índice dentro del periodo (0-6 para semanas, 0-11 para meses, etc.)
    value INTEGER NOT NULL, -- valor numérico de la estadística
    doctor_id UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla dashboard_metrics para almacenar métricas del dashboard
CREATE TABLE IF NOT EXISTS public.dashboard_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID REFERENCES public.users(id),
    total_appointments INTEGER DEFAULT 0, -- citas totales
    new_patients INTEGER DEFAULT 0, -- pacientes nuevos
    average_time INTEGER DEFAULT 0, -- tiempo promedio en minutos
    appointments_trend INTEGER DEFAULT 0, -- tendencia citas (porcentaje)
    patients_trend INTEGER DEFAULT 0, -- tendencia pacientes (porcentaje)
    time_trend INTEGER DEFAULT 0, -- tendencia tiempo (porcentaje)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar datos de ejemplo
INSERT INTO public.dashboard_metrics (doctor_id, total_appointments, new_patients, average_time, appointments_trend, patients_trend, time_trend)
SELECT 
    id, 
    42, -- total_appointments
    8, -- new_patients
    24, -- average_time
    12, -- appointments_trend
    5, -- patients_trend
    -3 -- time_trend
FROM public.users 
WHERE user_type = 'doctor'
ON CONFLICT (id) DO NOTHING;

-- Insertar datos de ejemplo para statistics (semana)
INSERT INTO public.statistics (period_type, period_index, value, doctor_id)
SELECT 
    'week', -- period_type
    generate_series(0, 6), -- period_index (0-6 para días de la semana)
    (RANDOM() * 70 + 10)::INTEGER, -- value (random entre 10-80)
    id -- doctor_id
FROM public.users
WHERE user_type = 'doctor';

-- Insertar datos de ejemplo para statistics (mes)
INSERT INTO public.statistics (period_type, period_index, value, doctor_id)
SELECT 
    'month', -- period_type
    generate_series(0, 11), -- period_index (0-11 para meses)
    (RANDOM() * 70 + 10)::INTEGER, -- value (random entre 10-80)
    id -- doctor_id
FROM public.users
WHERE user_type = 'doctor';

-- Insertar datos de ejemplo para statistics (año)
INSERT INTO public.statistics (period_type, period_index, value, doctor_id)
SELECT 
    'year', -- period_type
    generate_series(0, 4), -- period_index (0-4 para los últimos 5 años)
    (RANDOM() * 70 + 10)::INTEGER, -- value (random entre 10-80)
    id -- doctor_id
FROM public.users
WHERE user_type = 'doctor';
