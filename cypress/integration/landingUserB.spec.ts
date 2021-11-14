/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe.only('Landing user B', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.server();
    cy.mockServer();
  });

  it('Shows the landing page for user B', () => {
    cy.visit('/landing/d63b3815-7d0e-4097-bce0-d5348d403ff6');
    cy.contains(/Stevie invited you to take our core values quiz!/i);
    cy.contains(/Talking about climate change is the most effective way to take action./i);
    cy.get('[data-testid="framing-button"]')
    .contains('Framing');
    cy.get('[data-testid="how-cm-works-button"]')
    .contains('Next: How does ClimateMind work?');

    cy.checkAccessibility(terminalLog);
  });

});
