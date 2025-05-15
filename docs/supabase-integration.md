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

# Poblar la base de datos con datos iniciales
npm run seed
```

## Troubleshooting

Si encuentras problemas con la autenticación, verifica:
- Que las variables de entorno están correctamente configuradas
- Que las políticas RLS en Supabase están bien definidas
- Los logs del navegador para errores específicos de Supabase

Para problemas de CORS:
- Asegúrate de que la URL de tu aplicación está en la lista de URLs permitidas en Supabase
- Verifica que el middleware CORS en el backend esté correctamente configurado
