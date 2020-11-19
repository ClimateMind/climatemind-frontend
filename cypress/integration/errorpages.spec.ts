/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Error pages load and look correct', () => {
  it('can visit 404 error page', () => {
    cy.visit('/fakepage');
    cy.contains('Well this is awkward').should('be.visible');
    cy.checkAccessibility(terminalLog);
    cy.percySnapshot('404 Error Page');

    cy.contains('a', 'Homepage').should('have.attr', 'href', '/');
    cy.contains('Go to homepage').click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/`);
  });

  it('can visit 500 error page', () => {
    cy.visit('/questionnaire');
    cy.contains('It’s broken…').should('be.visible');
    cy.checkAccessibility(terminalLog);
    cy.percySnapshot('500 Error Page');
  });
});
