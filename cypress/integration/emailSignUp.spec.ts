/// <reference types="cypress" />
import { isFeatureEnabled } from '../../src/features';

describe.only('Invited User Journey', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.mockServer();
  });

  it('User is signup form if conversations is disbaled', () => {
    if (!isFeatureEnabled.conversations) {
      cy.login();
      cy.wait(1).contains(/talk/i).click();
      cy.get('#emailInput');
      cy.get('button[type="submit"]').should('be.disabled');

      // cy.contains(/start talking with people/i).click();
      // cy.contains(/generate link/i).should('be.disabled');
      // cy.get('input#friend').type('John');
      // cy.contains(/generate link/i).click();
      // cy.contains(/unique for john/i);
      // cy.contains(/\/landing/i);
    }
  });

  it('allows the user to sign up to newsletter', () => {
    cy.get('#emailInput').type('test.user@example.com');
    cy.get('button[type="submit"]').should('not.be.disabled').click();
    cy.contains(/success/i);
    cy.contains(/thanks for subscribing/i);
    // cy.visit('/landing');
    // cy.get('#AppBar');
    // cy.contains(
    //   /Your friend would like you to take a personal values questionnaire/i
    // );
    // cy.contains(/TAKE THE QUIZ/i);
  });

  it('User gets an error message if already signed up', () => {
    cy.route({
      method: 'POST',
      url: `/subscribe`,
      status: 409,
      // response: 'fixture:subscribe.json',
    });
    cy.visit('/conversations');
    cy.get('#emailInput').type('test.user@example.com');
    cy.get('button[type="submit"]').should('not.be.disabled').click();
    cy.contains(/error/i);
    cy.contains(
      /Sorry, unable to subscribe you at this time. You may be on the list already/i
    );
  });
});
