/// <reference types="cypress" />

import {terminalLog} from '../support/helpers.ts'

describe('Homepage loads and looks correct', () => {
  beforeEach(() => {
    cy.visit('');
  })

  it('can open homepage', () => {
    cy.contains('Get started').should('be.visible');
    cy.checkAccessibility(terminalLog)
    cy.percySnapshot('Homepage')
  });

  it('Get started button goes to start page', () => {
    cy.contains('Get started').should('be.visible').click()
    cy.url().should('include', '/start')
  })
});
