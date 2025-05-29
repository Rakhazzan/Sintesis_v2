# SINTESIS_V2

Potenciant l'atenció sanitària mitjançant una comunicació i gestió fluida.

![last commit](https://img.shields.io/badge/last%20commit-today-brightgreen) ![javascript](https://img.shields.io/badge/javascript-74.1%25-blue) ![languages](https://img.shields.io/badge/languages-4-blueviolet)

Creat amb les eines i tecnologies:

![Express](https://img.shields.io/badge/-Express-black?style=flat-square&logo=express) ![JSON](https://img.shields.io/badge/-JSON-black?style=flat-square&logo=json) ![Markdown](https://img.shields.io/badge/-Markdown-black?style=flat-square&logo=markdown) ![npm](https://img.shields.io/badge/-npm-black?style=flat-square&logo=npm) ![ENV](https://img.shields.io/badge/-.ENV-black?style=flat-square&logo=.env)

![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript) ![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react) ![Axios](https://img.shields.io/badge/-Axios-black?style=flat-square&logo=axios) ![datefns](https://img.shields.io/badge/-datefns-black?style=flat-square&logo=datefns) ![Buffer](https://img.shields.io/badge/-Buffer-black?style=flat-square&logo=buffer)

---

## Taula de Continguts

- [Resum](#resum)
- [Començar](#començar)
  - [Prerequisits](#prerequisits)
  - [Instal·lació](#installació)
  - [Ús](#ús)
  - [Proves](#proves)
- [Característiques](#característiques)
- [Documentació Tècnica](#documentació-tècnica)
- [Estructura del Projecte](#estructura-del-projecte)
- [Organització del Codi](#organització-del-codi)
- [Components UI](#components-ui)
- [Gestió d'Estat](#gestió-destat)
- [Integració API](#integració-api)
- [Temes](#temes)
- [Contribuir](#contribuir)
- [Llicència](#llicència)

---

## Resum

Sintesis_V2 és una aplicació completa de gestió de pacients dissenyada per a professionals de la salut. Aquesta plataforma permet una gestió eficient dels registres de pacients, cites i comunicacions en un entorn segur i fàcil d'utilitzar.

L'aplicació compta amb una interfície moderna i responsive, centrada en la usabilitat tant en dispositius d'escriptori com mòbils. Amb actualitzacions en temps real, vistes personalitzables i integració amb eines de comunicació, Sintesis_V2 agilitza el flux de treball diari dels professionals mèdics.

## Començar

### Prerequisits

Abans d'instal·lar Sintesis_V2, assegureu-vos de tenir el següent:

- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior)
- Un compte de Supabase i un projecte configurat
- Navegador web modern (Chrome, Firefox, Safari o Edge)

### Instal·lació

1. Clonar el repositori:
   ```bash
   git clone https://github.com/your-username/Sintesis_v2.git
   cd Sintesis_v2
   ```

2. Instal·lar dependències:
   ```bash
   npm install
   ```

3. Configurar variables d'entorn:
   - Crear un fitxer `.env` al directori arrel
   - Afegir les següents variables:
     ```
     REACT_APP_SUPABASE_URL=your_supabase_url
     REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Iniciar el servidor de desenvolupament:
   ```bash
   npm start
   ```

### Ús

Accediu a l'aplicació a través del vostre navegador a `http://localhost:3000`. 

#### Autenticació

- Utilitzeu la pantalla d'inici de sessió per accedir al vostre compte
- Els nous usuaris poden registrar-se mitjançant el formulari de registre
- La funcionalitat de restabliment de contrasenya està disponible si cal

#### Tauler de Control

El tauler proporciona una visió general de la vostra pràctica amb:

- Cites d'avui
- Interaccions recents amb pacients
- Esdeveniments propers
- Estadístiques i mètriques

#### Gestió de Pacients

- Visualitzar la llista completa de pacients
- Afegir nous pacients amb informació mèdica completa
- Cercar i filtrar pacients per diversos criteris
- Visualitzar perfils detallats de pacients amb historial mèdic

#### Programació de Cites

- Visualitzar cites en vista de calendari (diària, setmanal, mensual)
- Programar noves cites amb detecció de col·lisions
- Gestionar l'estat de les cites (confirmar, cancel·lar, reprogramar)
- Configurar cites de vídeo o trucada telefònica

### Proves

Executeu el conjunt de proves amb:

```bash
npm test
```

Per a proves end-to-end:

```bash
npm run test:e2e
```

## Característiques

- **Gestió de Registres de Pacients**: Perfils complets de pacients amb historial mèdic, informació de contacte i registres de visites.

- **Programació de Cites**: Interfície de calendari intuïtiva per programar i gestionar cites.

- **Analítiques del Tauler**: Representacions visuals de mètriques de pràctica i estadístiques de pacients.

- **Eines de Comunicació**: Sistema integrat de missatgeria i notificacions per a comunicacions amb pacients.

- **Disseny Responsive**: Optimitzat tant per a experiències d'escriptori com mòbils.

- **Tema Clar/Fosc**: Interfície personalitzable amb opcions de tema segons preferència de l'usuari.

- **Autenticació Segura**: Control d'accés basat en rols amb inici de sessió segur i gestió de sessions.

## Documentació Tècnica

### Documentació per a Desenvolupadors
1. [Documentació del Desenvolupador](docs/documentacion_desarrollador.md) - Guia completa per a desenvolupadors
2. [Guia d'Instal·lació](docs/guia-instalacio.md) - Instruccions pas a pas per a instal·lar i configurar el projecte
3. [Integració amb Supabase](docs/supabase-integration.md) - Detalls sobre la integració amb Supabase
4. [Esquema de Base de Dades](docs/database-schema.md) - Documentació detallada de l'esquema SQL

### Documentació per a Usuaris
1. [Manual d'Usuari](docs/manual_usuario.md) - Guia d'ús per a usuaris finals

### Tecnologies Utilitzades

Sintesis_v2 utilitza les següents tecnologies clau:

- **Frontend**: React
- **Backend**: Supabase (PostgreSQL)
- **Autenticació**: Sistema JWT de Supabase
- **Desplegament**: Netlify/Vercel

## Estructura del Projecte

L'aplicació està organitzada en els següents directoris clau:

```
src/
├── components/       # Components UI reutilitzables
│   ├── dashboard/    # Components específics del tauler
│   ├── layout/       # Components de disseny (capçalera, barra lateral, etc.)
│   └── shared/       # Components compartits utilitzats a tota l'app
├── context/          # Proveïdors de context de React
├── hooks/            # Hooks personalitzats de React
├── pages/            # Components de pàgina
├── services/         # Integracions d'API i serveis externs
├── styles/           # Fitxers CSS i d'estil
├── utils/            # Funcions d'utilitat
└── App.js            # Component principal de l'aplicació
```

## Organització del Codi

L'aplicació segueix aquests principis de codificació:

- **Arquitectura Basada en Components**: La UI es descompon en components reutilitzables
- **API de Context per a la Gestió d'Estat**: Estat global gestionat mitjançant React Context
- **Hooks Personalitzats**: Extracció de lògica en hooks reutilitzables
- **Capa de Serveis**: Interaccions amb l'API abstrets en mòduls de servei
- **Mòduls CSS**: Estils d'àmbit limitat per evitar conflictes

## Components UI

Els components UI clau inclouen:

- **AppointmentsTable**: Mostra les cites programades amb opcions de filtratge
- **Calendar**: Calendari interactiu per a la selecció de dates i visualització de cites
- **PatientAvatar**: Mostra la imatge o les inicials del pacient amb un estil consistent
- **StatisticsChart**: Visualitza mètriques de pràctica i dades de pacients
- **NotificationManager**: Gestiona notificacions i alertes del sistema

## Gestió d'Estat

L'aplicació utilitza l'API de Context de React per a la gestió d'estat a través dels següents contextos:

- **AuthContext**: Gestiona l'estat d'autenticació de l'usuari i els mètodes
- **ThemeContext**: Gestiona la preferència de tema (mode clar/fosc)
- **NotificationContext**: Gestiona les notificacions del sistema

## Integració API

Les interaccions amb l'API es gestionen a través de mòduls de servei que es comuniquen amb el backend de Supabase:

- **Serveis d'autenticació**: Inici de sessió d'usuari, registre i gestió de perfil
- **Serveis de pacients**: Operacions CRUD per a registres de pacients
- **Serveis de cites**: Programació i gestió de cites
- **Serveis d'estadístiques**: Agregació de dades i informes

## Temes

L'aplicació admet temes clars i foscos, amb una paleta de colors consistent:

- **Color Primari**: #5a4ff3 (lila)
- **Colors Secundaris**: Diversos colors complementaris per a indicadors d'estat
- **Tema Clar**: Fons blancs amb text fosc
- **Tema Fosc**: Fons foscos amb text clar

S'utilitzen variables CSS per a una tematització consistent en tots els components.

## Contribuir

Les contribucions són benvingudes! Si us plau, seguiu aquests passos:

1. Feu un fork del repositori
2. Creeu una branca de funcionalitat (`git checkout -b funcionalitat/funcionalitat-impressionant`)
3. Feu commit dels vostres canvis (`git commit -m 'Afegeix alguna funcionalitat impressionant'`)
4. Feu push a la branca (`git push origin funcionalitat/funcionalitat-impressionant`)
5. Obriu una Pull Request

Assegureu-vos que el vostre codi segueix els estàndards de codificació del projecte i inclou les proves adequades.

## Llicència

Aquest projecte està llicenciat sota la Llicència MIT - consulteu el fitxer [LICENSE](LICENSE) per a més detalls.

Per a una explicació detallada de la llicència en català, vegeu [Informació de Llicència](docs/llicencia.md).

