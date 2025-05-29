# Manual d'Usuari - Sintesis_v2

## Índex
1. [Introducció](#introducció)
2. [Primers Passos](#primers-passos)
3. [Interfície d'Usuari](#interfície-dusuari)
4. [Gestió de Pacients](#gestió-de-pacients)
5. [Agenda de Cites](#agenda-de-cites)
6. [Sistema de Missatgeria](#sistema-de-missatgeria)
7. [Generació de Documents](#generació-de-documents)
8. [Estadístiques i Informes](#estadístiques-i-informes)
9. [Configuració de Perfil](#configuració-de-perfil)
10. [Preguntes Freqüents](#preguntes-freqüents)
11. [Solució de Problemes](#solució-de-problemes)

---

## Introducció

Benvingut a **Sintesis_v2**, la solució integral per a la gestió de la vostra consulta mèdica. Aquesta aplicació ha estat dissenyada específicament per a professionals de la salut amb l'objectiu de simplificar l'administració diària de pacients, cites, documentació mèdica i comunicacions.

### Característiques Principals

- **Gestió completa de pacients** amb historial mèdic
- **Agenda intel·ligent** per a programació de cites
- **Sistema de missatgeria** intern amb notificacions
- **Generació de documents mèdics** amb format professional
- **Estadístiques i informes** per a anàlisi d'activitat
- **Interfície adaptativa** per a dispositius mòbils i escriptori

---

## Primers Passos

### Requisits del Sistema

- Navegador web actualitzat (Chrome, Firefox, Edge o Safari)
- Connexió a internet estable
- Resolució de pantalla mínima recomanada: 1280x720

### Accés al Sistema

1. Obriu el vostre navegador i entreu a l'adreça proporcionada pel vostre administrador
2. A la pantalla d'inici de sessió, introduïu les vostres credencials:
   - Correu electrònic
   - Contrasenya
3. Feu clic a "Iniciar Sessió"

![Pantalla d'inici de sessió](./img/login_screen.png)

### Recuperació de Contrasenya

Si heu oblidat la vostra contrasenya:

1. A la pantalla d'inici de sessió, feu clic a "Heu oblidat la contrasenya?"
2. Introduïu el vostre correu electrònic
3. Rebreu un enllaç per restablir la vostra contrasenya
4. Seguiu les instruccions al correu electrònic

---

## Interfície d'Usuari

La interfície de Sintesis_v2 s'adapta automàticament al dispositiu que esteu utilitzant.

### Versió Escriptori

![Interfície d'escriptori](./img/desktop_interface.png)

1. **Barra lateral (Sidebar)**: Accés a totes les seccions principals
2. **Capçalera (Header)**: Mostra informació de l'usuari, cerca i notificacions
3. **Àrea principal**: Mostra el contingut de la secció seleccionada
4. **Panell d'informació**: Mostra dades rellevants segons el context

### Versió Mòbil

![Interfície mòbil](./img/mobile_interface.png)

1. **Capçalera**: Mostra el títol de la secció i menú desplegable
2. **Àrea principal**: Contingut adaptat a pantalla mòbil
3. **Barra de navegació inferior**: Accés a les seccions principals

### Navegació

- **Escriptori**: Utilitzeu la barra lateral per navegar entre seccions
- **Mòbil**: Utilitzeu la barra inferior per accedir a les seccions principals
- En ambdues versions, podeu fer servir el botó de retrocedir del navegador per tornar a la pantalla anterior

---

## Gestió de Pacients

Aquesta secció us permet administrar tota la informació relacionada amb els vostres pacients.

### Llista de Pacients

![Llista de pacients](./img/patient_list.png)

- Veure tots els vostres pacients en una llista organitzada
- Cercar pacients per nom, email o número de telèfon
- Filtrar per estat (actiu, inactiu)
- Ordenar per diferents criteris (nom, data, etc.)

### Crear Nou Pacient

1. Feu clic al botó "+ Nou Pacient"
2. Completeu el formulari amb les dades del pacient:
   - Informació personal (nom, data de naixement, gènere)
   - Informació de contacte (telèfon, email, adreça)
   - Informació mèdica rellevant (al·lèrgies, medicació actual)
3. Feu clic a "Desar" per crear el registre

### Veure i Editar Pacient

1. Feu clic al nom del pacient a la llista
2. Es mostrarà la fitxa completa del pacient
3. Per editar la informació, feu clic a "Editar"
4. Modifiqueu els camps necessaris
5. Feu clic a "Desar Canvis"

### Historial Mèdic

Dins de la fitxa de cada pacient:

1. Navegueu a la pestanya "Historial"
2. Podreu veure totes les cites prèvies, diagnòstics i tractaments
3. Per afegir una nova entrada, feu clic a "+ Nova Entrada"

---

## Agenda de Cites

El sistema d'agenda us permet gestionar eficientment el vostre temps i les cites dels vostres pacients.

### Vista de Calendari

![Calendari de cites](./img/appointments_calendar.png)

- Vista mensual, setmanal o diària
- Cites codificades per colors segons el seu estat
- Vista ràpida d'informació en passar el cursor sobre cada cita

### Programar Nova Cita

1. Feu clic a la data i hora desitjada al calendari, o al botó "+ Nova Cita"
2. Completeu el formulari de cita:
   - Seleccioneu el pacient
   - Establiu data i hora
   - Seleccioneu durada
   - Afegiu motiu de la consulta
   - Establiu estat inicial (confirmada, pendent)
3. Feu clic a "Desar Cita"

### Gestionar Cites Existents

Per a cada cita podeu:

- **Veure detalls**: Feu clic sobre la cita al calendari
- **Editar**: Feu clic a "Editar" dins dels detalls de la cita
- **Cancel·lar**: Canvieu l'estat a "Cancel·lada" i afegiu un motiu opcional
- **Completar**: Un cop finalitzada, canvieu l'estat a "Completada" i afegiu notes

### Recordatoris i Notificacions

El sistema enviarà automàticament:

- Recordatori al pacient 24 hores abans de la cita
- Notificació al professional 15 minuts abans de cada cita
- Alerta de disponibilitat quan es sol·licitin noves cites

---

## Sistema de Missatgeria

La funció de missatgeria us permet comunicar-vos de forma segura amb pacients i altres professionals.

### Safata d'Entrada

![Safata de missatges](./img/messages_inbox.png)

- Veure tots els missatges rebuts
- Missatges no llegits destacats visualment
- Filtrar per tipus (interns, externs)
- Cercar per remitent o contingut

### Enviar Nou Missatge

1. Feu clic a "+ Nou Missatge"
2. Seleccioneu el destinatari:
   - Per a pacients: seleccioneu de la llista desplegable
   - Per a altres professionals: seleccioneu del directori
3. Escriviu l'assumpte i el contingut del missatge
4. Si cal, adjunteu arxius (fins a 5MB per arxiu)
5. Feu clic a "Enviar"

> **Nota**: Els destinataris seleccionats apareixeran amb un fons blau fosc i un ✓, mentre que els no seleccionats tindran un fons gris clar per a major contrast visual.

### Respondre i Reenviar

Per a cada missatge rebut:

- **Respondre**: Feu clic a "Respondre" per enviar un missatge només al remitent
- **Respondre a tots**: Respon a tots els destinataris originals
- **Reenviar**: Envia el missatge a nous destinataris

---

## Generació de Documents

Aquesta funcionalitat us permet crear informes mèdics professionals per als vostres pacients.

### Tipus de Documents Disponibles

- Informes de consulta
- Certificats mèdics
- Receptes mèdiques
- Sol·licituds de proves
- Informes personalitzats

### Crear Nou Document

![Generador de documents](./img/document_generator.png)

1. Navegueu a la secció "Documents"
2. Seleccioneu el tipus de document
3. Seleccioneu el pacient de la llista desplegable
4. Completeu el formulari amb la informació requerida segons el tipus de document:
   - Diagnòstic
   - Tractament
   - Observacions
   - Durada (si s'escau)
5. Visualitzeu la vista prèvia en temps real
6. Feu clic a "Generar PDF"

### Format d'Identificació de Documents

Cada document generat rep un identificador únic amb el format:

`INFMED-[timestamp]-[inicials del pacient]-[codi aleatori]-[data].pdf`

Per exemple: `INFMED-202505291023-MRA-X7Y9Z-20250529.pdf`

Això garanteix que cada document sigui únic i fàcilment identificable.

### Gestió de Documents

Tots els documents generats s'emmagatzemen al sistema i poden ser:

- Descarregats novament
- Enviats per correu electrònic al pacient
- Impresos directament
- Arxivats a l'historial del pacient

---

## Estadístiques i Informes

La secció d'estadístiques us proporciona informació valuosa sobre l'activitat de la vostra consulta.

### Panell d'Estadístiques

![Panell d'estadístiques](./img/statistics_dashboard.png)

- **Cites per període**: Anàlisi de cites per setmana, mes o any
- **Pacients actius**: Evolució del nombre de pacients
- **Diagnòstics freqüents**: Gràfic de diagnòstics més comuns
- **Ocupació**: Percentatge d'hores ocupades vs disponibles

### Filtres i Personalització

Podeu personalitzar la visualització d'estadístiques:

1. Seleccioneu el període (dia, setmana, mes, any)
2. Filtreu per tipus de cita
3. Seleccioneu categories específiques per analitzar
4. Canvieu entre diferents tipus de gràfics

### Exportar Informes

Per desar o compartir els informes:

1. Configureu l'informe segons les vostres necessitats
2. Feu clic a "Exportar"
3. Seleccioneu el format (PDF, Excel, CSV)
4. Descarregueu l'arxiu o envieu-lo per correu electrònic

---

## Configuració de Perfil

### Editar Perfil

1. **En dispositius d'escriptori**: Feu clic al botó "Configuració" a la barra lateral
2. **En dispositius mòbils**: Feu clic al vostre avatar a la capçalera i seleccioneu "Editar Perfil"
3. Modifiqueu la informació necessària:
   - Dades personals
   - Informació professional
   - Foto de perfil
   - Preferències de notificacions
4. Feu clic a "Desar" per aplicar els canvis

### Canviar Contrasenya

1. A la pantalla d'edició de perfil, feu clic a "Canviar Contrasenya"
2. Introduïu la vostra contrasenya actual
3. Introduïu la nova contrasenya dues vegades
4. Feu clic a "Actualitzar Contrasenya"

### Preferències de Notificacions

Configureu com voleu rebre notificacions:

- Correu electrònic
- Notificacions a l'aplicació
- Recordatoris de cites
- Freqüència de resums

---

## Preguntes Freqüents

### Com puc programar cites recurrents?

En crear una nova cita, activeu l'opció "Cita recurrent" i configureu la freqüència (setmanal, quinzenal, mensual) i el nombre de repeticions.

### Puc accedir al sistema des del meu telèfon mòbil?

Sí, l'aplicació està dissenyada per funcionar en qualsevol dispositiu amb un navegador web actualitzat, incloent telèfons mòbils i tablets.

### Com puc exportar la informació d'un pacient?

A la fitxa del pacient, feu clic al botó "Exportar" i seleccioneu el format desitjat (PDF o CSV).

### És segura la informació dels meus pacients?

Sí, totes les dades s'emmagatzemen de forma encriptada i l'accés està protegit per autenticació segura. Complim amb totes les normatives de protecció de dades.

### Puc personalitzar els formats dels documents?

Actualment, els formats estan predefinits per garantir la consistència professional, però podeu afegir el vostre logotip i dades de contacte des de la secció de configuració.

---

## Solució de Problemes

### No puc iniciar sessió

- Verifiqueu que esteu introduïnt el correu electrònic i contrasenya correctes
- Comproveu que el blocador de majúscules està desactivat
- Si persisteix el problema, utilitzeu la funció "Heu oblidat la contrasenya?"

### L'aplicació es carrega lentament

- Verifiqueu la vostra connexió a internet
- Tanqueu altres aplicacions o pestanyes que consumeixin molts recursos
- Esborreu la memòria cau del navegador

### No puc generar un document PDF

- Assegureu-vos d'haver completat tots els camps obligatoris
- Verifiqueu que el vostre navegador no està bloquejant finestres emergents
- Si el problema persisteix, proveu d'utilitzar un altre navegador

### Les notificacions no funcionen

- Verifiqueu la configuració de notificacions al vostre perfil
- Comproveu que el vostre navegador permet notificacions de l'aplicació
- Assegureu-vos que el vostre correu electrònic és correcte

---

Si encuentra algún problema que no está descrito en esta sección, por favor contacte con soporte técnico a través del formulario de contacto o enviando un correo electrónico a soporte@sintesis-app.com.

---

© 2025 Sintesis_v2 - Manual de Usuario
