/// <reference types="cypress" />

// eslint-disable-next-line
declare namespace Cypress {
    // eslint-disable-next-line
    interface Chainable {
        getCy(selector: string, subselector?: string): Chainable<JQuery>;
    }
}

Cypress.Commands.add(
    'getCy',
    (selector: string, subselector = ''): Cypress.Chainable<JQuery> => {
        return cy.get(`[data-cy="${selector}"] ${subselector}`);
    }
);

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
