/// <reference types="cypress" />

describe('Homepage loads and looks correct', () => {
  it('can open homepage', () => {
    cy.visit('');
    cy.contains('Get started').should('be.visible');
    cy.percySnapshot('Homepage');
  });
});
