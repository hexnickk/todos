/// <reference types="cypress" />

describe('Todos page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should open', () => {
        cy.contains('Todos').should('exist');
    });

    it('should have walk-through items', () => {
        cy.getCy('todo-form').should('have.length', 4);
    });

    describe('Existing todos', () => {
        it('should be updated and new created on Enter key', () => {
            cy.getCy('todo-form__title').its('length').as('oldLength');

            cy.getCy('todo-form__title')
                .first()
                .click()
                .should('be.focused')
                .clear()
                .type('hello world{enter}')
                .should('not.be.focused')
                .should('have.value', 'hello world');

            // Typescript is incorrect in identifying oldLength type
            cy.get('@oldLength').then((oldLength: any) => {
                cy.getCy('todo-form__title')
                    .its('length')
                    .should('eq', oldLength + 1);
            });
        });

        it('should be just updated on Escape key', () => {
            cy.getCy('todo-form__title').its('length').as('oldLength');

            cy.getCy('todo-form__title')
                .first()
                .click()
                .should('be.focused')
                .clear()
                .type('hello world{esc}')
                .should('not.be.focused')
                .should('have.value', 'hello world');

            // Typescript is incorrect in identifying oldLength type
            cy.get('@oldLength').then((oldLength: any) => {
                cy.getCy('todo-form__title').its('length').should('eq', oldLength);
            });
        });

        it('should be deleted on Enter key', () => {
            cy.getCy('todo-form__title').its('length').as('oldLength');

            cy.getCy('todo-form__title')
                .first()
                .click()
                .should('be.focused')
                .clear()
                .type('{enter}')
                .should('not.exist');

            // Typescript is incorrect in identifying oldLength type
            cy.get('@oldLength').then((oldLength: any) => {
                cy.getCy('todo-form__title')
                    .its('length')
                    .should('eq', oldLength - 1);
            });
        });

        it('should be deleted on Escape key', () => {
            cy.getCy('todo-form__title').its('length').as('oldLength');

            cy.getCy('todo-form__title').first().click().should('be.focused').clear().type('{esc}').should('not.exist');

            // Typescript is incorrect in identifying oldLength type
            cy.get('@oldLength').then((oldLength: any) => {
                cy.getCy('todo-form__title')
                    .its('length')
                    .should('eq', oldLength - 1);
            });
        });
    });

    describe('New todos', () => {
        it('Should be created right after existing one on Enter key', () => {
            cy.getCy('todo-form__title').eq(1).invoke('val').should('not.be.empty');
            cy.getCy('todo-form__title').first().click().type('{enter}');
            cy.getCy('todo-form__title').eq(1).should('be.focused').invoke('val').should('be.empty');
        });

        it('Should be created at the end after clicking empty space', () => {
            cy.getCy('todo-form__title').last().invoke('val').should('not.be.empty');
            cy.getCy('todo-placeholder').click();
            cy.getCy('todo-form__title').last().should('be.focused').invoke('val').should('be.empty');
        });

        it('Should be saved and another new created on Enter key', () => {
            cy.getCy('todo-form__title').its('length').as('oldLength');

            cy.getCy('todo-placeholder').click();
            cy.getCy('todo-form__title').last().click().type('hello world{enter}');
            cy.getCy('todo-form__title').eq(-2).should('have.value', 'hello world');

            // Typescript is incorrect in identifying oldLength type
            cy.get('@oldLength').then((oldLength: any) => {
                cy.getCy('todo-form__title')
                    .its('length')
                    .should('eq', oldLength + 2);
            });
        });

        it('Should be just saved on Escape key', () => {
            cy.getCy('todo-form__title').its('length').as('oldLength');

            cy.getCy('todo-placeholder').click();
            cy.getCy('todo-form__title').last().click().type('hello world{esc}');
            cy.getCy('todo-form__title').eq(-1).should('have.value', 'hello world');

            // Typescript is incorrect in identifying oldLength type
            cy.get('@oldLength').then((oldLength: any) => {
                cy.getCy('todo-form__title')
                    .its('length')
                    .should('eq', oldLength + 1);
            });
        });

        it('Should be deleted if empty on Enter key', () => {
            cy.getCy('todo-form__title').its('length').as('oldLength');

            cy.getCy('todo-placeholder').click();
            cy.getCy('todo-form__title').last().click().clear().type('{enter}');

            // Typescript is incorrect in identifying oldLength type
            cy.get('@oldLength').then((oldLength: any) => {
                cy.getCy('todo-form__title').its('length').should('eq', oldLength);
            });
        });

        it('Should be deleted if empty on Escape key', () => {
            cy.getCy('todo-form__title').its('length').as('oldLength');

            cy.getCy('todo-placeholder').click();
            cy.getCy('todo-form__title').last().click().clear().type('{esc}');

            // Typescript is incorrect in identifying oldLength type
            cy.get('@oldLength').then((oldLength: any) => {
                cy.getCy('todo-form__title').its('length').should('eq', oldLength);
            });
        });
    });
});
