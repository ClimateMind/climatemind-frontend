/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Myth feed', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/myths',
      response: 'fixture:myths.json',
    });
    cy.visit('/myths');
  });

  it('It loads and looks correct', () => {
    cy.checkAccessibility(terminalLog);
    cy.percySnapshot('Myths Feed');

    cy.contains('We’re against fake news').should('be.visible');
    cy.get('[data-testid="MythCard"]').should('have.length', 8);
    cy.contains('Climate has changed before').should('be.visible');
    // cy.contains('Greenhouse Gasses, Principally CO2').should('be.visible');
  });
});
