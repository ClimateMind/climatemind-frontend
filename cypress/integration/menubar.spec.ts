/// <reference types="cypress" />

import { terminalLog } from '../support/helpers.ts';

describe('Menu bar opens and looks correct', () => {
  it('can open menubar', () => {
    cy.visit('/start');
    cy.get('[aria-label="menu"]').should('be.visible').click();
    cy.contains('About ClimateMind').should('be.visible');
    cy.percySnapshot('MenuBar');
  });
});
