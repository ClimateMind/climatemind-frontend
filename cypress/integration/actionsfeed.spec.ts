/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Actions feed loads and looks correct', () => {
  beforeEach(() => {
    // Set session id and accept cookies as if a returning user
    cy.acceptCookies();
    cy.setSession();
    const sessionId = '1234';

    cy.server();
    cy.route({
      method: 'GET',
      url: '/questions',
      response: 'fixture:questions.json',
    });
    cy.route({
      method: 'POST',
      url: '/scores',
      response: `{"sessionId": "${sessionId}"}`,
    });
    cy.route({
      method: 'GET',
      url: `/personal_values?session-id=${sessionId}`,
      response: 'fixture:personal-values.json',
    });
    cy.route({
      method: 'GET',
      url: `/feed?session-id=${sessionId}`,
      response: 'fixture:climate-feed.json',
    });

    cy.route({
      method: 'GET',
      url: `/solutions?session-id=${sessionId}`,
      response: 'fixture:solutions.json',
    });

    cy.visit('/solutions');
  });

  it('The Actions feed loads and has the correct number of cards', () => {
    cy.checkAccessibility(terminalLog);
    cy.contains('Ready to take action?').should('be.visible');
    cy.get('[data-testid="CMCard"]').should('have.length', 49);
  });

  it('When WHY is clicked on a card more info is shown about the myth', () => {
    cy.get('[data-testid="ActionCard-R9iV4b31x0p1xmG7jvYhBtq"]')
      .contains('MORE')
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
