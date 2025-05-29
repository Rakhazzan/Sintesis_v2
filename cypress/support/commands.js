// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando personalizado para login
Cypress.Commands.add('login', (email, password) => {
  // En lugar de visitar la página y hacer login a través de la UI,
  // podemos hacerlo programáticamente para que las pruebas sean más rápidas
  cy.request({
    method: 'POST',
    url: '/api/auth/login', // Ajusta esta URL según tu API
    body: {
      email,
      password
    }
  }).then((response) => {
    // Asumiendo que la respuesta contiene un token JWT
    window.localStorage.setItem('supabase.auth.token', response.body.token);
  });

  // Verificar que estamos autenticados visitando una página protegida
  cy.visit('/dashboard');
  cy.url().should('include', '/dashboard');
});

// Comando para seleccionar una fecha en el selector de fechas
Cypress.Commands.add('selectDate', (date) => {
  const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  cy.get('[data-testid="date-picker"]').click();
  cy.get(`[data-date="${formattedDate}"]`).click();
});

// Comando para seleccionar una condición médica
Cypress.Commands.add('selectMedicalCondition', (condition) => {
  cy.get('[data-testid="medical-condition-selector"]').click();
  cy.get('input').type(condition);
  cy.contains(condition).click();
});

// Comando para verificar notificación
Cypress.Commands.add('verifyNotification', (message) => {
  cy.get('[data-testid="notification"]').should('contain', message);
});
