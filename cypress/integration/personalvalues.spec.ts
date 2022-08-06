/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Personal values page loads and looks correct', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.mockServer();

    cy.visit('./questionnaire');
    let i = 0;
    while (i < 10) {
      cy.contains(`Q${i + 1}`).should('be.visible');
      cy.contains('Very Much Like Me').click();
      i++;
    }
    cy.url().should('include', '/submit');
    cy.get('[id=submitButton]').click();
    cy.contains('This is your Climate Personality').should('be.visible');
  });

  it('can complete questionnaire and see personal values', () => {
    // Check personality cards
    cy.checkAccessibility(terminalLog);
    cy.contains('hedonism').should('be.visible');
    cy.contains(
      'Joy, pleasure and satisfaction are a big part of what drives you. From big moments to the little things, you find bliss in enjoying what you do.'
    ).should('be.visible');
    cy.get('[data-testid="CMCard"]').should('have.length', 3);
    cy.get('[data-testid="CMCardMore"]').first().click();
    cy.get('[data-testid="CMCardMore"]').first().should('have.text', 'LESS');
    cy.contains(
      'Whether through exploring the world or indulging in your favorite food, you likely love instant gratification and value decisions that reward your senses.'
    ).should('be.visible');
  });
  it('navigate to the climate feed', () => {
    cy.get('[data-testid="CMCard-Image"]').invoke('attr', 'style', '');
    cy.contains('Ready to dive into Climate Mind?').should('be.visible');
    cy.contains('Yes, I’m ready!').should('be.visible').click();
    cy.url().should('include', '/set-location');
    cy.get('[id=zipCodeInput]').type('90210');
    cy.get('[id=submitButton]').click();
    cy.url().should('include', '/sign-up');
  });

  it('retake the quiz', () => {
    cy.contains('Climate Personality not quite right?').should('be.visible');
    cy.wait(1).contains('Retake the Quiz').should('be.visible').click();
    cy.contains('Q1').should('be.visible');
  });
});
