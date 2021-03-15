/// <reference types="cypress" />

import { terminalLog } from '../support/helpers.ts';

describe('Menu bar opens and looks correct', () => {
  it.only('can open menubar', () => {
    cy.acceptCookies();
    cy.visit('/personality');
    cy.get('[aria-label="menu"]').should('be.visible').click();
    cy.contains('About ClimateMind').should('be.visible');
    cy.checkAccessibility(terminalLog);
    cy.percySnapshot('MenuBar');
  });
});
