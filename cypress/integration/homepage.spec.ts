/// <reference types="cypress" />

import {terminalLog} from '../support/helpers.ts'

describe('Homepage loads and looks correct', () => {
  it('can open homepage', () => {
    cy.visit('');
    cy.contains('Get started').should('be.visible');
    cy.checkAccessibility(terminalLog)
    cy.percySnapshot('Homepage');
  });
});
