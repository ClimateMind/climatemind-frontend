/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('User Account Menu', () => {
  beforeEach(() => {
    cy.mockServer();
    cy.login();
    cy.visit('/climate-feed');
    cy.get('#AccountIcon').click();
  });

  it('has all the buttons', () => {
    cy.get('#UpdateEmailButton');
    cy.get('#LogoutButton');
  });

  it('lets the user change the password', () => {
    cy.get('#UpdateEmailButton').click();
    cy.contains('test233e3@example.com');
    cy.get('#newEmail').type('newEmail@example.com');
    cy.get('#confirmNewEmail').type('newEmail@example.com');
    cy.get('#password').type('Password123');
    cy.get('#ConfirmButton').click();
    cy.contains(/Email updated!/i);
  });

  it('lets the user cancel changing the password', () => {
    cy.get('#UpdateEmailButton').click();
    cy.get('#CancelButton').click();
    cy.get('CMModal').should('not.exist');
  });

  it('lets the user log out', () => {
    cy.get('#LogoutButton').click();
    cy.contains(/Goodbye!/i);
    cy.contains(/Personalize your understanding of climate change/i);
  });
});
