/// <reference types="cypress" />
import { isFeatureEnabled } from '../../src/features';

const conversationId = 'c1566490-052d-44a0-a8a5-1ac8b9193a96';

describe('Invited User Journey', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.mockServer();
    cy.login();
  });

  it('allows link to be shared', () => {
    if (isFeatureEnabled.conversations) {
      cy.visit('/conversations');
      cy.contains(/start talking with people/i).click();
      cy.contains(/create link/i).should('be.disabled');
      cy.get('input#friend').type('John');
      cy.contains(/create link/i).click();
      cy.contains(/unique for john/i);
      cy.contains(/\/landing/i);
    }
  });

  // it('displays the landing page', () => {
  //   cy.visit(`landing/${conversationId}`);
  //   cy.get('#AppBar');
  //   cy.contains(
  //     /Your friend would like you to take a personal values questionnaire/i
  //   );
  //   cy.contains(/TAKE THE QUIZ/i);
  // });

  // it('allows user to take the quiz', () => {
  //   cy.visit(`landing/${conversationId}`);
  //   cy.contains(/TAKE THE QUIZ/i).click();
  //   cy.url().should('include', '/questionnaire');
  // });
});
