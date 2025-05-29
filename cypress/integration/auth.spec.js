describe('Autenticación', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('muestra error con credenciales inválidas', () => {
    cy.get('input[name="email"]').type('usuario@invalido.com');
    cy.get('input[name="password"]').type('contraseñaIncorrecta');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Credenciales incorrectas').should('be.visible');
  });

  it('redirecciona al dashboard tras login exitoso', () => {
    // Usando usuario de prueba predefinido
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.contains('Bienvenido').should('be.visible');
  });

  it('permite registrar un nuevo usuario', () => {
    cy.contains('Registrarse').click();
    cy.url().should('include', '/register');
    
    const randomEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;
    
    cy.get('input[name="name"]').type('Usuario Prueba');
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('Password123!');
    
    cy.get('button[type="submit"]').click();
    
    // Debería redireccionar a la pantalla de confirmación o login
    cy.url().should('include', '/login');
  });
});
