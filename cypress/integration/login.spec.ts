/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Onboarding loads, looks correct and the quiz can start', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.setSession();

    cy.server();
    cy.route({
      method: 'GET',
      url: '/questions',
      response: 'fixture:questions.json',
    });
    cy.route({
      method: 'POST',
      url: '/login',
      response: 'fixture:register.json',
    });
    cy.route({
      method: 'GET',
      url: `/feed?session-id=${1234}`,
      response: 'fixture:climate-feed.json',
    });
  });

  it('User can visit the register page', () => {
    cy.visit('/sign-up');
    cy.contains(/Create an Climate Mind account/i).should('be.visible');
    cy.contains('Save your results and access your climate feed anytime.');
    cy.checkAccessibility(terminalLog);
    cy.percySnapshot('SignUp');
    cy.contains(/create account and go to feed/i).should('be.disabled');
  });
});
