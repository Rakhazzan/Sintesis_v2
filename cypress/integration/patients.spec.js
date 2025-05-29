describe('Gestión de Pacientes', () => {
  beforeEach(() => {
    // Login antes de cada test
    cy.login('test@example.com', 'password123');
    cy.visit('/patients');
  });

  it('muestra lista de pacientes', () => {
    cy.contains('Pacientes').should('be.visible');
    cy.get('[data-testid="patient-list"]').should('exist');
    cy.get('[data-testid="patient-card"]').should('have.length.at.least', 1);
  });

  it('permite buscar pacientes', () => {
    cy.get('[data-testid="search-input"]').type('Martínez');
    cy.get('[data-testid="patient-card"]').should('contain', 'Martínez');
  });

  it('permite añadir un nuevo paciente', () => {
    cy.contains('Nuevo Paciente').click();
    
    // Formulario de nuevo paciente
    cy.get('input[name="name"]').type('Ana García Test');
    cy.get('input[name="email"]').type('ana.test@example.com');
    cy.get('input[name="phone"]').type('666777888');
    cy.get('input[name="date_of_birth"]').type('1985-05-15');
    
    // Usar el MedicalConditionSelector para seleccionar una condición médica
    cy.get('[data-testid="medical-condition-selector"]').click();
    cy.get('input.selector-input').type('diab');
    cy.contains('Diabetes').click();
    
    // Guardar paciente
    cy.get('button[type="submit"]').click();
    
    // Verificar confirmación
    cy.contains('Paciente creado correctamente').should('be.visible');
    
    // Verificar que el paciente aparece en la lista
    cy.get('[data-testid="search-input"]').clear().type('Ana García');
    cy.get('[data-testid="patient-card"]').should('contain', 'Ana García Test');
    
    // Verificar el código de color de la condición médica (asumiendo que Diabetes tiene un color específico)
    cy.get('[data-testid="condition-badge"]').should('have.css', 'background-color', 'rgb(233, 30, 99)');
  });

  it('permite editar un paciente existente', () => {
    // Buscar un paciente para editar
    cy.get('[data-testid="search-input"]').clear().type('Ana García');
    cy.get('[data-testid="patient-card"]').contains('Ana García').parent().within(() => {
      cy.get('[data-testid="edit-button"]').click();
    });
    
    // Modificar información
    cy.get('input[name="address"]').clear().type('Calle Nueva 123, Barcelona');
    
    // Guardar cambios
    cy.get('button[type="submit"]').click();
    
    // Verificar confirmación
    cy.contains('Paciente actualizado correctamente').should('be.visible');
    
    // Verificar que los cambios se aplicaron
    cy.get('[data-testid="patient-card"]').contains('Ana García').click();
    cy.get('[data-testid="patient-details"]').should('contain', 'Calle Nueva 123, Barcelona');
  });

  it('permite ver el historial médico de un paciente', () => {
    // Buscar un paciente para ver su historial
    cy.get('[data-testid="search-input"]').clear().type('Ana García');
    cy.get('[data-testid="patient-card"]').contains('Ana García').click();
    
    // Verificar que se muestra la información del paciente
    cy.get('[data-testid="patient-details"]').should('be.visible');
    
    // Verificar que se muestra el historial médico
    cy.contains('Historial Médico').click();
    cy.get('[data-testid="medical-history"]').should('be.visible');
    
    // Verificar que se muestran las citas del paciente
    cy.contains('Citas').click();
    cy.get('[data-testid="appointment-list"]').should('be.visible');
  });
});
