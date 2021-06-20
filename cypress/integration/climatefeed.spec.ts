/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Climate Feed loads and looks correct', () => {
  beforeEach(() => {
    // Set session id and accept cookies as if a returning user
    cy.acceptCookies();
    const sessionId = '1571e7be-a56c-4e7e-ac76-2198d8f698f2';

    cy.server();
    cy.mockServer(sessionId);
    cy.login();
  });

  it('Card contains the correct information', () => {
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
    cy.get('[data-testid="EffectCard-RnbPKhyIQNnShkRKHqGrGm"]')
      .contains('LEARN MORE')
      .click();
    cy.get('[data-testid="CardOverlay"]').contains(
      'increase in flooding of land and property'
    );
  });

  it('It has the app bar', () => {
    cy.get('[data-testid="AppBar"]');
  });

  it('It has the bottom bar and user can navigate', () => {
    // Click Solutions
    cy.get('[data-testid="BottomMenu"]').contains('Actions').click();
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
