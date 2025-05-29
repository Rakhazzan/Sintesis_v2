# Guía de Configuración de IDs y Credenciales

Esta guía explica cómo modificar los IDs de usuario fijos y configurar las credenciales de email al migrar la aplicación a otra base de datos o entorno.

## Índice

1. [Cambiar el ID de Usuario Fijo](#cambiar-el-id-de-usuario-fijo)
   - [Identificar Referencias de ID Fijo](#identificar-referencias-de-id-fijo)
   - [Obtener Nuevo ID de Usuario](#obtener-nuevo-id-de-usuario)
   - [Actualizar Referencias](#actualizar-referencias)

2. [Configuración de Credenciales de Email](#configuración-de-credenciales-de-email)
   - [Obtener Contraseña de Aplicación](#obtener-contraseña-de-aplicación)
   - [Configurar Variables de Entorno](#configurar-variables-de-entorno)
   - [Actualizar Remitente de Email](#actualizar-remitente-de-email)

## Cambiar el ID de Usuario Fijo

La aplicación usa un ID fijo para identificar al usuario principal (doctor). Este ID debe actualizarse al migrar a una nueva base de datos.

### Identificar Referencias de ID Fijo

El ID de usuario está actualmente hardcodeado en el archivo `src/components/Mensajes.js`:

```javascript
const [userId] = useState("c8cc0e50-e427-43f3-a90c-f5a0bf8d3a49"); // ID del doctor/usuario en formato UUID válido
```

Este ID se utiliza para:
- Identificar al usuario que envía/recibe mensajes
- Obtener mensajes específicos del usuario
- Aplicar filtros en consultas a la base de datos

### Obtener Nuevo ID de Usuario

Para obtener el nuevo ID del usuario en la base de datos destino:

1. **Método desde Supabase UI**:
   - Accede al [Panel de Supabase](https://app.supabase.com)
   - Navega a "Table Editor" → Tabla `users`
   - Localiza el usuario que será el doctor principal
   - Copia el valor de la columna `id` (formato UUID)

2. **Método con SQL**:
   - Ejecuta la siguiente consulta en el SQL Editor de Supabase:
     ```sql
     SELECT id FROM users WHERE email = 'email-del-doctor@ejemplo.com';
     ```
   - Copia el valor devuelto

3. **Método desde la consola del navegador**:
   - Mientras estás autenticado como el usuario doctor, abre la consola del navegador
   - Ejecuta: `const { data } = await supabase.auth.getUser(); console.log(data.user.id);`
   - Copia el UUID mostrado

### Actualizar Referencias

Una vez tengas el nuevo ID, actualiza todas las referencias:

1. **Actualizar el ID en Mensajes.js**:
   ```javascript
   // Reemplazar este ID por el de tu usuario doctor en la nueva base de datos
   const [userId] = useState("tu-nuevo-id-aquí");
   ```

2. **Opción Recomendada - Usar Context API**:
   
   Para evitar hardcodear el ID, considera implementar una solución dinámica:

   a. Modifica `AuthContext.js` para exponer el ID del usuario actual:
   
   ```javascript
   // En src/context/AuthContext.js
   export const AuthProvider = ({ children }) => {
     // ... código existente ...
     
     return (
       <AuthContext.Provider 
         value={{ 
           user, 
           userId: user?.id, // Exponer el ID del usuario
           // ... otros valores existentes ...
         }}
       >
         {children}
       </AuthContext.Provider>
     );
   };
   ```

   b. Actualiza `Mensajes.js` para usar el context:
   
   ```javascript
   import { useAuth } from '../context/AuthContext';
   
   const Mensajes = ({ selectedPatientId = null }) => {
     const { userId } = useAuth(); // Obtener ID dinámicamente
     // ... resto del código ...
   };
   ```

## Configuración de Credenciales de Email

La aplicación utiliza nodemailer para enviar emails desde el backend. Es necesario configurar correctamente las credenciales al migrar a un nuevo entorno.

### Obtener Contraseña de Aplicación

Para Gmail, es recomendable usar contraseñas de aplicación en lugar de la contraseña regular:

1. **Activar Verificación en Dos Pasos**:
   - Inicia sesión en tu cuenta de Google
   - Ve a [Seguridad de la Cuenta](https://myaccount.google.com/security)
   - Habilita "Verificación en dos pasos" si aún no está activada

2. **Generar Contraseña de Aplicación**:
   - Ve a [Contraseñas de aplicación](https://myaccount.google.com/apppasswords)
   - Haz clic en "Seleccionar app" y elige "Otra (nombre personalizado)"
   - Ingresa un nombre descriptivo (ej. "Clínica Síntesis")
   - Haz clic en "Generar"
   - **IMPORTANTE**: Guarda la contraseña generada inmediatamente, ya que solo se muestra una vez

### Configurar Variables de Entorno

Las credenciales de email se gestionan mediante variables de entorno:

1. **Actualizar archivo `.env`**:
   ```
   SMTPHOST=smtp.gmail.com
   SMTPPORT=587
   PASS=tu-contraseña-de-aplicación-aquí
   ```

2. **Para desarrollo local**:
   - Crea o modifica el archivo `.env.local` en la raíz del proyecto
   - Añade las mismas variables con tus credenciales

3. **Para producción**:
   - En Vercel: Configura las variables en la sección "Environment Variables"
   - En otros hosts: Consulta su documentación para añadir variables de entorno

### Actualizar Remitente de Email

El email del remitente está configurado en `backend/services/emailService.js`:

```javascript
const transport = nodemailer.createTransport({
  host: process.env.SMTPHOST,
  port: process.env.SMTPPORT,
  auth: {
    user: "clinicaclinica640@gmail.com", // Cambiar por tu email
    pass: process.env.PASS
  }
});
```

y también:

```javascript
mailOptions = {
  from: options.from || '"Clínica App" <clinicaclinica640@gmail.com>', // Cambiar por tu email
  // ...
}
```

Para actualizar el remitente:

1. Modifica la dirección de email en ambas ubicaciones
2. Asegúrate de que la cuenta tenga permisos para enviar correos SMTP
3. Actualiza el nombre mostrado (`"Clínica App"`) si es necesario

## Notas Importantes

- **Seguridad**: Nunca hardcodees credenciales o contraseñas en el código
- **Testeo**: Después de cualquier cambio, prueba el envío de correos y la funcionalidad de mensajes
- **Copias de Seguridad**: Haz una copia de seguridad de la base de datos antes de realizar cambios importantes

Para cualquier problema o consulta adicional, contacta con el equipo de desarrollo de Clínica Síntesis.
