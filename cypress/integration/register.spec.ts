/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Onboarding loads, looks correct and the quiz can start', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.setSession();
    cy.mockServer('1234');
  });

  it('User can visit the register page', () => {
    cy.visit('/sign-up');
    cy.contains(/Create an Climate Mind account/i).should('be.visible');
    cy.contains('Save your results and access your climate feed anytime.');
    cy.checkAccessibility(terminalLog);
    cy.percySnapshot('SignUp');
    cy.contains(/create account and go to feed/i).should('be.disabled');
  });

  it('User Can complete the form and register', () => {
    cy.get('input#fullname').type('Test User');
    cy.get('input#email').type('test.user@example.com');
    cy.get('input#password').type('Password123!');
    cy.get('input#confirmPassword').type('Password123!');
    cy.contains(/create account and go to feed/i).click();
    cy.url().should('include', 'climate-feed');
    cy.contains('Your Personal Climate Feed');
  });

  it('User can skip registration', () => {
    cy.visit('/sign-up');
    cy.contains(/Create an Climate Mind account/i).should('be.visible');
    cy.contains(/skip making an account and see feed/i).click();
    cy.url().should('include', 'climate-feed');
    cy.contains('Your Personal Climate Feed');
  });

  it('Passwords must match to register', () => {
    cy.visit('/sign-up');
    cy.contains(/Create an Climate Mind account/i).should('be.visible');
    cy.get('input#fullname').type('Test User');
    cy.get('input#email').type('test.user@example.com');
    cy.get('input#password').type('Password123!');
    cy.get('input#confirmPassword').type('Password1232!');
    cy.contains(/create account and go to feed/i).should('be.disabled');
  });

  it('Passwords must match to register', () => {
    cy.visit('/sign-up');
    cy.contains(/Create an Climate Mind account/i).should('be.visible');
    cy.get('input#fullname').type('Test User');
    cy.get('input#email').type('test.user@example.com');
    cy.get('input#password').type('Password123!');
    cy.get('input#confirmPassword').type('Password1232!');
    cy.contains(/create account and go to feed/i).should('be.disabled');
  });

  it('It shows errors if the user name is invalid', () => {
    cy.visit('/sign-up');
    cy.get('input#fullname').type('T');
    cy.get('input#email').click();
    cy.contains('Name must be at least 2 characters');
    cy.get('input#fullname').type(
      'TestUser10TestUser10TestUser10TestUser10TestUser10Q'
    );
    cy.contains('Name must be at most 50 characters');
    cy.contains(/create account and go to feed/i).should('be.disabled');
  });

  it('It shows errors email is invalid', () => {
    cy.visit('/sign-up');
    cy.get('input#email').type('test.example.com');
    cy.get('input#fullname').click();
    cy.contains('Invalid email address');
    cy.contains(/create account and go to feed/i).should('be.disabled');
  });

  it('Password must be valid', () => {
    cy.visit('/sign-up');
    cy.get('input#password').type('Password123');
    cy.get('input#fullname').click();
    cy.contains(
      /Password must be between 8-20 characters and containt at least one uppercase letter, one lowercase letter, one number and one special character/i
    );
    cy.contains(/create account and go to feed/i).should('be.disabled');
  });
});
