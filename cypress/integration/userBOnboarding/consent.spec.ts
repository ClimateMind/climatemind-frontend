/// <reference types="cypress" />

import { terminalLog } from '../../support/helpers';

describe('Consent', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.server();
    cy.mockServer();
  });

  it.skip('shows the correct summary for a user', () => {
    // TODO: [CM-1088] Implement cypress tests for user B sharing summary
  });

  it.skip('allows the user to consent to share', () => {
    // TODO:
  });
});
