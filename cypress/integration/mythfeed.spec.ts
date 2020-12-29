/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Myth Feeed loads and looks correct', () => {
  it('Can navigate to myths', () => {
    cy.visit('/myths');
    cy.contains(/We’re against fake news/i).should('be.visible');
    cy.checkAccessibility(terminalLog);
  });
});
