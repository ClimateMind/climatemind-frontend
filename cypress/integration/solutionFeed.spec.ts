/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Actions feed loads and looks correct', () => {
  beforeEach(() => {
    // Set session id and accept cookies as if a returning user
    cy.mockServer();
    cy.login();
    cy.visit('/solutions');
  });

  it('The Actions feed loads and has the correct number of cards', () => {
    cy.checkAccessibility(terminalLog);
    cy.contains('Ready to take action?').should('be.visible');
    cy.get('[data-testid="CMCard"]').should('have.length', 49);
  });

  it.skip('When WHY is clicked on a card more info is shown about the myth', () => {
    cy.get('[data-testid="ActionCard-R9iV4b31x0p1xmG7jvYhBtq"]')
      .contains('button', 'MORE')
      .click();
    cy.get('[data-testid="CardOverlay"]').contains(
      'federal green jobs program'
    );
    cy.get('[data-testid="OverlayCloseButton"]').click();
    cy.get('[data-testid="CardOverlay"]').should('not.exist');
  });

  it('has app bar bar', () => {
    cy.get('[data-testid="AppBar"]').should('exist');
  });

  it('has the bottom bar', () => {
    cy.get('[data-testid="BottomMenu"]').should('exist');
  });
});
