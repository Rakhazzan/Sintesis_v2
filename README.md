# SINTESIS_V2

Empowering healthcare through seamless communication and management.

![last commit](https://img.shields.io/badge/last%20commit-today-brightgreen) ![javascript](https://img.shields.io/badge/javascript-74.1%25-blue) ![languages](https://img.shields.io/badge/languages-4-blueviolet)

Built with the tools and technologies:

![Express](https://img.shields.io/badge/-Express-black?style=flat-square&logo=express) ![JSON](https://img.shields.io/badge/-JSON-black?style=flat-square&logo=json) ![Markdown](https://img.shields.io/badge/-Markdown-black?style=flat-square&logo=markdown) ![npm](https://img.shields.io/badge/-npm-black?style=flat-square&logo=npm) ![ENV](https://img.shields.io/badge/-.ENV-black?style=flat-square&logo=.env)

![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript) ![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react) ![Axios](https://img.shields.io/badge/-Axios-black?style=flat-square&logo=axios) ![datefns](https://img.shields.io/badge/-datefns-black?style=flat-square&logo=datefns) ![Buffer](https://img.shields.io/badge/-Buffer-black?style=flat-square&logo=buffer)

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
- [Features](#features)
- [Technical Documentation](#technical-documentation)
- [Project Structure](#project-structure)
- [Code Organization](#code-organization)
- [UI Components](#ui-components)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Themes](#themes)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Sintesis_V2 is a comprehensive patient management application designed for healthcare professionals. This platform enables efficient management of patient records, appointments, and communications in a secure and user-friendly environment.

The application features a modern, responsive interface with a focus on usability across both desktop and mobile devices. With real-time updates, customizable views, and integration with communication tools, Sintesis_V2 streamlines the daily workflow of medical professionals.

## Getting Started

### Prerequisites

Before installing Sintesis_V2, ensure you have the following:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- A Supabase account and project set up
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Sintesis_v2.git
   cd Sintesis_v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     REACT_APP_SUPABASE_URL=your_supabase_url
     REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Start the development server:
   ```bash
   npm start
   ```

### Usage

Access the application through your browser at `http://localhost:3000`. 

#### Authentication

- Use the login screen to access your account
- New users can register through the registration form
- Reset password functionality is available if needed

#### Dashboard

The dashboard provides an overview of your practice with:

- Today's appointments
- Recent patient interactions
- Upcoming events
- Statistics and metrics

#### Patient Management

- View complete patient list
- Add new patients with comprehensive medical information
- Search and filter patients by various criteria
- View detailed patient profiles with medical history

#### Appointment Scheduling

- View appointments in calendar view (daily, weekly, monthly)
- Schedule new appointments with collision detection
- Manage appointment status (confirm, cancel, reschedule)
- Set up video or phone call appointments

### Testing

Run the test suite with:

```bash
npm test
```

For end-to-end testing:

```bash
npm run test:e2e
```

## Features

- **Patient Records Management**: Comprehensive patient profiles with medical history, contact information, and visit logs.

- **Appointment Scheduling**: Intuitive calendar interface for scheduling and managing appointments.

- **Dashboard Analytics**: Visual representations of practice metrics and patient statistics.

- **Communication Tools**: Integrated messaging and notification system for patient communications.

- **Responsive Design**: Optimized for both desktop and mobile experiences.

- **Dark/Light Theme**: Customizable interface with theme options for user preference.

- **Secure Authentication**: Role-based access control with secure login and session management.

## Technical Documentation

### Documentation for Developers
1. [Developer Documentation](docs/documentacion_desarrollador.md) - Complete guide for developers
2. [Supabase Integration](docs/supabase-integration.md) - Details about Supabase integration
3. [Database Schema](docs/database-schema.md) - Detailed SQL schema documentation

### Documentation for Users
1. [User Manual](docs/manual_usuario.md) - End-user guide

### Technologies Used

Sintesis_v2 uses the following key technologies:

- **Frontend**: React
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase JWT system
- **Deployment**: Netlify/Vercel

## Project Structure

The application is organized into the following key directories:

```
src/
├── components/       # Reusable UI components
│   ├── dashboard/    # Dashboard-specific components
│   ├── layout/       # Layout components (header, sidebar, etc.)
│   └── shared/       # Shared components used across the app
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── services/         # API and external service integrations
├── styles/           # CSS and styling files
├── utils/            # Utility functions
└── App.js            # Main application component
```

## Code Organization

The application follows these coding principles:

- **Component-Based Architecture**: UI is broken down into reusable components
- **Context API for State Management**: Global state managed through React Context
- **Custom Hooks**: Logic extraction into reusable hooks
- **Service Layer**: API interactions abstracted into service modules
- **CSS Modules**: Scoped styling to prevent conflicts

## UI Components

Key UI components include:

- **AppointmentsTable**: Displays scheduled appointments with filtering options
- **Calendar**: Interactive calendar for date selection and appointment viewing
- **PatientAvatar**: Displays patient image or initials with consistent styling
- **StatisticsChart**: Visualizes practice metrics and patient data
- **NotificationManager**: Manages system notifications and alerts

## State Management

The application uses React Context API for state management through the following contexts:

- **AuthContext**: Manages user authentication state and methods
- **ThemeContext**: Handles theme preference (light/dark mode)
- **NotificationContext**: Manages system notifications

## API Integration

API interactions are managed through service modules that communicate with Supabase backend:

- **Authentication services**: User login, registration, and profile management
- **Patient services**: CRUD operations for patient records
- **Appointment services**: Scheduling and management of appointments
- **Statistics services**: Data aggregation and reporting

## Themes

The application supports both light and dark themes, with a consistent color palette:

- **Primary Color**: #5a4ff3 (purple)
- **Secondary Colors**: Various complementary colors for status indicators
- **Light Theme**: White backgrounds with dark text
- **Dark Theme**: Dark backgrounds with light text

CSS variables are used for consistent theming across components.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

