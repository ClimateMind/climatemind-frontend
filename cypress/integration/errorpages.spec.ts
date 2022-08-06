/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Error pages load and look correct', () => {
  beforeEach(() => {
    cy.acceptCookies();
  });
  it('can visit 404 error page', () => {
    cy.visit('/fakepage');
    cy.contains('Well this is awkward').should('be.visible');
    cy.checkAccessibility(terminalLog);

    cy.contains('a', 'Homepage').should('have.attr', 'href', '/');
    cy.contains('Go to homepage').click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/`);
  });
});
