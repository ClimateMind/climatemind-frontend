/// <reference types="cypress" />

import {terminalLog} from '../support/helpers.ts'

describe('Startpage loads and looks correct', () => {
  beforeEach(() => {
    cy.visit('/start');
  })

  it('can open startpage', () => {
    cy.contains('Hello there!').should('be.visible');
    cy.checkAccessibility(terminalLog)
    cy.percySnapshot('Start Page')
  });

  it('Lets go button goes to climate personality page', () => {
    cy.contains('Let\'s Go').should('be.visible').click()
    cy.url().should('include', '/personality')
  });
});
