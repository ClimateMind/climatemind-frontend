/// <reference types="cypress" />

describe('Myth Feed loads and looks correct', () => {
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
      url: `/myths`,
      response: 'fixture:myths.json',
    });
    cy.route({
      method: 'GET',
      url: `/solutions`,
      response: 'fixture:solutions.json',
    });

    cy.visit('/myths');
  });

  it('The myth feed loads and has the correct number of cards', () => {
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
