/// <reference types="cypress" />

import { terminalLog } from '../../support/helpers';

describe('Consent', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.server();
    cy.mockServer();
  });


  it('user can click the not now button', () => {
    cy.visit('/shared-summary/8CC3F52E-88E7-4643-A490-519E170DB470');
    cy.checkAccessibility(terminalLog);
    cy.contains(/sharing is caring/i);
    try {
      cy.contains(/not now/i).click();
    } catch {
      cy.contains(/create account/i).click();
    }
    cy.url().should('include', 'user-b/no-share');
  });

  it('user can go back to impacts', () => {
    cy.checkAccessibility(terminalLog);
    cy.contains(/Back/).click();
    cy.url().should('include', 'shared-impacts');
  });

  it.skip('shows the correct summary for a user', () => {
    // TODO: [CM-1088] Implement cypress tests for user B sharing summary
  });

  it.skip('allows the user to consent to share', () => {
    // TODO:
  });
});
