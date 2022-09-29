/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('How Climate Mind works', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.server();
    cy.mockServer();
  });

  it('Shows How Climate Mind works for user B', () => {
    cy.visit('/how-cm-works/8CC3F52E-88E7-4643-A490-519E170DB470');
    cy.contains(/How does Climate Mind work?/i);
    cy.contains(/Take a quiz/i);
    cy.contains(/What is the core values quiz?/i);
    cy.get('[data-testid="learn-more-button"]').contains('Learn More');
    cy.get('[data-testid="take-quiz-userb-button"]').contains('Take the Quiz');

    cy.checkAccessibility(terminalLog);
  });
});
