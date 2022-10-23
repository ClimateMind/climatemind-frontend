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
    cy.get('#UpdateEmailButton').click({ force: true });
    cy.contains('test233e3@example.com');
    cy.get('#newEmail').scrollIntoView().type('newEmail@example.com', {force: true});
    cy.get('#confirmNewEmail').scrollIntoView().type('newEmail@example.com', {force: true});
    cy.get('#password').scrollIntoView().type('Password123', {force: true});
    cy.get('#ConfirmButton').scrollIntoView().click({ force: true });
    cy.contains(/Email updated!/i);
  });

  it('lets the user cancel changing the password', () => {
    cy.get('#UpdateEmailButton').click({ force: true });
    cy.get('#CancelButton').click({ force: true });
    cy.get('CMModal').should('not.exist');
  });

  it('lets the user log out', () => {
    cy.get('#LogoutButton').click({ force: true });
    cy.contains(/Goodbye!/i);
    cy.contains(/Personalize your understanding of climate change/i);
  });
});
