/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('User can register', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.mockServer();
  });

  it('User can visit the register page', () => {
    cy.visit('/sign-up');
    cy.contains(/Create a Climate Mind account/i).should('be.visible');
    cy.contains('Save your results and access your climate feed anytime.');
    cy.checkAccessibility(terminalLog);
    cy.contains(/create account and go to feed/i).should('be.disabled');
  });

  it('User Can complete the form and register', () => {
    cy.visit('/sign-up');
    cy.get('input#firstname').type('Test');
    cy.get('input#lastname').type('User');
    cy.get('input#email').type('test.user@example.com');
    cy.get('input#password').type('Password123!');
    cy.get('input#confirmPassword').type('Password123!');
    cy.contains(/create account and go to feed/i)
      .should('be.enabled')
      .click();
    // TODO: Imporve this test
    cy.url().should('include', 'climate-feed');
    cy.contains('Your Personal Climate Feed');
  });

  it('User can skip registration', () => {
    cy.visit('/sign-up');
    cy.contains(/Create a Climate Mind account/i).should('be.visible');
    cy.contains(/skip making an account and see feed/i)
      .should('be.enabled')
      .click();
    // TODO: Improve this test
    cy.url().should('include', 'climate-feed');
    cy.contains('Your Personal Climate Feed');
  });

  it('Passwords must match to register', () => {
    cy.visit('/sign-up');
    cy.contains(/Create a Climate Mind account/i).should('be.visible');
    cy.get('input#firstname').type('Test');
    cy.get('input#lastname').type('User');
    cy.get('input#email').type('test.user@example.com');
    cy.get('input#password').type('Password123!');
    cy.get('input#confirmPassword').type('Password1232!');
    cy.contains(/create account and go to feed/i).should('be.disabled');
  });

  it('It shows errors if the first name is invalid', () => {
    cy.visit('/sign-up');
    cy.get('input#firstname').type('T');
    cy.get('input#email').click();
    cy.contains('Name must be at least 2 characters');
    cy.get('input#firstname').type(
      'TestUser10TestUser10TestUser10TestUser10TestUser10Q'
    );
    cy.contains('Name must be at most 50 characters');
    cy.contains(/create account and go to feed/i).should('be.disabled');
  });

  it('It shows errors if the last name is invalid', () => {
    cy.visit('/sign-up');
    cy.get('input#lastname').type('T');
    cy.get('input#email').click();
    cy.contains('Name must be at least 2 characters');
    cy.get('input#lastname').type(
      'TestUser10TestUser10TestUser10TestUser10TestUser10Q'
    );
    cy.contains('Name must be at most 50 characters');
    cy.contains(/create account and go to feed/i).should('be.disabled');
  });

  it('It shows errors email is invalid', () => {
    cy.visit('/sign-up');
    cy.get('input#email').type('test.example.com');
    cy.get('input#firstname').click();
    cy.contains('Invalid email address');
    cy.contains(/create account and go to feed/i).should('be.disabled');
  });

  it('Password must be valid', () => {
    cy.visit('/sign-up');
    cy.get('input#password').type('Password');
    cy.get('input#firstname').click();
    cy.contains(
      /Invalid Password\. Password must be at least 8 characters and contain one number or one special character/i
    );
    cy.contains(/create account and go to feed/i).should('be.disabled');
  });
});
