// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Ignore uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

// Log all API requests to the console (útil para depuración)
if (Cypress.config('debugRequests')) {
  Cypress.on('log:added', (attrs, log) => {
    if (attrs.name === 'request' && attrs.state === 'failed') {
      console.error('Request failed with: ', attrs.error);
    }
  });
}
