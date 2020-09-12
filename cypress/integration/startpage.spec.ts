/// <reference types="cypress" />

import {terminalLog} from '../support/helpers.ts'

describe('Homepage loads and looks correct', () => {
  beforeEach(() => {
    cy.visit('/start');
  })

  it('can open homepage', () => {
    cy.contains('Hello there!').should('be.visible');
    cy.checkAccessibility(terminalLog)
    cy.percySnapshot('Start Page')
  });

  it('Lets go button goes to quiz', () => {
    cy.contains('Let\'s Go').should('be.visible').click()
    cy.url().should('include', '/questionnaire')
  })
});
