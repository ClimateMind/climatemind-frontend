/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Onboarding loads, looks correct and the quiz can start', () => {
  beforeEach(() => {
    cy.acceptCookies();

    cy.server();
    cy.route({
      method: 'GET',
      url: '/questions',
      response: 'fixture:questions.json',
    });
  });
  it('Homepage opens', () => {
    cy.visit('');
    cy.contains('Get Started').should('be.visible');
    cy.checkAccessibility(terminalLog);
    cy.percySnapshot('Homepage');
  });

  it('Onboarding2 looks correct', () => {
    cy.visit('/start');
    cy.contains(
      'We want to make constructive conversations about climate change easier.'
    );
    cy.contains("Let's find out your core values!");
    cy.contains(
      "By answering 10 research-backed questions, I can show you your top values. Then we'll look at how climate change is personally affecting you and the values most important to you."
    );
    cy.checkAccessibility(terminalLog);
    cy.percySnapshot('Onboarding2');
  });

  it('User can start the quiz', () => {
    cy.visit('');
    cy.contains('Get Started').should('be.visible').click();
    cy.url().should('include', '/start');
    cy.contains('Take the quiz').should('be.visible').click();
    cy.url().should('include', '/questionnaire');
    cy.contains('Having a stable government is important to you');
  });
});
