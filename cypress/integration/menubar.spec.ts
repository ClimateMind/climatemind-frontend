/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Menu bar opens and looks correct', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.mockServer();
    cy.visit('/start');
  });

  it('can open menubar', () => {
    cy.visit('/start');
    cy.get('[aria-label="menu"]').should('be.visible').click();
    cy.contains('About ClimateMind').should('be.visible');
    cy.checkAccessibility(terminalLog);
  });

  it('should have the right menu items', () => {
    cy.login();
    cy.visit('/start');
    cy.get('[aria-label="menu"]').should('be.visible').click();
    cy.contains(/About ClimateMind/i);
    cy.contains(/Scientists Speak Up/i);
    cy.contains(/Privacy Policy/i);
    cy.contains(/LOG OUT/i);
    cy.contains(/EMAIL US/i);
  });

  it('personal values and retake quiz should not be in the menu until user has take the quiz', () => {
    cy.visit('/');
    cy.get('[aria-label="menu"]').should('be.visible').click();
    cy.contains(/Personal Values/i).should('not.exist');
    cy.contains(/Re-take the Quiz/i).should('not.exist');
  });
});
