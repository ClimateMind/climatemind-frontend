/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Personality page loads and looks correct', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.visit('/personality');
  });

  it('can open personality page', () => {
    cy.contains("Let's find out your core values").should('be.visible');
    cy.checkAccessibility(terminalLog);
    cy.percySnapshot('Personality Page - Collapsed');
  });

  it('Lets go button goes to climate personality page', () => {
    cy.contains('Take the quiz').should('be.visible').click();
    cy.url().should('include', '/questionnaire');
  });
});
