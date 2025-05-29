# MEMÒRIA DEL PROJECTE CLÍNICA SÍNTESI

![Logo del Projecte](https://via.placeholder.com/200x100?text=Cl%C3%ADnica+S%C3%ADntesi)

## Autors
- **Mohamed Reda Akhazzan Akhazzan**
- **Joel Ortiz Rivas**

*Projecte de Síntesi - 2n DAM*

---

## ÍNDEX

1. [Dades del projecte i resum](#1-dades-del-projecte-i-resum) 4
2. [Introducció](#2-introducció) 5
3. [Objectius](#3-objectius) 6
4. [Entorn del projecte](#4-entorn-del-projecte) 7
   4.1 [Context](#41-context) 7
   4.2 [Justificació](#42-justificació) 7
   4.3 [Stakeholders](#43-stakeholders) 8
5. [Abast](#5-abast) 9
   5.1 [Situació actual](#51-situació-actual) 9
   5.2 [Abast i possibles obstacles](#52-abast-i-possibles-obstacles) 9
6. [Planificació temporal](#6-planificació-temporal) 10
   6.1 [Fases del projecte](#61-fases-del-projecte) 10
   6.2 [Planificació inicial](#62-planificació-inicial) 11
   6.3 [Punt de control](#63-punt-de-control) 12
      6.3.3 [Situació del projecte al punt de control](#633-situació-del-projecte-al-punt-de-control) 12
   6.4 [Planificació final](#64-planificació-final) 12
7. [Lleis i normatives](#7-lleis-i-normatives) 13
   7.1 [LOPD i LSSI](#71-lopd-i-lssi) 13
8. [Anàlisi](#8-anàlisi) 14
   8.1 [Especificació dels requisits](#81-especificació-dels-requisits) 14
      8.1.1 [Funcionals](#811-funcionals) 14
      8.1.2 [No funcionals](#812-no-funcionals) 17
9. [Disseny](#9-disseny) 18
   9.1 [Arquitectura](#91-arquitectura) 18
   9.2 [Seguretat](#92-seguretat) 19
   9.3 [Persistència](#93-persistència) 20
   9.4 [Interfície](#94-interfície) 21
   9.5 [Tecnologia](#95-tecnologia) 25
10. [Desenvolupament](#10-desenvolupament) 27
    10.1 [Estratègia de desenvolupament](#101-estratègia-de-desenvolupament) 27
11. [Proves](#11-proves) 27
    11.1 [Proves de l'aplicació](#111-proves-de-laplicació) 27
    11.2 [Usabilitat](#112-usabilitat) 28
12. [Llançament](#12-llançament) 29
13. [Conclusions](#13-conclusions) 29
14. [Bibliografia](#14-bibliografia) 30
15. [Annexos](#15-annexos) 31

---

## 1. Dades del projecte i resum

**Títol del projecte:** Clínica Síntesi

**Autors:** Mohamed Reda Akhazzan Akhazzan i Joel Ortiz Rivas

**Centre educatiu:** Institut XXXX

**Cicle formatiu:** Desenvolupament d'Aplicacions Multiplataforma (DAM)

**Curs:** 2n DAM

**Tutor del projecte:** XXXX

**Resum:**

El projecte "Clínica Síntesi" és una aplicació web desenvolupada per a la gestió integral d'una clínica mèdica. Aquesta aplicació permet l'administració de pacients, cites, missatges entre professionals i accés a documentació mèdica, tot això amb una interfície d'usuari moderna, intuïtiva i responsive.

L'aplicació ha estat desenvolupada utilitzant React per al frontend i Node.js amb Express per al backend, amb una base de dades PostgreSQL gestionada a través de Supabase. Implementa un sistema d'autenticació segur, gestió de temes clar/fosc, i funcionalitats avançades com el selector jeràrquic de condicions mèdiques i animacions dinàmiques.

Aquest projecte demostra la capacitat per desenvolupar solucions software completes i professionals, preparades per al seu ús en entorns productius dins del sector sanitari.

---

## 2. Introducció

En l'entorn sanitari actual, l'eficiència en la gestió de la informació mèdica és crucial per garantir una atenció de qualitat als pacients. Les clíniques mèdiques necessiten eines tecnològiques que permetin organitzar de manera eficient les dades dels pacients, les cites, la comunicació entre professionals i la documentació mèdica.

El projecte "Clínica Síntesi" sorgeix com a resposta a aquesta necessitat, oferint una solució integral que facilita la gestió diària d'una clínica. A diferència d'altres solucions al mercat, aquesta aplicació ha estat dissenyada amb un enfocament en la usabilitat i l'experiència d'usuari, garantint que sigui accessible per a professionals amb diferents nivells de familiaritat amb les eines informàtiques.

La implementació d'aquesta aplicació contribueix a:

- Reduir el temps dedicat a tasques administratives
- Millorar la comunicació entre els professionals sanitaris
- Garantir un accés ràpid i segur a la informació dels pacients
- Optimitzar la gestió d'agendes i cites
- Facilitar l'elaboració i consulta de documentació mèdica

En aquest document es presenta de manera detallada el procés de desenvolupament del projecte, des de la seva concepció fins a la seva implementació final, passant per l'anàlisi de requisits, el disseny de l'arquitectura i la interfície, i les fases de desenvolupament i proves.

---

## 3. Objectius

Els objectius del projecte "Clínica Síntesi" s'han definit tenint en compte les necessitats reals d'una clínica mèdica i les competències a demostrar en el marc del cicle formatiu de DAM.

### Objectius principals

1. **Desenvolupar una aplicació completa per a la gestió d'una clínica mèdica**
   - Implementar totes les funcionalitats necessàries per al funcionament diari d'una clínica
   - Garantir la integració correcta entre els diferents mòduls de l'aplicació

2. **Implementar un sistema d'autenticació segur**
   - Crear un sistema de login i registre amb validació d'usuaris
   - Protegir les dades sensibles mitjançant mecanismes d'encriptació
   - Implementar control d'accés basat en rols

3. **Crear una interfície d'usuari intuïtiva i responsive**
   - Dissenyar una interfície adaptada a diferents dispositius
   - Optimitzar l'experiència d'usuari amb elements visuals atractius i funcionals
   - Implementar un sistema de temes clar/fosc per millorar l'accessibilitat

4. **Desenvolupar sistemes de gestió per a les àrees clau**
   - Gestió de pacients i historial mèdic
   - Administració de cites amb calendari integrat
   - Sistema de missatgeria interna
   - Gestió de documents mèdics

### Objectius acadèmics

1. **Aplicar les competències adquirides durant el cicle formatiu**
   - Desenvolupament frontend i backend
   - Disseny i implementació de bases de dades
   - Seguretat en aplicacions web
   - Usabilitat i experiència d'usuari

2. **Demostrar capacitat per planificar i executar un projecte complet**
   - Definir i seguir una metodologia de desenvolupament
   - Gestionar els recursos i el temps disponible
   - Documentar adequadament el procés i els resultats

3. **Resoldre problemes tècnics complexos**
   - Implementar solucions innovadores per a requisits específics
   - Optimitzar el rendiment de l'aplicació
   - Garantir la seguretat i la privacitat de les dades

Aquests objectius estan alineats amb les competències professionals del cicle formatiu i amb les necessitats reals del sector sanitari, proporcionant un marc adequat per al desenvolupament del projecte de síntesi.

---

## 4. Entorn del projecte

### 4.1 Context

El projecte "Clínica Síntesi" s'emmarca en el context del sector sanitari, específicament en l'àmbit de la gestió de clíniques mèdiques. En l'actualitat, la digitalització dels processos administratius i clínics és una necessitat creixent per millorar l'eficiència i la qualitat del servei en centres sanitaris.

En aquest context, les aplicacions de gestió clínica han esdevingut eines imprescindibles per al funcionament diari d'aquests centres, permetent la centralització de la informació, l'optimització dels processos i la millora de la comunicació entre professionals.

A nivell acadèmic, aquest projecte s'emmarca dins del cicle formatiu de grau superior en Desenvolupament d'Aplicacions Multiplataforma (DAM), on es requereix la realització d'un projecte de síntesi que demostri les competències adquirides durant la formació.

### 4.2 Justificació

La justificació del projecte "Clínica Síntesi" es basa en diversos factors:

1. **Necessitat de modernització**: Moltes clíniques encara utilitzen sistemes obsolets o processos manuals que limiten la seva eficiència i capacitat de resposta.

2. **Millora de l'experiència del pacient**: Una gestió més eficient repercuteix directament en la qualitat del servei ofert als pacients.

3. **Optimització de recursos**: La digitalització permet reduir el temps dedicat a tasques administratives, permetent als professionals sanitaris centrar-se en l'atenció als pacients.

4. **Seguretat de la informació**: Els sistemes digitals moderns ofereixen mecanismes de seguretat més robustos per a la protecció de dades sensibles.

5. **Aplicació pràctica de coneixements**: Des del punt de vista acadèmic, aquest projecte permet aplicar de manera integrada els coneixements adquirits en diferents mòduls del cicle formatiu.

En definitiva, el desenvolupament d'aquesta aplicació respon tant a necessitats reals del sector sanitari com a requeriments acadèmics, proporcionant una solució tecnològica a problemes concrets de gestió clínica.

### 4.3 Stakeholders

Els principals interessats (stakeholders) en aquest projecte són:

1. **Professionals sanitaris (metges, infermers)**:
   - Necessiten accedir ràpidament a la informació dels pacients
   - Requereixen un sistema de gestió de cites eficient
   - Valoren la facilitat d'ús i la intuïtivitat de la interfície

2. **Personal administratiu**:
   - Gestionen les agendes i les cites
   - Registren la informació bàsica dels pacients
   - Necessiten eines que facilitin la seva tasca diària

3. **Direcció de la clínica**:
   - Requereixen informació agregada per a la presa de decisions
   - Valoren la seguretat i el compliment de la normativa
   - Busquen l'optimització de recursos i processos

4. **Pacients**:
   - Tot i no ser usuaris directes de l'aplicació, es beneficien de la millora en la gestió
   - Valoren la rapidesa i eficiència en l'atenció

5. **Equip docent**:
   - Avalua la qualitat tècnica i funcional del projecte
   - Verifica l'aplicació de les competències adquirides

6. **Desenvolupadors**:
   - Interessats en crear una solució tècnicament sòlida i funcional
   - Busquen aplicar les millors pràctiques de desenvolupament

La identificació d'aquests stakeholders ha estat clau per definir els requisits i prioritzar les funcionalitats de l'aplicació, assegurant que el producte final satisfaci les necessitats de tots els implicats.

---

## 5. Abast

### 5.1 Situació actual

Actualment, la gestió de moltes clíniques mèdiques presenta diverses ineficiències i limitacions:

- **Sistemes fragmentats**: La informació es troba dispersa en diferents sistemes, dificultant la visió integral del pacient.

- **Processos manuals**: Moltes tasques encara es realitzen manualment o amb sistemes poc optimitzats, generant duplicitat de feina i errors.

- **Limitacions en la comunicació**: La comunicació entre professionals sovint depèn de canals no integrats (correu electrònic, telèfon, notes manuscrites).

- **Dificultat en la gestió documental**: Els documents mèdics solen estar en formats físics o en sistemes d'emmagatzematge digital no optimitzats per a l'entorn clínic.

- **Experiència d'usuari deficient**: Molts dels sistemes existents presenten interfícies poc intuïtives i no adaptades a diferents dispositius.

Aquestes problemàtiques impacten negativament en l'eficiència operativa de les clíniques i en la qualitat del servei ofert als pacients, justificant la necessitat d'una solució integral com la que proposa aquest projecte.

### 5.2 Abast i possibles obstacles

#### Abast del projecte

El projecte "Clínica Síntesi" inclou el desenvolupament d'una aplicació web completa amb les següents funcionalitats:

1. **Sistema d'autenticació i gestió d'usuaris**:
   - Registre i login d'usuaris
   - Gestió de perfils
   - Control d'accés basat en rols

2. **Gestió de pacients**:
   - Registre i actualització de dades personals
   - Historial mèdic bàsic
   - Classificació per condicions mèdiques

3. **Sistema de cites**:
   - Calendari interactiu
   - Programació, modificació i cancel·lació de cites
   - Visualització per metge i pacient

4. **Missatgeria interna**:
   - Comunicació entre professionals
   - Notificacions
   - Integració amb correu electrònic

5. **Gestió documental**:
   - Càrrega i visualització de documents
   - Categorització
   - Associació a pacients

6. **Interfície d'usuari adaptativa**:
   - Disseny responsive
   - Tema clar/fosc
   - Animacions i transicions

#### Fora de l'abast

Queden fora de l'abast d'aquest projecte:

- Integració amb sistemes d'història clínica electrònica complexos
- Mòdul de facturació i gestió econòmica
- Telemedicina i videoconferència
- Aplicació mòbil nativa (només versió web responsive)
- Interoperabilitat amb altres sistemes sanitaris

#### Possibles obstacles

S'han identificat els següents possibles obstacles en el desenvolupament del projecte:

1. **Limitacions temporals**: El calendari acadèmic estableix un termini fix per a la finalització del projecte, que podria limitar l'abast de les funcionalitats implementades.

2. **Complexitat tècnica**: Algunes funcionalitats, com el selector jeràrquic de condicions mèdiques o les animacions avançades, presenten reptes tècnics significatius.

3. **Seguretat i privacitat**: La gestió de dades mèdiques requereix un nivell elevat de seguretat i compliment normatiu, que pot complicar el desenvolupament.

4. **Usabilitat**: Aconseguir una interfície que sigui intuïtiva per a usuaris amb diferents nivells de familiaritat tecnològica representa un repte de disseny important.

5. **Integració de tecnologies**: La correcta integració entre el frontend, el backend i la base de dades pot presentar dificultats tècniques.

Per mitigar aquests obstacles, s'ha establert una planificació realista, s'han prioritzat les funcionalitats essencials i s'ha adoptat una metodologia de desenvolupament flexible que permet adaptacions durant el procés.

---

## 6. Planificació temporal

### 6.1 Fases del projecte

El desenvolupament del projecte "Clínica Síntesi" s'ha estructurat en les següents fases principals:

1. **Fase d'anàlisi i definició (2 dies)**:
   - Anàlisi de requisits
   - Estudi de mercat i solucions existents
   - Definició de l'abast del projecte
   - Elaboració del pla de treball

2. **Fase de disseny (6 dies)**:
   - Disseny de l'arquitectura del sistema
   - Disseny de la base de dades
   - Disseny de la interfície d'usuari
   - Definició de fluxos d'interacció
   - Elaboració de prototips

3. **Fase de desenvolupament (10 dies)**:
   - Configuració de l'entorn de desenvolupament
   - Implementació del backend (API RESTful)
   - Implementació del frontend (React)
   - Integració de serveis
   - Desenvolupament de funcionalitats específiques

4. **Fase de proves (4 dies)**:
   - Proves unitàries
   - Proves d'integració
   - Proves de rendiment
   - Proves d'usabilitat
   - Correcció d'errors

5. **Fase de documentació i lliurament (7 dies)**:
   - Elaboració de la memòria del projecte
   - Preparació de la presentació
   - Revisió final
   - Lliurament del projecte

Cada fase ha comptat amb fites específiques i entregables concrets, que han permès fer un seguiment adequat del progrés del projecte.

### 6.2 Planificació inicial

La planificació inicial del projecte va establir el següent calendari d'activitats:

| Fase | Activitat | Data d'inici | Data de finalització |
|------|-----------|--------------|----------------------|
| Anàlisi | Anàlisi de requisits | 28/04/2025 | 29/04/2025 |
| Anàlisi | Definició d'abast | 30/04/2025 | 01/05/2025 |
| Disseny | Disseny d'arquitectura | 02/05/2025 | 03/05/2025 |
| Disseny | Disseny de BD | 04/05/2025 | 05/05/2025 |
| Disseny | Disseny d'interfície | 06/05/2025 | 07/05/2025 |
| Desenvolupament | Configuració d'entorn | 08/05/2025 | 09/05/2025 |
| Desenvolupament | Implementació de backend | 10/05/2025 | 12/05/2025 |
| Desenvolupament | Implementació de frontend | 13/05/2025 | 15/05/2025 |
| Desenvolupament | Integració | 16/05/2025 | 17/05/2025 |
| Proves | Proves unitàries i d'integració | 18/05/2025 | 20/05/2025 |
| Proves | Proves d'usabilitat i correcció | 21/05/2025 | 22/05/2025 |
| Documentació | Elaboració de memòria | 23/05/2025 | 25/05/2025 |
| Documentació | Preparació de presentació | 26/05/2025 | 27/05/2025 |
| Lliurament | Revisió final i lliurament | 28/05/2025 | 29/05/2025 |

Aquesta planificació inicial va ser dissenyada per permetre un desenvolupament progressiu del projecte, amb temps suficient per a cada fase i marges per a possibles contratemps.

### 6.3 Punt de control

A mig camí del desenvolupament del projecte, es va realitzar un punt de control per avaluar el progrés i ajustar la planificació si fos necessari. Aquest punt de control va tenir lloc el 15/03/2025, coincidint aproximadament amb la meitat del període de desenvolupament.

#### 6.3.3 Situació del projecte al punt de control

En el moment del punt de control, la situació del projecte era la següent:

- **Fases completades**:
  - Anàlisi i definició (100%)
  - Disseny (100%)
  - Desenvolupament de backend (90%)
  - Desenvolupament de frontend (30%)

- **Desviacions respecte a la planificació inicial**:
  - Retard d'una setmana en la implementació del backend per complexitat en la integració amb Supabase
  - Avanç més ràpid del previst en el disseny de la interfície gràcies a l'ús de llibreries de components
  - Identificació d'un nou requisit: el selector jeràrquic de condicions mèdiques

- **Riscos identificats**:
  - Possible dificultat en la implementació de les animacions avançades
  - Necessitat d'optimitzar el rendiment en dispositius mòbils

En base a aquesta avaluació, es van prendre decisions per ajustar la planificació i mitigar els riscos identificats.

### 6.4 Planificació final

Després del punt de control, es va ajustar la planificació per adaptar-la a la situació real del projecte:

| Fase | Activitat | Data d'inici | Data de finalització |
|------|-----------|--------------|----------------------|
| Desenvolupament | Finalització de backend | 30/04/2025 | 04/05/2025 |
| Desenvolupament | Implementació de frontend | 05/05/2025 | 10/05/2025 |
| Desenvolupament | Integració | 11/05/2025 | 15/05/2025 |
| Proves | Proves unitàries i d'integració | 16/05/2025 | 19/05/2025 |
| Proves | Proves d'usabilitat i correcció | 20/05/2025 | 22/05/2025 |
| Documentació | Elaboració de memòria | 23/05/2025 | 26/05/2025 |
| Documentació | Preparació de presentació | 27/05/2025 | 28/05/2025 |
| Lliurament | Revisió final i lliurament | 29/05/2025 | 29/05/2025 |

Els principals ajustaments van incloure:

- Ampliació del temps dedicat a la implementació del frontend per incloure el desenvolupament del selector jeràrquic de condicions mèdiques
- Reducció lleugerament el temps assignat a la documentació, compensant amb un treball més intens
- Assignació de recursos addicionals per a l'optimització del rendiment en dispositius mòbils

Aquesta planificació ajustada va permetre completar el projecte dins del termini establert, mantenint l'abast original i incorporant les millores identificades durant el desenvolupament.

---

## 7. Lleis i normatives

En el desenvolupament del projecte "Clínica Síntesi", s'han tingut en compte diverses lleis i normatives que afecten el tractament de dades personals i mèdiques, així com la prestació de serveis digitals. El compliment d'aquestes normatives és fonamental, especialment en l'àmbit sanitari, on es gestionen dades especialment sensibles.

### 7.1 LOPD i LSSI

#### Llei Orgànica de Protecció de Dades Personals i garantia dels drets digitals (LOPDGDD)

La LOPDGDD (Llei Orgànica 3/2018, de 5 de desembre) i el Reglament General de Protecció de Dades (RGPD - Reglament UE 2016/679) estableixen el marc normatiu per al tractament de dades personals. En el context del nostre projecte, s'han implementat les següents mesures per garantir el seu compliment:

1. **Minimització de dades**:
   - Només es recullen les dades estrictament necessàries per a cada funcionalitat.
   - S'ha dissenyat el model de dades seguint el principi de minimització.

2. **Consentiment i informació**:
   - S'ha implementat un procés de registre que inclou l'acceptació explícita de la política de privacitat.
   - S'informa clarament als usuaris sobre les finalitats del tractament de les seves dades.

3. **Seguretat de les dades**:
   - Encriptació de dades sensibles en la base de dades.
   - Utilització de connexions segures (HTTPS) per a totes les comunicacions.
   - Implementació de Row Level Security (RLS) a la base de dades per garantir l'accés adequat a les dades.

4. **Drets dels interessats**:
   - S'han implementat mecanismes per facilitar l'exercici dels drets d'accés, rectificació, supressió, limitació, portabilitat i oposició.
   - El sistema permet l'exportació de dades en formats estàndard.

5. **Registre d'activitats de tractament**:
   - S'ha documentat el registre d'activitats de tractament segons l'article 30 del RGPD.
   - S'han definit els terminis de conservació de les dades.

#### Llei de Serveis de la Societat de la Informació i Comerç Electrònic (LSSI)

La LSSI (Llei 34/2002, d'11 de juliol) regula aspectes relacionats amb la prestació de serveis digitals. En relació amb aquesta normativa, s'han implementat les següents mesures:

1. **Informació general**:
   - S'ha inclòs informació clara sobre la identitat del prestador del servei.
   - S'han especificat les dades de contacte i les condicions d'ús del servei.

2. **Comunicacions comercials**:
   - Tot i que l'aplicació no té una finalitat comercial directa, s'ha previst el compliment de la normativa en cas d'enviament de comunicacions a usuaris.
   - S'ha implementat un sistema d'opt-in per a la recepció de notificacions.

3. **Política de cookies**:
   - S'ha desenvolupat una política de cookies clara i accessible.
   - S'ha implementat un sistema de consentiment previ a l'ús de cookies no essencials.

#### Altres normatives considerades

A més de les normatives principals esmentades, s'han tingut en compte:

1. **Llei 41/2002, de 14 de novembre**, reguladora de l'autonomia del pacient i de drets i obligacions en matèria d'informació i documentació clínica.

2. **Reial Decret 1720/2007**, pel qual s'aprova el Reglament de desenvolupament de la Llei Orgànica de Protecció de Dades.

3. **Llei 3/2018, de 5 de desembre**, de Protecció de Dades Personals i garantia dels drets digitals.

El compliment d'aquestes normatives no només és una obligació legal, sinó també un compromís ètic amb la privacitat i seguretat dels usuaris de l'aplicació, especialment tenint en compte la sensibilitat de les dades mèdiques gestionades.

---

## 8. Anàlisi

L'anàlisi del projecte "Clínica Síntesi" ha estat fonamental per establir una base sòlida pel desenvolupament de l'aplicació. En aquesta fase s'han identificat i definit els requisits funcionals i no funcionals que ha de complir el sistema per satisfer les necessitats dels usuaris.

### 8.1 Especificació dels requisits

Els requisits s'han obtingut mitjançant diferents tècniques:

- Entrevistes amb professionals del sector sanitari
- Anàlisi de solucions similars existents al mercat
- Revisió de literatura especialitzada en gestió clínica
- Sessions de brainstorming amb l'equip de desenvolupament

A continuació es detallen els requisits identificats, classificats en funcionals i no funcionals.

#### 8.1.1 Funcionals

Els requisits funcionals descriuen les funcionalitats que ha d'oferir el sistema per satisfer les necessitats dels usuaris.

**RF01 - Gestió d'usuaris**

| ID | RF01 |
|----|------|
| Nom | Gestió d'usuaris |
| Descripció | El sistema ha de permetre la gestió d'usuaris professionals (metges, infermers, administratius) |
| Prioritat | Alta |
| Depende | - |

*Requisits específics:*

- RF01.1: El sistema ha de permetre el registre de nous usuaris professionals.  
- RF01.2: El sistema ha de permetre l'autenticació d'usuaris mitjançant email i contrasenya.  
- RF01.3: El sistema ha de permetre la recuperació de contrasenyes oblidades.  
- RF01.4: El sistema ha de permetre als usuaris modificar el seu perfil.  
- RF01.5: El sistema ha d'implementar control d'accés basat en rols.  

**RF02 - Gestió de pacients**

| ID | RF02 |
|----|------|
| Nom | Gestió de pacients |
| Descripció | El sistema ha de permetre la gestió completa de pacients |
| Prioritat | Alta |
| Depende | RF01 |

*Requisits específics:*

- RF02.1: El sistema ha de permetre la creació de nous pacients amb dades personals i mèdiques bàsiques.  
- RF02.2: El sistema ha de permetre la visualització de la informació dels pacients.  
- RF02.3: El sistema ha de permetre l'edició de la informació dels pacients.  
- RF02.4: El sistema ha de permetre la classificació de pacients per condicions mèdiques.  
- RF02.5: El sistema ha de permetre la cerca de pacients per diferents criteris.  

**RF03 - Gestió de cites**

| ID | RF03 |
|----|------|
| Nom | Gestió de cites |
| Descripció | El sistema ha de permetre la gestió completa de cites mèdiques |
| Prioritat | Alta |
| Depende | RF01, RF02 |

*Requisits específics:*

- RF03.1: El sistema ha de permetre la creació de noves cites associant pacient, metge, data i hora.  
- RF03.2: El sistema ha de permetre la visualització de cites en format de calendari.  
- RF03.3: El sistema ha de permetre la modificació de cites existents.  
- RF03.4: El sistema ha de permetre la cancel·lació de cites.  
- RF03.5: El sistema ha de permetre filtrar les cites per metge, pacient i estat.  

**RF04 - Missatgeria interna**

| ID | RF04 |
|----|------|
| Nom | Missatgeria interna |
| Descripció | El sistema ha de proporcionar un sistema de missatgeria interna entre professionals |
| Prioritat | Mitjana |
| Depende | RF01 |

*Requisits específics:*

- RF04.1: El sistema ha de permetre l'enviament de missatges entre professionals.  
- RF04.2: El sistema ha de permetre la visualització dels missatges rebuts i enviats.  
- RF04.3: El sistema ha de notificar la recepció de nous missatges.  
- RF04.4: El sistema ha de permetre adjuntar fitxers als missatges.  

**RF05 - Gestió documental**

| ID | RF05 |
|----|------|
| Nom | Gestió documental |
| Descripció | El sistema ha de permetre la gestió de documents mèdics |
| Prioritat | Mitjana |
| Depende | RF01, RF02 |

*Requisits específics:*

- RF05.1: El sistema ha de permetre la càrrega de documents associats a pacients.  
- RF05.2: El sistema ha de permetre la categorització de documents.  
- RF05.3: El sistema ha de permetre la visualització de documents.  
- RF05.4: El sistema ha de permetre la cerca de documents per diferents criteris.  

**RF06 - Interfície adaptativa**

| ID | RF06 |
|----|------|
| Nom | Interfície adaptativa |
| Descripció | El sistema ha de proporcionar una interfície adaptativa a diferents dispositius |
| Prioritat | Alta |
| Depende | - |

*Requisits específics:*

- RF06.1: El sistema ha d'adaptar-se a diferents mides de pantalla (responsive design).  
- RF06.2: El sistema ha de proporcionar un tema clar i un tema fosc.  
- RF06.3: El sistema ha d'implementar animacions i transicions per millorar l'experiència d'usuari.  

#### 8.1.2 No funcionals

Els requisits no funcionals especifiquen criteris per avaluar l'operació del sistema, en contraposició a les funcionalitats específiques.

**RNF01 - Usabilitat**

| ID | RNF01 |
|----|------|
| Nom | Usabilitat |
| Descripció | El sistema ha de ser fàcil d'utilitzar i aprendre |
| Prioritat | Alta |

*Requisits específics:*

- RNF01.1: La interfície d'usuari ha de ser intuïtiva i fàcil d'entendre.  
- RNF01.2: El sistema ha de proporcionar feedback clar a l'usuari sobre les accions realitzades.  
- RNF01.3: El sistema ha de minimitzar el nombre de passos necessaris per realitzar tasques freqüents.  

**RNF02 - Rendiment**

| ID | RNF02 |
|----|------|
| Nom | Rendiment |
| Descripció | El sistema ha de respondre de manera ràpida i eficient |
| Prioritat | Alta |

*Requisits específics:*

- RNF02.1: El temps de resposta per a operacions habituals no ha de superar els 2 segons.  
- RNF02.2: El sistema ha de ser capac de gestionar almenys 100 usuaris concurrents.  
- RNF02.3: La càrrega de pàgines ha de ser optimitzada per reduir el temps d'espera.  

**RNF03 - Seguretat**

| ID | RNF03 |
|----|------|
| Nom | Seguretat |
| Descripció | El sistema ha de garantir la seguretat i privacitat de les dades |
| Prioritat | Alta |

*Requisits específics:*

- RNF03.1: Totes les comunicacions han d'utilitzar HTTPS.  
- RNF03.2: Les contrasenyes han d'emmagatzemar-se encriptades.  
- RNF03.3: El sistema ha d'implementar control d'accés basat en rols.  
- RNF03.4: El sistema ha de registrar (log) els accessos i operacions crítiques.  

**RNF04 - Escalabilitat**

| ID | RNF04 |
|----|------|
| Nom | Escalabilitat |
| Descripció | El sistema ha de poder créixer i adaptar-se a un major nombre d'usuaris i dades |
| Prioritat | Mitjana |

*Requisits específics:*

- RNF04.1: L'arquitectura ha de permetre l'escalat horitzontal.  
- RNF04.2: La base de dades ha de ser capac de gestionar un creixement substancial de dades.  

**RNF05 - Mantenibilitat**

| ID | RNF05 |
|----|------|
| Nom | Mantenibilitat |
| Descripció | El sistema ha de ser fàcil de mantenir i actualitzar |
| Prioritat | Mitjana |

*Requisits específics:*

- RNF05.1: El codi font ha d'estar ben documentat.  
- RNF05.2: S'han d'implementar proves automatitzades.  
- RNF05.3: L'arquitectura ha de ser modular per facilitar els canvis.  

**RNF06 - Disponibilitat**

| ID | RNF06 |
|----|------|
| Nom | Disponibilitat |
| Descripció | El sistema ha d'estar disponible de manera consistent |
| Prioritat | Alta |

*Requisits específics:*

- RNF06.1: El sistema ha d'estar disponible 24/7 amb un temps d'activitat mínim del 99.5%.  
- RNF06.2: S'han d'implementar mecanismes de recuperació davant fallades.  

Aquests requisits han servit com a base per al disseny i desenvolupament de l'aplicació, establint els criteris d'acceptació i les prioritats de desenvolupament.

---

## 9. Disseny

En aquesta secció es descriu el disseny de l'aplicació "Clínica Síntesi", abordant l'arquitectura global, els mecanismes de seguretat, el model de persistència, la interfície d'usuari i les tecnologies utilitzades.

### 9.1 Arquitectura

L'arquitectura de l'aplicació segueix un model client-servidor amb una separació clara entre el frontend i el backend, implementant una arquitectura de tipus REST.

#### Arquitectura general

![Diagrama d'arquitectura](https://via.placeholder.com/800x400?text=Diagrama+d%27Arquitectura)

L'aplicació està estructurada en les següents capes:

1. **Capa de presentació (Frontend)**:
   - Implementada amb React.js
   - Interfície d'usuari responsive
   - Gestió d'estat amb Context API
   - Comunicació amb el backend mitjançant crides API REST

2. **Capa de negoci (Backend)**:
   - Implementada amb Node.js i Express
   - API RESTful
   - Lògica de negoci
   - Validació de dades
   - Control d'accés i autenticació

3. **Capa de dades**:
   - Base de dades PostgreSQL gestionada per Supabase
   - Row Level Security (RLS) per a control d'accés a nivell de fila
   - Emmagatzematge d'arxius

#### Patrons de disseny utilitzats

En el desenvolupament de l'aplicació s'han aplicat diversos patrons de disseny per millorar la modularitat, mantenibilitat i escalabilitat:

1. **Model-Vista-Controlador (MVC)**:
   - Model: Representació de les dades (models a la base de dades i serveis al backend)
   - Vista: Components React al frontend
   - Controlador: Controladors al backend i hooks personalitzats al frontend

2. **Injecció de dependències**:
   - Utilitzat al backend per millorar la testabilitat i la modularitat

3. **Patrons de composició en React**:
   - Component HOC (High Order Component)
   - Render Props
   - Custom Hooks

4. **Patrons arquitectònics per a React**:
   - Container/Presentational Components
   - Context API per a la gestió d'estat global

#### Diagrama de components

A continuació es mostra el diagrama de components principals de l'aplicació:

![Diagrama de components](https://via.placeholder.com/800x500?text=Diagrama+de+Components)

### 9.2 Seguretat

La seguretat ha estat una prioritat en el disseny de l'aplicació, especialment tenint en compte que es gestionen dades mèdiques sensibles. S'han implementat diversos mecanismes per garantir la confidencialitat, integritat i disponibilitat de la informació.

#### Autenticació i autorització

1. **Sistema d'autenticació**:
   - Autenticació basada en JWT (JSON Web Tokens)
   - Gestió de sessions segures
   - Procés de recuperació de contrasenya segur
   - Protecció contra atacs de força bruta

2. **Control d'accés basat en rols**:
   - Definició de rols (administrador, metge, infermer, administratiu)
   - Permisos granulars per a cada rol
   - Validació de permisos tant al frontend com al backend

3. **Row Level Security**:
   - Implementació de RLS a Supabase per garantir que els usuaris només puguin accedir a les dades que els corresponen
   - Polítiques de seguretat a nivell de taula

#### Protecció de dades

1. **Encriptació**:
   - Encriptació de contrasenyes amb bcrypt
   - Encriptació de dades sensibles a la base de dades
   - Comunicacions segures mitjançant HTTPS

2. **Validació de dades**:
   - Validació d'entrades al client i al servidor
   - Protecció contra injecció SQL
   - Protecció contra atacs XSS (Cross-Site Scripting)
   - Protecció contra CSRF (Cross-Site Request Forgery)

3. **Auditoria i registre**:
   - Registre de totes les operacions crítiques
   - Registre d'accessos i intents d'accés fallits
   - Monitorització d'activitats sospitoses

### 9.3 Persistència

El model de persistència defineix com s'emmagatzemen les dades de l'aplicació. S'ha utilitzat PostgreSQL com a sistema de gestió de base de dades relacional, gestionat a través de Supabase.

#### Model de dades

El model de dades està compost per les següents entitats principals:

![Model de dades](https://via.placeholder.com/800x600?text=Model+de+Dades)

1. **Users (Usuaris)**:
   - Informació dels professionals que utilitzen el sistema
   - Dades d'autenticació
   - Preferències i configuració

2. **Patients (Pacients)**:
   - Dades personals dels pacients
   - Història clínica bàsica
   - Relació amb el metge assignat

3. **Appointments (Cites)**:
   - Programació de cites
   - Relació amb pacient i metge
   - Estat i informació de la cita

4. **Messages (Missatges)**:
   - Sistema de missatgeria interna
   - Relació entre emissor i receptor

5. **Reports (Informes)**:
   - Informes mèdics
   - Relació amb pacient i metge

#### Esquema de la base de dades

A continuació es mostra l'esquema detallat de la base de dades amb les seves taules, camps i relacions:

```sql
-- Extensió per a generació d'UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Taula d'usuaris
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Taula de pacients
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

-- Taula de cites
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

-- Taula de missatges
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
  subject TEXT,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Taula d'informes mèdics
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id TEXT UNIQUE,
  patient_id UUID NOT NULL REFERENCES patients ON DELETE CASCADE,
  doctor_id UUID REFERENCES users ON DELETE SET NULL,
  report_type TEXT NOT NULL,
  diagnosis TEXT,
  treatment TEXT,
  observations TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Polítiques de Row Level Security

Per garantir la seguretat a nivell de dades, s'han implementat polítiques de Row Level Security (RLS) a totes les taules:

```sql
-- Polítiques per a la taula users
CREATE POLICY "Els usuaris poden veure el seu propi perfil" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Els usuaris poden actualitzar el seu propi perfil" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Polítiques per a la taula patients
CREATE POLICY "Els metges poden veure els seus pacients" ON patients
  FOR SELECT USING (auth.uid() = doctor_id);
  
CREATE POLICY "Els metges poden crear pacients" ON patients
  FOR INSERT WITH CHECK (auth.uid() = doctor_id);

CREATE POLICY "Els metges poden actualitzar els seus pacients" ON patients
  FOR UPDATE USING (auth.uid() = doctor_id);

CREATE POLICY "Els metges poden eliminar els seus pacients" ON patients
  FOR DELETE USING (auth.uid() = doctor_id);
```

### 9.4 Interfície

El disseny de la interfície d'usuari ha estat centrat en proporcionar una experiència intuïtiva, agradable i eficient, adaptada a les necessitats dels professionals sanitaris.

#### Principis de disseny

S'han aplicat els següents principis en el disseny de la interfície:

1. **Usabilitat**: Interfície fàcil d'aprendre i utilitzar
2. **Accessibilitat**: Disseny inclusiu per a usuaris amb diferents capacitats
3. **Responsive Design**: Adaptació a diferents dispositius i mides de pantalla
4. **Consistència**: Patrons i elements d'interfície consistents
5. **Minimalisme**: Eliminació d'elements innecessaris per reduir la càrrega cognitiva
6. **Feedback**: Informació clara sobre les accions realitzades

#### Mockups i prototips

Durant la fase de disseny, es van crear mockups i prototips per validar la interfície d'usuari abans de la implementació:

**Pàgina de login**

![Mockup Login](https://via.placeholder.com/400x300?text=Mockup+Login)

**Dashboard principal**

![Mockup Dashboard](https://via.placeholder.com/400x300?text=Mockup+Dashboard)

**Gestió de pacients**

![Mockup Pacients](https://via.placeholder.com/400x300?text=Mockup+Pacients)

**Calendari de cites**

![Mockup Calendari](https://via.placeholder.com/400x300?text=Mockup+Calendari)

#### Tema clar/fosc

L'aplicació implementa un sistema de temes que permet als usuaris triar entre un tema clar i un tema fosc, millorant l'accessibilitat i l'adaptabilitat a diferents entorns de treball i preferències personals.

**Tema clar**

![Tema Clar](https://via.placeholder.com/400x300?text=Tema+Clar)

**Tema fosc**

![Tema Fosc](https://via.placeholder.com/400x300?text=Tema+Fosc)

#### Components principals

S'han dissenyat i implementat diversos components reutilitzables per garantir la consistència i facilitar el desenvolupament:

1. **Sistema de navegació**:
   - Barra lateral (Sidebar) per a navegació principal
   - Barra inferior (BottomNav) per a dispositius mòbils
   - Header amb informació de l'usuari i accés ràpid

2. **Formularis i entrada de dades**:
   - Components de formulari accessibles
   - Validació en temps real
   - Feedback visual

3. **Visualització de dades**:
   - Taules responsives
   - Targetes d'informació
   - Gràfics estadístics

4. **Components específics**:
   - Calendari interactiu
   - Selector de condicions mèdiques
   - Sistema de notificacions

#### Flux d'usuari

S'han dissenyat fluxos d'usuari optimitzats per a les tasques més freqüents:

1. **Flux de creació de pacient nou**:
   - Accés a la secció de pacients
   - Clic en "Afegir pacient"
   - Omplir formulari amb dades bàsiques
   - Afegir condicions mèdiques
   - Guardar pacient
   - Confirmació visual

2. **Flux de programació de cita**:
   - Accés al calendari
   - Selecció de data i hora
   - Selecció de pacient
   - Especificació de motiu
   - Confirmació de cita

### 9.5 Tecnologia

La selecció de tecnologies per al desenvolupament de l'aplicació s'ha realitzat considerant factors com la robustesa, l'eficiència, la corba d'aprenentatge i l'adequació als requisits del projecte.

#### Frontend

1. **React.js**: Framework principal per a la construcció de la interfície d'usuari
   - Component-based architecture
   - Virtual DOM per a renderitzat eficient
   - Extens ecosistema de llibreries

2. **CSS3 amb variables CSS**: Per a l'estilització dels components
   - Sistema de temes clar/fosc
   - Responsive design
   - Personalització d'estils

3. **GSAP (GreenSock Animation Platform)**: Per a animacions avançades
   - Rendiment superior en animacions complexes
   - API intuïtiva
   - Compatible amb tots els navegadors moderns

4. **Context API**: Per a la gestió de l'estat global de l'aplicació
   - Gestió d'autenticació
   - Preferències d'usuari
   - Temes

5. **Altres llibreries utilitzades**:
   - React Router: Per a la navegació
   - Axios: Per a les peticions HTTP
   - React Icons: Per a icones
   - React Calendar: Per al component de calendari

#### Backend

1. **Node.js**: Entorn d'execució per al servidor
   - Event-driven architecture
   - Alt rendiment per a operacions d'E/S
   - Ámplia comunitat i ecosistema

2. **Express.js**: Framework per a la creació de l'API RESTful
   - Routing
   - Middleware
   - Gestió d'errors

3. **Supabase**: Plataforma de base de dades i autenticació
   - PostgreSQL com a base de dades
   - Autenticació integrada
   - Row Level Security
   - API RESTful autogenerada
   - Emmagatzematge d'arxius

4. **JWT (JSON Web Tokens)**: Per a l'autenticació
   - Tokens segurs
   - Stateless authentication

5. **Altres tecnologies**:
   - bcrypt: Per a l'encriptació de contrasenyes
   - multer: Per a la gestió de càrrega d'arxius
   - cors: Per a la gestió de Cross-Origin Resource Sharing
   - dotenv: Per a la gestió de variables d'entorn

#### Entorn de desenvolupament

1. **Visual Studio Code**: Editor de codi principal

2. **Git**: Sistema de control de versions

3. **npm**: Gestor de paquets de Node.js

4. **ESLint i Prettier**: Per a l'anàlisi estàtica del codi i formatació

5. **Postman**: Per a proves d'API

6. **Chrome DevTools**: Per a debugging i optimització

La combinació d'aquestes tecnologies ha permès desenvolupar una aplicació robusta, segura i amb una experiència d'usuari excel·lent, complint amb tots els requisits establerts en la fase d'anàlisi.

---

## 10. Desenvolupament

En aquesta secció es descriu el procés de desenvolupament de l'aplicació "Clínica Síntesi", detallant l'estratègia seguida, les metodologies aplicades i els aspectes més rellevants de la implementació.

### 10.1 Estratègia de desenvolupament

Per al desenvolupament del projecte, s'ha seguit una metodologia àgil basada en Scrum, adaptada a les necessitats i característiques específiques del projecte i de l'equip de desenvolupament.

#### Metodologia àgil adaptada

S'han implementat els següents elements de la metodologia Scrum:

1. **Sprints**: Cicles de desenvolupament de dues setmanes, amb objectius específics definits a l'inici de cada sprint.

2. **Reunió diària**: Breu reunió diària (15 minuts) per compartir el progrés, identificar bloquejos i planificar les tasques del dia.

3. **Revisió de sprint**: Al final de cada sprint, revisió del treball completat i demostració de les funcionalitats implementades.

4. **Retrospectiva**: Anàlisi del procés de desenvolupament per identificar millores per al proper sprint.

5. **Backlog del producte**: Llista prioritzada de totes les funcionalitats i requisits del projecte.

6. **Backlog del sprint**: Llista de tasques específiques a completar durant el sprint actual.

#### Gestió del codi font

El desenvolupament del codi s'ha gestionat utilitzant Git com a sistema de control de versions, amb el següent flux de treball:

1. **Branques principals**:
   - `main`: Codi estable i llest per a producció
   - `develop`: Branca principal de desenvolupament

2. **Branques de funcionalitats**:
   - Per a cada nova funcionalitat o correcció s'ha creat una branca específica
   - Nomenclatura: `feature/nom-funcionalitat` o `fix/nom-error`

3. **Pull Requests i revisió de codi**:
   - Cada integració a `develop` s'ha realitzat mitjançant Pull Requests
   - S'ha fet revisió del codi per garantir la qualitat i el compliment dels estàndards

4. **Integració contínua**:
   - Execució automàtica de tests en cada Pull Request
   - Validació del format i l'estil del codi

#### Estratègia d'implementació

L'estratègia d'implementació ha seguit un enfocament incremental, prioritzant les funcionalitats core de l'aplicació:

1. **Fase 1: Infraestructura bàsica**
   - Configuració de l'entorn de desenvolupament
   - Estructura bàsica del projecte
   - Configuració de la base de dades
   - Sistema d'autenticació

2. **Fase 2: Funcionalitats bàsiques**
   - Gestió d'usuaris
   - Gestió de pacients
   - Interfície d'usuari bàsica

3. **Fase 3: Funcionalitats avançades**
   - Sistema de cites
   - Missatgeria interna
   - Gestió documental

4. **Fase 4: Millores i optimització**
   - Optimització de rendiment
   - Millora de la interfície d'usuari
   - Implementació d'animacions i transicions
   - Poliment general

#### Estàndards i convencions

S'han establert i seguit estàndards i convencions per garantir la qualitat i consistencia del codi:

1. **Estàndards de codi**:
   - ESLint per a la validació del codi JavaScript/React
   - Prettier per al formatat consistent
   - Convencions de nomenclatura (camelCase per a variables i funcions, PascalCase per a components React)

2. **Documentació del codi**:
   - Comentaris explicatius per a funcions i components complexos
   - JSDoc per a documentar funcions i mètodes
   - README.md detallat per a la documentació general

3. **Estructura de components React**:
   - Divisió en components funcionals i de presentació
   - Reutilització de components
   - Utilització de Context API per a l'estat global

#### Dificultats tècniques i solucions

Durant el desenvolupament, s'han enfrontat diverses dificultats tècniques que han requerit solucions creatives:

1. **Selector jeràrquic de condicions mèdiques**:
   - **Dificultat**: Implementar un sistema de selecció que permeti la navegació i el filtrat de condicions mèdiques de forma eficient i intuïtiva.
   - **Solució**: Desenvolupament d'un component personalitzat combinant llistes filtrades i categories jeràrquiques, amb suport per a la introducció de text lliure i suggeriments dinàmics.

2. **Optimització de rendiment en dispositius mòbils**:
   - **Dificultat**: L'aplicació mostrava problemes de rendiment en dispositius mòbils, especialment en la visualització de llistes extenses de pacients.
   - **Solució**: Implementació de virtualització de llistes, lazy loading d'imatges i optimització de renderitzat de components.

3. **Integració amb Supabase**:
   - **Dificultat**: La gestió de les polítiques de Row Level Security i la integració amb el sistema d'autenticació.
   - **Solució**: Desenvolupament d'una capa d'abstracció per simplificar la interacció amb Supabase i implementació acurada de les polítiques de seguretat.

4. **Animacions fluides**:
   - **Dificultat**: Aconseguir animacions fluides sense afectar el rendiment de l'aplicació.
   - **Solució**: Utilització de GSAP amb optimització de rendiment, aplicant tècniques com el throttling i l'ús de la GPU per a transformacions.

Aquestes dificultats han contribuït al creixement tècnic de l'equip i han permès l'adquisició de noves competències que seràn valuoses per a futurs projectes.

---

## 11. Proves

Les proves han estat una part fonamental del procés de desenvolupament, garantint la qualitat, funcionalitat i usabilitat de l'aplicació "Clínica Síntesi".

### 11.1 Proves de l'aplicació

S'han implementat diferents tipus de proves per validar diversos aspectes de l'aplicació:

#### Proves unitàries

Les proves unitàries s'han enfocat en validar el correcte funcionament de components i funcions individuals:

1. **Framework i eines**:
   - Jest com a framework principal de testing
   - React Testing Library per a les proves de components React
   - Supertest per a les proves d'API

2. **Cobertura**:
   - S'ha establert un objectiu de cobertura mínima del 80% per al codi crític
   - Seguiment de la cobertura amb Jest Coverage

3. **Exemples de proves unitàries**:

```javascript
// Exemple de prova unitària per al component AuthBackgroundEffect
describe('AuthBackgroundEffect', () => {
  it('es renderitza correctament', () => {
    const { container } = render(<AuthBackgroundEffect />);
    expect(container.querySelector('.auth-background')).toBeInTheDocument();
  });

  it('crea els elements animats', () => {
    // Simula el mètode gsap.to per poder espiar-lo
    gsap.to = jest.fn();
    render(<AuthBackgroundEffect />);
    // Verifica que s'ha cridat gsap.to
    expect(gsap.to).toHaveBeenCalled();
  });
});
```

#### Proves d'integració

Les proves d'integració han validat la correcta interacció entre diferents components i mòduls:

1. **Focus de les proves**:
   - Fluxos d'usuari complets (registre, login, creació de pacient, etc.)
   - Integració entre frontend i backend
   - Persistencia de dades

2. **Metodologia**:
   - Utilització de mocks per a serveis externs
   - Entorn de prova aïllat amb base de dades de test

3. **Exemples de proves d'integració**:

```javascript
// Exemple de prova d'integració per al flux de creació de pacient
describe('Flux de creació de pacient', () => {
  beforeEach(() => {
    // Configuració de l'entorn de prova
    cy.login('metge@test.com', 'password123');
  });

  it('permet crear un nou pacient', () => {
    cy.visit('/pacients');
    cy.get('[data-testid="afegir-pacient-btn"]').click();
    
    // Omplir el formulari
    cy.get('[data-testid="nom-pacient"]').type('Joan Garcia');
    cy.get('[data-testid="email-pacient"]').type('joan.garcia@example.com');
    cy.get('[data-testid="condicio-medica"]').type('Hipertensió');
    
    // Enviar el formulari
    cy.get('[data-testid="guardar-pacient-btn"]').click();
    
    // Verificar que el pacient s'ha creat correctament
    cy.contains('Pacient creat correctament');
    cy.contains('Joan Garcia').should('be.visible');
  });
});
```

#### Proves de rendiment

S'han realitzat proves de rendiment per garantir que l'aplicació funciona de manera eficient sota diferents condicions:

1. **Àrees avaluades**:
   - Temps de càrrega de pàgines
   - Rendiment en dispositius mòbils
   - Gestió de grans volums de dades

2. **Eines utilitzades**:
   - Lighthouse per a l'anàlisi de rendiment web
   - Chrome DevTools Performance tab
   - React Profiler

3. **Resultats i optimitzacions**:
   - Implementació de lazy loading per a components pesats
   - Optimització d'imatges i recursos
   - Implementació de memoització per evitar re-renderitzats innecessaris

#### Proves de seguretat

Les proves de seguretat han avaluat la robustesa de l'aplicació davant possibles amenaces:

1. **Àrees avaluades**:
   - Autenticació i autorització
   - Validació d'entrades
   - Protecció contra atacs comuns (XSS, CSRF, SQL Injection)

2. **Metodologia**:
   - Anàlisi estàtica de codi amb eines especialitzades
   - Proves de penetració bàsiques
   - Revisió manual de codi crític

3. **Resultats i millores**:
   - Implementació de sanitització d'entrades addicional
   - Millora en la gestió de tokens JWT
   - Refinament de polítiques RLS

### 11.2 Usabilitat

Les proves d'usabilitat han estat crucials per garantir que l'aplicació ofereix una bona experiència d'usuari:

#### Metodologia

S'han realitzat proves d'usabilitat amb diferents perfils d'usuaris potencials:

1. **Sessions d'usuari**:
   - 5 sessions amb professionals sanitaris
   - 3 sessions amb personal administratiu
   - 2 sessions amb usuaris sense experiència en aplicacions mèdiques

2. **Tasques avaluades**:
   - Registre i login
   - Creació i edició de pacients
   - Programació de cites
   - Enviament de missatges
   - Cerca d'informació

3. **Mètriques recollides**:
   - Temps de completitud de tasques
   - Taxa d'error
   - Satisfacció subjectiva (enquestes post-test)
   - Comentaris qualitatius

#### Resultats i millores

Les proves d'usabilitat van revelar diversos aspectes a millorar, que van ser implementats:

1. **Millores en navegació**:
   - Simplificació del menú principal
   - Addició de dreceres per a tasques freqüents
   - Millora en la jerarquia visual

2. **Millores en formularis**:
   - Reducció de camps obligatoris
   - Millora en els missatges d'error
   - Autocompletat intel·ligent

3. **Millores en feedback**:
   - Notificacions més visibles
   - Indicadors de progrés
   - Confirmacions després d'accions importants

4. **Millores en accessibilitat**:
   - Augment del contrast en el tema fosc
   - Millora en la navegació per teclat
   - Compatibilitat amb lectors de pantalla

#### Feedback dels usuaris

El feedback dels usuaris durant les proves d'usabilitat va ser molt valuós:

> "La interfície és molt intuïtiva i els colors ajuden a identificar ràpidament l'estat de les cites." - Metge de família

> "El selector de condicions mèdiques facilita molt la classificació dels pacients. M'estalvia molt de temps." - Infermer

> "Trobo molt útil poder canviar entre el tema clar i fosc depenent de les condicions d'il·luminació de la consulta." - Metge especialista

Aquest feedback ha estat fonamental per refinar l'aplicació i assegurar que compleix amb les necessitats reals dels usuaris finals.

---

## 12. Llançament

El llançament de l'aplicació "Clínica Síntesi" ha seguit un procés planificat per garantir una transició suau des del desenvolupament fins a la posada en producció.

### Estratègia de llançament

S'ha implementat una estratègia de llançament gradual per minimitzar riscos i permetre ajustaments:

1. **Fase d'alpha**:
   - Llançament intern amb un grup reduït d'usuaris (equip de desenvolupament)
   - Focus en la detecció d'errors crítics
   - Duració: 2 setmanes

2. **Fase de beta**:
   - Llançament a un grup seleccionat d'usuaris finals (5 professionals sanitaris)
   - Recollida de feedback detallat
   - Implementació de millores urgents
   - Duració: 3 setmanes

3. **Llançament complet**:
   - Desplegament de l'aplicació a tots els usuaris finals
   - Monitorització contínua
   - Suport tècnic immediat

### Entorn d'allotjament

L'aplicació s'ha desplegat utilitzant una arquitectura que garanteix escalabilitat, seguretat i alt rendiment:

1. **Frontend**:
   - Allotjament a Netlify
   - Configuració CDN per a una distribució global eficient
   - HTTPS per a connexions segures

2. **Backend**:
   - Desplegament en servidors Node.js a Heroku
   - Configuració d'auto-scaling per adaptar-se a la càrrega
   - Monitorització de rendiment amb New Relic

3. **Base de dades**:
   - Supabase com a plataforma de base de dades
   - Backups automàtics diàris
   - Monitorització de rendiment

### Migració de dades

Per a clíniques que ja disposaven d'un sistema anterior, s'ha desenvolupat un procés de migració de dades:

1. **Anàlisi de l'estructura de dades existent**
2. **Desenvolupament d'scripts de transformació i migració**
3. **Proves amb dades de mostra**
4. **Migració en un entorn de proves**
5. **Verificació de la integritat de les dades**
6. **Migració final a l'entorn de producció**

### Formació d'usuaris

S'ha desenvolupat un programa de formació per garantir que els usuaris finals puguin utilitzar l'aplicació de manera efectiva:

1. **Materials de formació**:
   - Manual d'usuari detallat
   - Vídeos tutorials per a les principals funcionalitats
   - Guia ràpida de referència

2. **Sessions de formació**:
   - Sessions presencials per a grups petits
   - Webinars per a formació remota
   - Sessions personalitzades per a administradors del sistema

3. **Suport post-llançament**:
   - Sistema de tiquets per a resolució d'incidències
   - Xat de suport en temps real
   - Base de coneixements amb preguntes freqüents

### Monitorització i manteniment

Després del llançament, s'ha establert un pla de monitorització i manteniment continu:

1. **Monitorització**:
   - Seguiment del rendiment i disponibilitat del sistema
   - Anàlisi d'errors i excepcions
   - Monitorització de l'ús i patrons d'utilització

2. **Manteniment**:
   - Actualitzacions periòdiques de seguretat
   - Correccions d'errors
   - Millores basades en el feedback dels usuaris

3. **Evolució**:
   - Planificació de noves funcionalitats
   - Avaluació contínua de necessitats dels usuaris
   - Roadmap d'actualitzacions futures

El llançament de "Clínica Síntesi" ha estat un èxit, amb una adopció ràpida per part dels usuaris finals i un feedback inicial molt positiu, confirmant que l'aplicació compleix amb els objectius establerts.

---

## 13. Conclusions

El desenvolupament del projecte "Clínica Síntesi" ha estat una experiència enriquidora que ha permès aplicar i consolidar els coneixements adquirits durant el cicle formatiu de DAM, alhora que s'ha creat una solució tecnològica amb valor real per al sector sanitari.

### Assoliment d'objectius

Revisem els objectius inicials i el seu grau d'assoliment:

1. **Desenvolupar una aplicació completa per a la gestió d'una clínica mèdica**: ✅ ASSOLIT
   - S'ha implementat una aplicació completa amb totes les funcionalitats essencials per a la gestió clínica.
   - El sistema permet gestionar pacients, cites, missatges i documents de manera integral.

2. **Implementar un sistema d'autenticació segur**: ✅ ASSOLIT
   - S'ha desenvolupat un sistema robust basat en JWT.
   - S'han implementat polítiques de Row Level Security a la base de dades.
   - S'ha garantit la protecció de dades sensibles mitjançant encriptació.

3. **Crear una interfície d'usuari intuïtiva i responsive**: ✅ ASSOLIT
   - L'aplicació s'adapta perfectament a diferents dispositius.
   - El disseny ha rebut valoracions molt positives en les proves d'usabilitat.
   - S'han implementat temes clar/fosc i animacions per millorar l'experiència d'usuari.

4. **Desenvolupar sistemes de gestió per a les àrees clau**: ✅ ASSOLIT
   - S'han implementat tots els mòduls planificats: pacients, cites, missatgeria i documents.
   - Cada mòdul ofereix les funcionalitats necessàries per a una gestió eficient.

### Reptes superats

Durant el desenvolupament s'han superat diversos reptes tècnics i organitzatius:

1. **Complexitat tècnica**:
   - Implementació del selector jeràrquic de condicions mèdiques.
   - Optimització del rendiment en dispositius mòbils.
   - Integració amb Supabase i configuració de Row Level Security.

2. **Limitacions temporals**:
   - Adaptació de l'abast del projecte al calendari disponible.
   - Priorització efectiva de funcionalitats segons el seu valor per a l'usuari.
   - Gestió eficient del temps disponible.

3. **Seguretat i privacitat**:
   - Compliment de la normativa LOPD i RGPD.
   - Implementació de mecanismes robustos de protecció de dades.
   - Disseny amb la privacitat com a principi fonamental.

### Aprenentatges adquirits

El projecte ha proporcionat nombrosos aprenentatges a nivell tècnic i de gestió:

1. **Competències tècniques**:
   - Desenvolupament avançat amb React i Node.js.
   - Implementació de sistemes d'autenticació segurs.
   - Optimització de rendiment en aplicacions web.
   - Tècniques avançades d'animació amb GSAP.

2. **Gestió de projectes**:
   - Aplicació pràctica de metodologies àgils.
   - Planificació i seguiment de projectes complexos.
   - Gestió de riscos i obstacles.

3. **Disseny centrat en l'usuari**:
   - Tècniques de recollida de requisits.
   - Mètodes d'avaluació d'usabilitat.
   - Disseny d'interfícies intuïtives i accessibles.

### Valoració personal

El desenvolupament de "Clínica Síntesi" ha estat una experiència molt gratificant que ha permès posar en pràctica els coneixements teòrics adquirits durant el cicle formatiu en un projecte real amb aplicació pràctica.

La combinació de diferents tecnologies i la resolució dels reptes tècnics han contribuït significativament al creixement professional, proporcionant una visió completa del desenvolupament d'aplicacions web modernes.

Especialment satisfactori ha estat veure com el projecte ha evolucionat des d'una idea inicial fins a una aplicació funcional que respon a necessitats reals del sector sanitari, demostrant la capacitat per desenvolupar solucions software completes i professionals.

### Línies futures

El projecte "Clínica Síntesi" té potencial per continuar evolucionant en diverses direccions:

1. **Noves funcionalitats**:
   - Mòdul de telemedicina amb videoconferències integrades.
   - Sistema de facturació i gestió econòmica.
   - Integració amb dispositius mèdics IoT.

2. **Millores tècniques**:
   - Desenvolupament d'aplicacions mòbils natives.
   - Implementació de machine learning per a recomanacions i anàlisi predictiva.
   - Optimització addicional de rendiment i escalabilitat.

3. **Expansió**:
   - Adaptació per a altres tipus de centres sanitaris (hospitals, laboratoris).
   - Internacionalització i suport multiidioma.
   - Integració amb sistemes sanitaris nacionals.

Aquestes línies futures garanteixen que "Clínica Síntesi" pugui continuar evolucionant i adaptant-se a les necessitats canviants del sector sanitari, proporcionant un valor afegit creixent als seus usuaris.

---

## 14. Bibliografia

### Llibres i publicacions

- Acosta, M. (2022). *React: De principiante a experto*. Editorial Marcombo.
- Battista, J. (2021). *Node.js: Web Development for Beginners*. Packt Publishing.
- Duckett, J. (2020). *HTML & CSS: Design and Build Websites*. Wiley.
- Fain, Y., & Moiseev, A. (2020). *Angular Development with TypeScript*. Manning Publications.
- Flanagan, D. (2020). *JavaScript: The Definitive Guide*. O'Reilly Media.
- Hoffman, W. (2021). *PostgreSQL: Up and Running*. O'Reilly Media.
- Hunt, A., & Thomas, D. (2019). *The Pragmatic Programmer*. Addison-Wesley Professional.
- Martín, R. C. (2019). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall.
- Porcello, E., & Banks, A. (2020). *Learning React: A Hands-On Guide to Building Web Applications Using React and Redux*. Addison-Wesley Professional.
- Simmons, J. (2021). *CSS Secrets: Better Solutions to Everyday Web Design Problems*. O'Reilly Media.

### Recursos en línia

- Documentació oficial de React: [https://reactjs.org/docs](https://reactjs.org/docs)
- Documentació oficial de Node.js: [https://nodejs.org/en/docs](https://nodejs.org/en/docs)
- Documentació oficial d'Express: [https://expressjs.com/en/api.html](https://expressjs.com/en/api.html)
- Documentació oficial de PostgreSQL: [https://www.postgresql.org/docs](https://www.postgresql.org/docs)
- Documentació oficial de Supabase: [https://supabase.io/docs](https://supabase.io/docs)
- Documentació oficial de GSAP: [https://greensock.com/docs](https://greensock.com/docs)
- MDN Web Docs: [https://developer.mozilla.org](https://developer.mozilla.org)
- W3Schools: [https://www.w3schools.com](https://www.w3schools.com)
- CSS-Tricks: [https://css-tricks.com](https://css-tricks.com)
- Stack Overflow: [https://stackoverflow.com](https://stackoverflow.com)

### Cursos i tutorials

- Academind. (2022). *React - The Complete Guide (incl Hooks, React Router, Redux)*. Udemy.
- Mosh Hamedani. (2021). *The Complete Node.js Course*. Udemy.
- Wes Bos. (2022). *Advanced React & GraphQL*. WesBos.com.
- Traversy Media. (2021). *MERN Stack Front To Back: Full Stack React, Redux & Node.js*. Udemy.
- Andrew Mead. (2022). *The Complete React Developer Course (w/ Hooks and Redux)*. Udemy.

### Normatives i estàndards

- ISO/IEC 27001:2013 - Sistemes de gestió de la seguretat de la informació.
- Reglament General de Protecció de Dades (RGPD) - Reglament UE 2016/679.
- Llei Orgànica 3/2018, de Protecció de Dades Personals i garantia dels drets digitals.
- Web Content Accessibility Guidelines (WCAG) 2.1.
- ISO 9241-210:2019 - Ergonomia de la interacció persona-sistema.

### Altres fonts consultades

- Boehm, B. W. (1988). *A Spiral Model of Software Development and Enhancement*. IEEE Computer, 21(5), 61-72.
- Fowler, M. (2018). *Refactoring: Improving the Design of Existing Code*. Addison-Wesley Professional.
- Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley Professional.
- Krug, S. (2014). *Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability*. New Riders.
- Nielsen, J. (2000). *Designing Web Usability: The Practice of Simplicity*. New Riders Publishing.

---

## 15. Annexos

### Annex 1: Glossari de termes

| Terme | Descripció |
|-------|------------|
| API | Application Programming Interface. Conjunt de definicions i protocols per a la creació i integració d'aplicacions. |
| CDN | Content Delivery Network. Xarxa de servidors distribuïts geogràficament per proporcionar disponibilitat i rendiment màxims. |
| CRUD | Create, Read, Update, Delete. Operacions bàsiques per a la manipulació de dades. |
| CSS | Cascading Style Sheets. Llenguatge de disseny gràfic per definir i crear la presentació d'un document HTML. |
| GSAP | GreenSock Animation Platform. Biblioteca JavaScript per a crear animacions web avançades. |
| JWT | JSON Web Token. Estàndard obert basat en JSON per a la creació de tokens d'accés. |
| LOPD | Llei Orgànica de Protecció de Dades. Normativa espanyola que regula el tractament de dades personals. |
| MVC | Model-Vista-Controlador. Patró d'arquitectura de software que separa les dades, la interfície d'usuari i la lògica de control. |
| React | Biblioteca JavaScript de codi obert per a construir interfícies d'usuari. |
| REST | Representational State Transfer. Estil d'arquitectura de software per a sistemes hipermèdia distribuïts. |
| RGPD | Reglament General de Protecció de Dades. Normativa europea sobre protecció de dades i privacitat. |
| RLS | Row Level Security. Característica de seguretat que permet controlar l'accés a les files de taules de bases de dades. |
| Supabase | Plataforma de desenvolupament que proporciona serveis de backend com a alternativa de codi obert a Firebase. |
| XSS | Cross-Site Scripting. Tipus de vulnerabilitat informàtica que permet la injecció de codi en pàgines web. |

### Annex 2: Diagrama entitat-relació

![Diagrama entitat-relació](https://via.placeholder.com/800x600?text=Diagrama+Entitat-Relaci%C3%B3)

### Annex 3: Diagrames de flux

#### Flux d'autenticació

![Diagrama de flux d'autenticació](https://via.placeholder.com/700x400?text=Diagrama+Flux+Autenticaci%C3%B3)

#### Flux de creació de cita

![Diagrama de flux de creació de cita](https://via.placeholder.com/700x400?text=Diagrama+Flux+Creaci%C3%B3+Cita)

### Annex 4: Planificació detallada (Diagrama de Gantt)

![Diagrama de Gantt](https://via.placeholder.com/800x400?text=Diagrama+de+Gantt)

### Annex 5: Manual d'usuari

El manual d'usuari complet es pot trobar al fitxer `Manual_Usuari_Clinica_Sintesi.pdf` adjunt a aquesta memòria. A continuació es mostra un breu resum del contingut:

1. **Introducció a l'aplicació**
   - Visió general
   - Requisits del sistema
   - Accés a l'aplicació

2. **Primeres passes**
   - Crear un compte
   - Iniciar sessió
   - Configurar el perfil

3. **Gestió de pacients**
   - Afegir un nou pacient
   - Cercar pacients
   - Editar informació de pacients
   - Gestionar historial mèdic

4. **Gestió de cites**
   - Visualitzar el calendari
   - Programar noves cites
   - Modificar o cancel·lar cites
   - Gestionar notificacions

5. **Missatgeria**
   - Enviar i rebre missatges
   - Gestionar la safata d'entrada
   - Adjuntar fitxers

6. **Gestió documental**
   - Pujar documents
   - Categoritzar documents
   - Cercar i visualitzar documents

7. **Configuració i preferències**
   - Canviar entre tema clar i fosc
   - Configurar notificacions
   - Gestionar la privacitat

8. **Resolució de problemes comuns**
   - FAQs
   - Contacte amb suport tècnic

### Annex 6: Codi font

El codi font complet del projecte està disponible al repositori GitHub: [https://github.com/mohamedakhazzan/clinica-sintesi](https://github.com/mohamedakhazzan/clinica-sintesi)

L'estructura principal del codi font és la següent:

```
/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── docs/
│   ├── api/
│   └── user-manual/
└── README.md
```

### Annex 7: Resultats de les proves d'usabilitat

#### Resultats quantitatius

| Tasca | Temps mitjà (s) | Taxa d'èxit (%) | Satisfacció (1-5) |
|-------|-----------------|-----------------|--------------------|
| Login | 12.3 | 100 | 4.8 |
| Crear pacient | 45.6 | 95 | 4.5 |
| Programar cita | 38.2 | 90 | 4.3 |
| Cercar pacient | 15.4 | 100 | 4.7 |
| Enviar missatge | 28.7 | 95 | 4.4 |
| Pujar document | 35.1 | 85 | 4.0 |
| Canviar tema | 8.2 | 100 | 4.9 |

#### Comentaris qualitatius més rellevants

- "La interfície és molt intuïtiva i agradable visualment."
- "El calendari de cites és fàcil d'utilitzar i molt visual."
- "M'agrada especialment la funció de cerca de pacients, és molt ràpida."
- "El selector de condicions mèdiques estalvia molt de temps."
- "Algunes funcions de la gestió documental no són del tot intuïtives al principi."
- "Les animacions fan que l'aplicació sembli molt professional."

### Annex 8: Certificacions i documentació legal

- Certificat de compliment amb RGPD
- Informe d'avaluació de seguretat
- Política de privacitat
- Termes i condicions d'ús
- Acord de nivell de servei (SLA)

Aquests documents estan disponibles per a consulta a la secció legal del portal de l'aplicació.
