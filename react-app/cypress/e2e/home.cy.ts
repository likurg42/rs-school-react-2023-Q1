describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have repositories', () => {
    cy.get('[data-testid="repo-card"]').should('have.length.above', 1);
  });

  it('should find repository by keyword', () => {
    cy.get('[data-testid="keyword"]').type('vue');
    cy.get('[data-testid="search"]').click();
    cy.get('[data-testid="repo-card"]').should('have.length.above', 1);
  });

  it('should open and close modal for repository', () => {
    const firstCard = cy.get('[data-testid="repo-card"]');
    cy.contains('More').click();
    cy.contains('Made by').should('be.visible');
    cy.contains('Close').click();
  });
});