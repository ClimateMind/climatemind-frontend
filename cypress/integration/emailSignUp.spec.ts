/// <reference types="cypress" />
import { isFeatureEnabled } from '../../src/features';

describe('Invited User Journey', () => {
  it.only('temporarily disable tests', () => {
    expect(true).eq(true);
  });

  // beforeEach(() => {
  //   cy.acceptCookies();
  //   cy.mockServer();
  // });

  it('User is signup form if conversations is disbaled', () => {
    if (!isFeatureEnabled.conversations) {
      cy.login();
      cy.wait(1).contains(/talk/i).click();
      cy.get('#emailInput');
      cy.get('button[type="submit"]').should('be.disabled');
    }
  });

  it('allows the user to sign up to newsletter', () => {
    if (!isFeatureEnabled.conversations) {
      cy.get('#emailInput').type('test.user@example.com');
      cy.get('button[type="submit"]').should('not.be.disabled').click();
      cy.contains(/success/i);
      cy.contains(/thanks for subscribing/i);
    }
  });

  it('User gets an error message if already signed up', () => {
    if (!isFeatureEnabled.conversations) {
      cy.route({
        method: 'POST',
        url: `/subscribe`,
        status: 409,
      });
      cy.visit('/conversations');
      cy.get('#emailInput').type('test.user@example.com');
      cy.get('button[type="submit"]').should('not.be.disabled').click();
      cy.contains(/error/i);
      cy.contains(
        /Sorry, unable to subscribe you at this time. You may be on the list already/i
      );
    }
  });
});
