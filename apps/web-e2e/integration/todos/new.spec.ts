describe('Todos / New', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Should be created right after existing one on Enter key', () => {
        cy.getCy('todo-form__title').eq(1).should('not.be.empty');
        cy.getCy('todo-form__title').first().click().type('{enter}');
        cy.getCy('todo-form__title').eq(1).should('be.focused').should('be.empty');
    });

    it('Should be created at the end after clicking empty space', () => {
        cy.getCy('todo-form__title').last().should('not.be.empty');
        cy.getCy('todo-placeholder').click();
        cy.getCy('todo-form__title').last().should('be.focused').should('be.empty');
    });

    it('Should be saved and another new created on Enter key', () => {
        cy.getCy('todo-form__title').its('length').as('oldLength');

        cy.getCy('todo-placeholder').click();
        cy.getCy('todo-form__title').last().click().type('hello world{enter}');
        cy.getCy('todo-form__title').eq(-2).should('have.text', 'hello world');

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
        cy.getCy('todo-form__title').eq(-1).should('have.text', 'hello world');

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
