/// <reference types="cypress" />

import {terminalLog} from '../support/helpers.ts'

describe('Homepage loads and looks correct', () => {
  it('can open homepage', () => {
    cy.visit('');
    cy.contains('Get Started').should('be.visible');
    cy.checkAccessibility(terminalLog)
    cy.percySnapshot('Homepage')
  });

  it('Get started button goes to start page', () => {
    cy.contains('Get Started').should('be.visible').click()
    cy.url().should('include', '/start')
  })
});
