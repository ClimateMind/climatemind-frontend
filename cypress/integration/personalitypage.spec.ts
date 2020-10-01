/// <reference types="cypress" />

import {terminalLog} from '../support/helpers.ts'

describe('Personality page loads and looks correct', () => {
  beforeEach(() => {
    cy.visit('/personality');
  })

  it('can open personality page', () => {
    cy.contains('Good to meet you').should('be.visible');
    //TODO - once name is dynamic we should check for that
    cy.checkAccessibility(terminalLog)
    cy.percySnapshot('Personality Page - Collapsed')
  });

  it('can use personality dropdown', () => {
    cy.contains('To make decisions we each employ three personal values.')
      .should('not.be.visible')
    cy.get('[id="icon-arrow-down"]').click()
    cy.contains('To make decisions we each employ three personal values.')
      .should('be.visible')
    cy.percySnapshot('Personality Page - Expanded')
    cy.get('[id="icon-arrow-down"]').click()
    cy.contains('To make decisions we each employ three personal values.')
      .should('not.be.visible')
  })

  it('Lets go button goes to climate personality page', () => {
    cy.contains('Take the quiz').should('be.visible').click()
    cy.url().should('include', '/questionnaire')
  });
});
