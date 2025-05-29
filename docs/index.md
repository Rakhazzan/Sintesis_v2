# Documentació Tècnica - Sintesis_v2

## Índex General

### Documentació per a Desenvolupadors
1. [Documentació del Desenvolupador](documentacion_desarrollador.md) - Guia completa per a desenvolupadors
2. [Integració amb Supabase](supabase-integration.md) - Detalls sobre la integració amb Supabase
3. [Esquema de Base de Dades](database-schema.md) - Documentació detallada de l'esquema SQL

### Documentació per a Usuaris
1. [Manual d'Usuari](manual_usuario.md) - Guia d'ús per a usuaris finals

## Resum de l'Aplicació

Sintesis_v2 és una aplicació de gestió de clínica mèdica que permet:

- Gestió de pacients
- Programació de cites
- Sistema de missatgeria interna
- Generació d'informes mèdics
- Estadístiques i visualització de dades

L'aplicació utilitza les següents tecnologies:

- **Frontend**: React
- **Backend**: Supabase (PostgreSQL)
- **Autenticació**: Sistema JWT de Supabase
- **Desplegament**: Netlify/Vercel

## Estructura del Projecte

```
Sintesis_v2/
├── backend/
│   ├── controllers/    # Controladors per a la lògica de negoci
│   ├── db/             # Scripts de base de dades
│   ├── routes/         # Definicions de rutes API
│   └── services/       # Serveis per a accés a dades
├── src/
│   ├── components/     # Components React reutilitzables
│   ├── pages/          # Pàgines principals de l'aplicació
│   ├── utils/          # Utilitats i funcions auxiliars
│   ├── styles/         # Fitxers CSS i estils
│   └── assets/         # Imatges i recursos estàtics
└── docs/               # Documentació tècnica i de l'usuari
```

## Com Utilitzar aquesta Documentació

- Els desenvolupadors haurien de començar amb la [Documentació del Desenvolupador](documentacion_desarrollador.md)
- Per a entendre la base de dades, consulteu l'[Esquema de Base de Dades](database-schema.md)
- Per a detalls sobre la integració amb Supabase, consulteu la [Integració amb Supabase](supabase-integration.md)
- Els usuaris finals haurien d'utilitzar el [Manual d'Usuari](manual_usuario.md)
