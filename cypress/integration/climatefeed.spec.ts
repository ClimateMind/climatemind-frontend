/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Climate Feed loads and looks correct', () => {
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

    cy.visit('/');
  });

  it('User is redirected to the feed when they click get started AND feed has the correct number of cards', () => {
    cy.contains('Climate').should('be.visible');
    cy.contains('Get Started').click();
    cy.contains('Your Personal Climate Feed').click();
    cy.get('[data-testid="CMCard"]').should('have.length', 21);
  });

  it('Card contains the correct information', () => {
    cy.visit('/climate-feed');
    cy.get('[data-testid="EffectCard-RnbPKhyIQNnShkRKHqGrGm"]').then(() => {
      //Card contains the right text
      cy.contains('increase in flooding of land and property');
      cy.contains('Local impact');
      cy.contains(
        'The air in the atmosphere is warming leading to more moisture held in clouds'
      );
      cy.contains('avoid building on land that is or will become a floodplain');
    });
  });

  it('User can open a card and it displays', () => {
    cy.visit('/climate-feed');
    cy.get('[data-testid="EffectCard-RnbPKhyIQNnShkRKHqGrGm"]')
      .contains('LEARN MORE')
      .click();
    cy.get('[data-testid="CardOverlay"]').contains(
      'increase in flooding of land and property'
    );
  });

  it('User can navigate using the bottom bar', () => {
    cy.visit('/climate-feed');

    // Click Solutions
    cy.get('[data-testid="BottomMenu"]').contains('Solutions').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/solutions');
    });

    // Click Myths
    cy.get('[data-testid="BottomMenu"]').contains('Myths').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/myths');
    });

    // Click Conversations
    cy.get('[data-testid="BottomMenu"]').contains('Conversations').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/conversations');
    });
  });
});
