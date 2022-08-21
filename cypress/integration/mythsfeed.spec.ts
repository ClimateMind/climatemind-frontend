/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Myth Feed loads and looks correct', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.mockServer();
    cy.login();
    cy.visit('/myths');
  });

  it('The myth feed loads and has the correct number of cards', () => {
    cy.checkAccessibility(terminalLog);
    cy.contains('Climate Mind is against misinformation').should('be.visible');
    cy.get('[data-testid="CMCard"]').should('have.length', 8);
  });

  it('When WHY is clicked on a card more info is shown about the myth', () => {
    cy.get('[data-testid="MythCard-R8ZhofBtOtoHDSFtEhoLGir"]')
      .contains('WHY')
      .click();
    cy.get('[data-testid="CardOverlay"]').contains(
      'Greenhouse gasses, principally CO2, have controlled most ancient climate changes. This time around humans are the cause, mainly by our CO2 emissions'
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
