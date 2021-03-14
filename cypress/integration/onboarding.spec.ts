/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Homepage loads and looks correct', () => {
  beforeEach(() => {
    cy.acceptCookies();
  });
  it('Homepage opens', () => {
    cy.visit('');
    cy.contains('Get Started').should('be.visible');
    cy.checkAccessibility(terminalLog);
    cy.percySnapshot('Homepage');
  });

  it('Onboarding2 looks correct', () => {
    cy.visit('/personality');
    cy.contains(
      'We want to make constructive conversations about climate change easier.'
    );
    cy.contains(
      'We want to make constructive conversations about climate change easier.'
    );
    cy.contains(
      'We want to make constructive conversations about climate change easier.'
    );
    cy.checkAccessibility(terminalLog);
    cy.percySnapshot('Onboarding2');
  });

  it('User can start the quiz', () => {
    cy.contains('Get Started').should('be.visible').click();
    cy.url().should('include', '/personality');
    cy.contains('Take the quiz').should('be.visible').click();
    cy.url().should('include', '/questionnaire');
    cy.contains('Having a stable government is important to you.');
  });
});