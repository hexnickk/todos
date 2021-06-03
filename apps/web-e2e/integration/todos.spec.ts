/// <reference types="cypress" />

describe('Todos page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should open', () => {
        cy.contains('Todos').should('exist');
    });

    it('should have table', () => {
        cy.get('.ant-table-row').should('have.length', 10);
    });

    describe('filters', () => {
        it('should filter by text', () => {
            cy.get('.ant-table-row').should('have.length', 10);
            cy.getCy('todos-table-filters__search', 'input').type('qwe');
            cy.get('.ant-table-row').should('have.length', 0);

            cy.getCy('todos-table-filters__search', 'input').clear();
            cy.get('.ant-table-row').should('have.length', 10);

            cy.get('.ant-table-row').should('have.length', 10);
            cy.getCy('todos-table-filters__search', 'input').type('ab');
            cy.wait(300); // waiting debounce
            cy.get('.ant-table-row').each((el) =>
                expect(el).contain.text('ab')
            );
        });

        it('should filter by completed', () => {
            cy.get('.ant-table-row').should('have.length', 10);
            // TODO: move to cy command
            cy.getCy(
                'todos-table-filters__completed',
                '.ant-select-selector'
            ).click();
            cy.get('.ant-select-item').contains('no').click();
            cy.get('.ant-table-row > .ant-table-cell:nth-child(3)').each((el) =>
                expect(el).contain.text('no')
            );
        });
    });
});
