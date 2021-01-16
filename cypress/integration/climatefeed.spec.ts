/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Personal values page loads and looks correct', () => {
  beforeEach(() => {
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

    cy.visit('./');
  });

  it('can complete questionnaire and see personal values', () => {
    // Check personality cards
    cy.contains('Climate').should('be.visible');
    cy.contains('Get Started').click();
    cy.contains('Your Personal Climate Feed').click();
  });
});
