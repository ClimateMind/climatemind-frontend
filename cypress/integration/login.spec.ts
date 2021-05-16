/// <reference types="cypress" />

import { template } from 'cypress/types/lodash';
import { terminalLog } from '../support/helpers';

describe('Onboarding loads, looks correct and the quiz can start', () => {
  const testUser = {
    email: 'test.user@example.com',
    password: 'Password123!',
  };

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

  it('has the menu bar', () => {
    cy.visit('/login');
    cy.get('#AppBar');
  });

  it('allows the user to navigate to the login page from homepage', () => {
    cy.visit('/');
    cy.contains(/Login here/i).click();
    cy.contains(/Sign In/i).should('be.visible');
    cy.checkAccessibility(terminalLog);
    cy.percySnapshot('Login');
  });

  it('has a login button and it is initially disabled', () => {
    cy.contains(/Log In/i).should('be.disabled');
  });

  it('shows the login link in the hamburger menu', () => {});

  it('allows a user to login with valid account details', () => {
    cy.visit('/login');

    cy.get('input#email').type(testUser.email);
    cy.get('input#password').type(testUser.password);
    cy.contains(/log in/i).click();
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
    cy.contains(/Please enter your password/i);
  });
  it.only('does not let the user in with invalid credentials', () => {
    cy.route({
      method: 'POST',
      url: '/login',
      response: 'fixture:badLogin.json',
    });

    cy.visit('/login');
    cy.get('input#email').type(testUser.email);
    cy.get('input#password').type(testUser.password);
    cy.contains(/log in/i).click();
    cy.url().should('include', '/login');
  });
});
