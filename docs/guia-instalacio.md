# Guia d'Instal·lació de Sintesis_v2

Aquesta guia proporciona instruccions detallades per instal·lar i configurar correctament l'aplicació Sintesis_v2 tant en un entorn de desenvolupament com en producció.

## Índex

1. [Prerequisits](#prerequisits)
2. [Instal·lació de l'Entorn de Desenvolupament](#installació-de-lentorn-de-desenvolupament)
3. [Configuració de Supabase](#configuració-de-supabase)
4. [Variables d'Entorn](#variables-dentorn)
5. [Iniciar l'Aplicació](#iniciar-laplicació)
6. [Creació d'Usuari Inicial](#creació-dusuari-inicial)
7. [Desplegament en Producció](#desplegament-en-producció)
8. [Resolució de Problemes](#resolució-de-problemes)

## Prerequisits

Abans de començar, assegureu-vos de tenir instal·lats els següents components:

- **Node.js**: Versió 14.0.0 o superior
  - [Descarregar Node.js](https://nodejs.org/)
  - Verificar versió: `node -v`

- **npm**: Versió 6.0.0 o superior (inclòs amb Node.js)
  - Verificar versió: `npm -v`

- **Git**: Últimes versions
  - [Descarregar Git](https://git-scm.com/)
  - Verificar versió: `git --version`

- **Compte de Supabase**:
  - Registrar-se a [Supabase](https://supabase.com)
  - Crear un nou projecte

- **Editor de codi**: Recomanem VSCode
  - [Descarregar VSCode](https://code.visualstudio.com/)

## Instal·lació de l'Entorn de Desenvolupament

1. **Clonar el repositori**:

   ```bash
   git clone https://github.com/Rakhazzan/Sintesis_v2.git
   cd Sintesis_v2
   ```

2. **Instal·lar dependències**:

   ```bash
   npm install
   ```

   Aquest procés pot trigar uns minuts depenent de la vostra connexió a Internet.

3. **Verificar la instal·lació**:

   Assegureu-vos que no hi ha hagut errors durant la instal·lació. Si hi ha errors relacionats amb les dependències, podeu provar:

   ```bash
   npm install --legacy-peer-deps
   ```

## Configuració de Supabase

1. **Crear un nou projecte a Supabase**:
   - Accediu al vostre [dashboard de Supabase](https://app.supabase.io)
   - Cliqueu "New Project"
   - Introduïu un nom per al projecte (p. ex., "sintesis-v2")
   - Escolliu una contrasenya segura per a la base de dades
   - Seleccioneu la regió més propera a vosaltres
   - Cliqueu "Create new project"

2. **Configurar la base de dades**:
   - Un cop creat el projecte, aneu a la secció "SQL Editor"
   - Copieu el contingut del fitxer `backend/db/schema.sql`
   - Enganxeu-lo a l'editor SQL i executeu el script
   - Verifiqueu que s'han creat totes les taules a la secció "Table Editor"

3. **Configurar autenticació**:
   - Aneu a la secció "Authentication" -> "Settings"
   - Habiliteu "Email Auth" i desactiveu "Email Confirmations"
   - A "Redirect URLs", afegiu `http://localhost:3000/auth/callback`

4. **Obtenir les claus API**:
   - Aneu a la secció "Settings" -> "API"
   - Copieu la "URL" i la "anon key" (les necessitareu més endavant)
   - Copieu també la "service_role key" per a l'script d'usuari inicial

## Variables d'Entorn

1. **Crear el fitxer .env**:
   
   Creeu un fitxer `.env` a l'arrel del projecte amb el següent contingut:

   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_role_key
   ```

   Substituïu els valors pels que heu obtingut a la secció anterior.

2. **Verificar configuració**:
   
   Assegureu-vos que el fitxer `.env` està correctament configurat i que no hi ha espais abans o després dels signes `=`.

## Iniciar l'Aplicació

1. **Iniciar el servidor de desenvolupament**:

   ```bash
   npm start
   ```

   Això iniciarà l'aplicació i hauria d'obrir automàticament http://localhost:3000 al vostre navegador.

2. **Verificar funcionament**:
   - Hauria d'aparèixer la pantalla d'inici de sessió
   - Si hi ha errors, comproveu la consola del navegador i els logs del terminal

## Creació d'Usuari Inicial

Per començar a utilitzar l'aplicació, necessitareu crear un usuari inicial:

1. **Executar l'script d'usuari inicial**:

   ```bash
   cd backend/db
   node createInitialUser.js
   ```

   Aquest script crearà un usuari amb les següents credencials:
   - Email: martinez@email.com
   - Contrasenya: 12345678

2. **Iniciar sessió**:
   - Torneu a l'aplicació al navegador
   - Utilitzeu les credencials creades per iniciar sessió

## Desplegament en Producció

Per desplegar l'aplicació en un entorn de producció:

1. **Preparar el build**:

   ```bash
   npm run build
   ```

   Això crearà una versió optimitzada de l'aplicació a la carpeta `build/`.

2. **Opcions de desplegament**:

   - **Netlify**:
     - Connecteu el vostre repositori GitHub a Netlify
     - Configureu les variables d'entorn a Netlify
     - Especifiqueu `build` com a directori de publicació

   - **Vercel**:
     - Connecteu el vostre repositori GitHub a Vercel
     - Configureu les variables d'entorn a Vercel
     - La configuració predeterminada hauria de funcionar correctament

   - **Servidor Propi**:
     - Copieu el contingut de la carpeta `build/` al vostre servidor web
     - Configureu correctament les redireccions per a les rutes de React

## Resolució de Problemes

### Problemes d'Autenticació

- **Error "Invalid login credentials"**:
  - Verifiqueu que l'email i la contrasenya són correctes
  - Comproveu que l'usuari existeix a la taula auth.users de Supabase

- **Error de CORS**:
  - Assegureu-vos que la vostra URL està a la llista d'URLs permeses a Supabase

### Problemes de Base de Dades

- **Error al carregar dades**:
  - Verifiqueu que les taules s'han creat correctament
  - Comproveu les polítiques RLS a Supabase
  - Verifiqueu que les claus API són correctes

### Problemes de Desplegament

- **Pantalla en blanc després del desplegament**:
  - Comproveu que les variables d'entorn estan configurades al servei de desplegament
  - Verifiqueu que les rutes estan configurades correctament (generalment requereix un fitxer `_redirects` o similar)

Per a més assistència, consulteu les [Issues del repositori](https://github.com/Rakhazzan/Sintesis_v2/issues) o creeu una nova issue amb una descripció detallada del problema.
