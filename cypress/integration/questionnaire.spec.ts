/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Questionnaire loads and looks correct', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.mockServer();
    cy.visit('/questionnaire');
  });

  it('Can open the questionnaire', () => {
    cy.contains('Q1').should('be.visible');
    cy.checkAccessibility(terminalLog);

    /*
      After the questionnaire has loaded we edit the question text so that
      when we capture it with Percy it will always be the same, otherwise we
      will get a diff every time as the first question is random
    */
    // cy.get('#questionText').invoke(
    //   'text',
    //   'They believe they should always show respect to their parents and to older people. It is important to them to be obedient.'
    // );
    cy.contains('Having a stable government is important to you').should(
      'be.visible'
    );
  });

  it('Can answer questions in the questionnaire', () => {
    cy.contains('Like Me').should('be.visible').click();
    cy.contains('Q2').should('be.visible');
  });

  // TODO: Write test to cover the scenario of completing only 10 questions
  it('Can complete the questionnaire with 20 random answers', () => {
    cy.get('[data-testid="totalQuestions"]').should(($elem) => {
      expect($elem.text()).to.contain('/10');
    });
    cy.fixture('questions').then((questions) => {
      let question = 1;
      while (question <= 10) {
        const randomAnswer = Math.floor(Math.random() * 6);
        const nextQuestion =
          question < 10 ? `Q${question + 1}` : 'Woah! You are doing great!';
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
    });
    cy.url().should('include', '/submit');
    // now lets see if we can answer the remaining 10 questions of Set Two...
    cy.get('[data-testid="finish-quiz-button"]').click();
    cy.contains('Q11').should('be.visible');
    cy.get('[data-testid="totalQuestions"]').should(($elem) => {
      expect($elem.text()).to.contain('/20');
    });
    let i = 10;
    while (i < 20) {
      cy.contains(`Q${i + 1}`).should('be.visible');
      cy.contains('Very Much Like Me').click();
      i++;
    }
    cy.contains('Woohoo! Good Job!').should('be.visible');
    cy.url().should('include', '/submit-set-two');
  });

  it('loads the previous question when using back button', () => {
    // TODO: Add back the ability to use the custom cy forward and back commands to navigate questions
    cy.contains('Q1').should('be.visible');
    cy.contains('Having a stable government is important to you.');
    cy.get('[data-name="icon/content/add_24px"]').should('not.be.visible');
    cy.get('[data-testid="PrevButton"]').should('not.be.visible');
    cy.contains('Not Like Me At All').click();

    cy.contains('Q2').should('be.visible');
    cy.contains('You always want to be the one who makes the decisions');
    //check back arrow icon is visible
    cy.get('[data-name="icon/content/add_24px"]').should('be.visible');
    cy.get('[data-testid="PrevButton"]').should('be.visible').click();
    cy.contains('Q1').should('be.visible');
    cy.contains('Having a stable government is important to you.');
    //check that navigating to the next question still works after going back
    cy.contains('Not Like Me At All').click();
    cy.contains('Q2').should('be.visible');
    // cy.goToNextQuestion();
  });
});
