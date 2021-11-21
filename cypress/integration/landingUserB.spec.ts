/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Landing user B', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.server();
    cy.mockServer();
  });

  const mockQuizId = '1234';

  it('Shows the landing page for user B', () => {
    cy.visit('/landing/d63b3815-7d0e-4097-bce0-d5348d403ff6');
    cy.checkAccessibility(terminalLog);
    cy.contains(/You're invited you to take our core values quiz!/i);
    cy.contains(
      /Talking about climate change is the most effective way to take action./i
    );
    cy.get('[data-testid="framing-button"]').contains('Framing');
    cy.get('[data-testid="how-cm-works-button"]')
      .contains('Next: How does ClimateMind work?')
      .click();
    cy.contains(/take the quiz/i).click();
    cy.url().should('include', 'questionnaire');
  });

  it('should only make the user answer 10 questions', () => {
    cy.fixture('questions').then((questions) => {
      let question = 1;
      while (question <= 10) {
        const randomAnswer = Math.floor(Math.random() * 6);
        const nextQuestion =
          question < 10 ? `Q${question + 1}` : 'Your top 3 core values!';
        cy.contains(`${questions.Answers[randomAnswer].text}`).click();
        if (question * 10 < 100) {
          // We're haven't finished yet so we'll check the progress bar
          cy.get("[role='progressbar']").should(
            'have.attr',
            'aria-valuenow',
            question * 10
          );
        }
        cy.contains(nextQuestion).should('be.visible');
        question++;
      }
      cy.url().should('include', 'core-values');
    });
  });
  it('does not make a returing user do the quiz again', () => {
    window.localStorage.setItem('quizId', mockQuizId);
    cy.visit('/landing/d63b3815-7d0e-4097-bce0-d5348d403ff6');
    cy.url().should('include', '/core-values');
    cy.contains(/Your top 3 core values/i);
  });
});
