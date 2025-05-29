describe('Gestión de Citas', () => {
  beforeEach(() => {
    // Login antes de cada test
    cy.login('test@example.com', 'password123');
    cy.visit('/appointments');
  });

  it('muestra lista de citas', () => {
    cy.contains('Próximas Citas').should('be.visible');
    cy.get('[data-testid="appointment-list"]').children().should('have.length.at.least', 1);
  });

  it('crea una nueva cita', () => {
    cy.contains('Nueva Cita').click();
    
    // Seleccionar paciente
    cy.get('[data-testid="patient-selector"]').click();
    cy.contains('Paciente Prueba').click();
    
    // Seleccionar fecha
    cy.get('[data-testid="date-picker"]').click();
    cy.get('.available-date').first().click();
    
    // Seleccionar hora
    cy.get('[data-testid="time-selector"]').select('10:00');
    
    // Ingresar motivo
    cy.get('textarea[name="reason"]').type('Consulta de rutina');
    
    // Guardar cita
    cy.get('button[type="submit"]').click();
    
    // Verificar confirmación
    cy.contains('Cita creada correctamente').should('be.visible');
    
    // Verificar que aparece en la lista
    cy.contains('Paciente Prueba').should('be.visible');
    cy.contains('Consulta de rutina').should('be.visible');
  });

  it('permite cancelar una cita', () => {
    // Seleccionar la primera cita
    cy.get('[data-testid="appointment-item"]').first().within(() => {
      cy.get('[data-testid="cancel-button"]').click();
    });
    
    // Confirmar cancelación
    cy.get('[data-testid="confirm-dialog"]').within(() => {
      cy.contains('Sí, cancelar').click();
    });
    
    // Verificar confirmación
    cy.contains('Cita cancelada').should('be.visible');
  });
});
