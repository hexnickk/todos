describe('Todos / Existing', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Should restore state on reload', () => {
        cy.getCy('todo-form__title')
            .first()
            .click()
            .should('be.focused')
            .clear()
            .type('hello world{esc}')
            .should('not.be.focused')
            .should('have.text', 'hello world');

        cy.reload();

        cy.getCy('todo-form__title').first().should('have.text', 'hello world');
    });

    it('Should show loading state', () => {
        cy.getCy('spinner').should('exist');

        cy.getCy('upcoming-number').should('have.text', '...');
        cy.getCy('completed-number').should('have.text', '... Completed');

        // Time passes

        cy.getCy('upcoming-number').should('have.text', '4');
        cy.getCy('completed-number').should('have.text', '0 Completed');
    });

    it('Should be able to complete', () => {
        cy.getCy('todo-form__checked').should('have.length', 4);
        cy.getCy('todo-form__checked').first().should('not.be.checked').check();
        cy.getCy('upcoming-number').should('have.text', '3');
        cy.getCy('completed-number').should('have.text', '1 Completed');
        cy.getCy('todo-form__checked').should('have.length', 3);
    });

    it('Should be able to view completed', () => {
        cy.getCy('todo-form__checked').first().check();
        cy.getCy('show-completed').should('have.text', 'Show').click().should('have.text', 'Hide');
        cy.getCy('todo-form__checked').last().should('be.checked');
    });

    it('should be updated and new created on Enter key', () => {
        cy.getCy('todo-form__title').its('length').as('oldLength');

        cy.getCy('todo-form__title')
            .first()
            .click()
            .should('be.focused')
            .clear()
            .type('hello world{enter}')
            .should('not.be.focused')
            .should('have.text', 'hello world');

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
            .should('have.text', 'hello world');

        // Typescript is incorrect in identifying oldLength type
        cy.get('@oldLength').then((oldLength: any) => {
            cy.getCy('todo-form__title').its('length').should('eq', oldLength);
        });
    });

    it('should be deleted on Enter key', () => {
        cy.getCy('todo-form__title').its('length').as('oldLength');

        cy.getCy('todo-form__title').first().click().should('be.focused').clear().type('{enter}').should('not.exist');

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
