/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Climate Feed loads and looks correct', () => {
  beforeEach(() => {
    cy.server();
    cy.mockServer();
    cy.login();
    cy.visit('climate-feed');
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
      .contains('button', 'LEARN MORE')
      .click({ force: true });
    cy.get('[data-testid="CardOverlay"]').contains(
      'increase in flooding of land and property'
    );
  });

  it('It has the app bar', () => {
    cy.get('[data-testid="AppBar"]');
  });

  it('It has the bottom bar and user can navigate', () => {
    // Click Solutions
    cy.get('[data-testid="BottomMenu"]').contains('Actions').click({ force: true });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/solutions');
    });

    // Click Myths
    cy.get('[data-testid="BottomMenu"]').contains('Myths').click({ force: true });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/myths');
    });

    // Click Conversations
    cy.get('[data-testid="BottomMenu"]').contains('Talk').click({ force: true });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/conversations');
    });
  });
});