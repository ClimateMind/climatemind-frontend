/// <reference types="cypress" />

describe('Invited User Journey', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.mockServer();
  });

  it('allows link to be shared', () => {
    cy.login();
    cy.wait(1).contains(/talk/i).click();
    cy.contains(/start talking with people/i).click();
    cy.contains(/generate link/i).should('be.disabled');
    cy.get('input#friend').type('John');
    cy.contains(/generate link/i).click();
    cy.contains(/unique for john/i);
    cy.contains(/\/landing/i);
  });

  it('displays the landing page', () => {
    cy.visit('/landing');
    cy.get('#AppBar');
    cy.contains(
      /Your friend would like you to take a personal values questionnaire/i
    );
    cy.contains(/TAKE THE QUIZ/i);
  });

  it('allows user to take the quiz', () => {
    cy.visit('/landing');
    cy.contains(/TAKE THE QUIZ/i).click();
    cy.url().should('include', '/questionnaire');
  });
});
