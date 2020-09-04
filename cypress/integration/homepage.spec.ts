/// <reference types="cypress" />

import {terminalLog} from '../support/helpers.ts'

describe('Homepage loads and looks correct', () => {
  it('can open homepage', () => {
    cy.viewport('iphone-x');
    cy.visit('');
    cy.contains('Get Started').should('be.visible');
    cy.checkAccessibility(terminalLog)
    cy.percySnapshot('Homepage');
  });
});
