/// <reference types="cypress" />

import { terminalLog } from '../../support/helpers';

describe('Consent', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.server();
    cy.mockServer();
  });

  it('user can click the not now button', () => {
    cy.visit('/shared-summary');
    cy.checkAccessibility(terminalLog);
    cy.contains(/sharing is caring/i);
    cy.contains(/not now/i).click();
    cy.url().should('include', 'user-b/no-share');
  });

  it('user can go back to impacts', () => {
    cy.checkAccessibility(terminalLog);
    cy.contains(/back/i).click();
    cy.url().should('include', 'shared-impacts');
  });

  it.skip('shows the correct summary for a user', () => {
    // TODO: [CM-1088] Implement cypress tests for user B sharing summary
  });

  it.skip('allows the user to consent to share', () => {
    // TODO:
  });
});
