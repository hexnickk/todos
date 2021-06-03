/// <reference types="cypress" />

describe('Not found page', () => {
    it('should open', () => {
        cy.visit('/qwe');
        cy.contains('Page not found!').should('exist');
    });
});
