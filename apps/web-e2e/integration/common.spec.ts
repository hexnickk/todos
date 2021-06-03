/// <reference types="cypress" />

describe('Common', () => {
    it('should show suspense loader', () => {
        cy.visit('/');
        cy.getCy('suspense-loader').should('exist');
    });
});
