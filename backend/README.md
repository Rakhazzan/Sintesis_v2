# Backend API para Clinica App

Este backend implementa una capa API REST sobre Supabase para la aplicación Clinica.

## Estructura del Proyecto

backend/
  ├── controllers/     # Controladores para manejar la lógica de negocio
  ├── db/              # Scripts y configuración de la base de datos
  ├── routes/          # Definición de rutas API
  ├── services/        # Servicios para interactuar con Supabase
  ├── utils/           # Utilidades y configuración
  ├── server.js        # Configuración del servidor Express
  └── index.js         # Punto de entrada

## Configuración

1. Crea un proyecto en [Supabase](https://supabase.io)
2. Copia el archivo `.env.example` a `.env` y completa las variables con tus credenciales de Supabase
3. Ejecuta el script de migración para crear las tablas necesarias

## Inicializar la Base de Datos

Para crear las tablas y cargar datos iniciales:
# Crea las tablas en Supabase
# Copia el contenido de db/schema.sql y ejecútalo en el SQL Editor de Supabase

# Carga datos iniciales
npm run seed


## Desarrollo

# Ejecutar solo el backend
npm run start:backend

# Ejecutar frontend y backend simultáneamente
npm run dev

## Endpoints API

### Autenticación
- `POST /api/users/login` - Iniciar sesión
- `POST /api/users/register` - Registrar nuevo usuario
- `POST /api/users/logout` - Cerrar sesión

### Usuarios
- `GET /api/users/:id` - Obtener datos de usuario
- `PUT /api/users/:id` - Actualizar datos de usuario
- `GET /api/users/:id/preferences` - Obtener preferencias
- `PATCH /api/users/:id/preferences` - Actualizar preferencias

### Citas
- `GET /api/appointments` - Listar todas las citas
- `GET /api/appointments/date/:date` - Citas por fecha
- `POST /api/appointments` - Crear nueva cita
- `PUT /api/appointments/:id` - Actualizar cita
- `DELETE /api/appointments/:id` - Eliminar cita
- `PATCH /api/appointments/:id/status` - Cambiar estado

### Pacientes
- `GET /api/patients` - Listar todos los pacientes
- `GET /api/patients/search?query=texto` - Buscar pacientes
- `GET /api/patients/:id` - Obtener un paciente
- `POST /api/patients` - Crear nuevo paciente
- `PUT /api/patients/:id` - Actualizar paciente
- `DELETE /api/patients/:id` - Eliminar paciente

### Mensajes
- `GET /api/messages/user/:userId` - Mensajes de un usuario
- `GET /api/messages/conversation/:userId1/:userId2` - Conversación entre usuarios
- `GET /api/messages/unread/:userId` - Contar mensajes no leídos
- `POST /api/messages` - Enviar mensaje
- `PATCH /api/messages/:id/read` - Marcar como leído
- `DELETE /api/messages/:id` - Eliminar mensaje
