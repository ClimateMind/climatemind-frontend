/// <reference types="cypress" />

describe('Invited User Journey', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.mockServer();
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
