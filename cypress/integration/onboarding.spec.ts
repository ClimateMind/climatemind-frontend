/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Onboarding loads, looks correct and the quiz can start', () => {
  beforeEach(() => {
    cy.acceptCookies();

    cy.mockServer();
  });

  it('shows the homepage the home page', () => {
    cy.visit('/');
    cy.checkAccessibility(terminalLog);
    cy.contains(/Inspire others to take action/i);
    cy.contains(/get started/i).click();
  });

  it('Onboarding2 looks correct', () => {
    cy.visit('start');
    cy.checkAccessibility(terminalLog);
    cy.contains(/First, what are your core values/i);
  });

  it('User can start the quiz', () => {
    cy.visit('/');
    cy.contains('Get Started').should('be.visible').click();
    cy.url().should('include', '/start');
    cy.contains('Take the quiz').should('be.visible').click();
    cy.url().should('include', '/questionnaire');
    cy.contains('Having a stable government is important to you');
  });
});
