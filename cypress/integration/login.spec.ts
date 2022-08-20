/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

const testUser = {
  email: 'test.user@example.com',
  password: 'Password123!',
};

describe('Login', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.mockServer();
    cy.route({
      method: 'POST',
      url: '/refresh',
      status: 400,
    });
  });

  it('has login button on the hamburger bar', () => {
    cy.visit('/');
    cy.get('#AppBar');
    cy.get('#TopMenuToggle').click();
    cy.get('.material-icons').contains('login');
    cy.get('[data-cy="LoginButton"]').click();
    cy.url().should('include', '/login');
  });

  it('allows the user to navigate to the login page from homepage', () => {
    cy.visit('/');
    cy.contains(/Login here/i).click();
    cy.contains(/Sign In/i).should('be.visible');
    cy.url().should('include', '/login');
    cy.checkAccessibility(terminalLog);
  });

  it('has a login button and it is initially disabled', () => {
    cy.contains(/Log In/i).should('be.disabled');
  });

  it('allows a user to login with valid account details', () => {
    cy.visit('/login');
    cy.get('input#email').type(testUser.email);
    cy.get('input#password').type(testUser.password);
    cy.switchToIframe('iframe[title="reCAPTCHA"]').click();
    cy.contains(/log in/i).click();
    cy.get('.MuiAlert-root').contains('Welcome back, Test');
    cy.url().should('include', '/climate-feed');
  });

  it('keeps the user logged in when the page refreshes', () => {
    cy.route({
      method: 'POST',
      url: '/refresh',
      status: 200,
      response: 'fixture:refresh.json',
    });

    cy.reload();
    cy.get('#AccountIcon').contains(/TU/);
  });

  it('User can logout after logging in', () => {
    cy.route({
      method: 'POST',
      url: '/refresh',
      status: 200,
      response: 'fixture:refresh.json',
    });
    cy.get('#TopMenuToggle').click();
    cy.get('.material-icons').contains('logout');
    cy.get('[data-cy="LogoutButton"]').click();
    cy.contains(/Personalize your understanding of climate change/i);
  });

  it('shows an error if an invalid email is entered', () => {
    cy.visit('/login');
    cy.get('input#email').type('test@test@test.com');
    cy.get('input#password').click();
    cy.contains(/Please enter a valid email address/i);
  });

  it('shows an error if no password is entered', () => {
    cy.visit('/login');
    cy.get('input#password').click();
    cy.get('input#email').click();
    cy.contains(/Please enter a password./i);
  });

  it('does not let the user in with invalid credentials', () => {
    cy.route({
      method: 'POST',
      url: '/login',
      response: 'fixture:badLogin.json',
      status: 401,
    });

    cy.visit('/login');
    cy.get('input#email').type(testUser.email);
    cy.get('input#password').type(testUser.password);
    cy.switchToIframe('iframe[title="reCAPTCHA"]').click();
    cy.contains(/log in/i).click();
    cy.url().should('include', '/login');
    cy.get('.MuiAlert-root').contains(/Wrong email or password\. Try again\./i);
  });

  it('user can open password reset dialog and close it again', () => {
    cy.visit('/login');
    cy.contains(/Send reset link/i).click();
    cy.contains(/Reset your password/i);
    cy.contains(/Cancel/i).click();
    cy.contains(/Reset your password/i).should('not.exist');
  });

  it('allows user to request a password reset mail', () => {
    cy.visit('/login');
    cy.contains(/Send reset link/i).click();
    cy.get("input[placeholder=\"Email address\"]").type(testUser.email);
    cy.contains(/Submit/i).click()
    cy.contains(/Reset your password/i).should('not.exist');
  });
});
