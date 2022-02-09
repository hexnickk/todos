describe('Todos / common', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should open', () => {
        cy.contains('Todos').should('exist');
    });

    it('should have walk-through items', () => {
        cy.getCy('todo-form').should('have.length', 4);
    });
});
