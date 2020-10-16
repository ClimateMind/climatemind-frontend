/// <reference types="cypress" />

import { terminalLog } from '../support/helpers.ts';

describe('Questionnaire loads and looks correct', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/questions',
      response: 'fixture:questions.json',
    });
    cy.visit('/questionnaire');
  });

  it('Can open the questionnaire', () => {
    cy.contains('Q1.').should('be.visible');
    cy.checkAccessibility(terminalLog)

    /*
      After the questionnaire has loaded we edit the question text so that
      when we capture it with Percy it will always be the same, otherwise we
      will get a diff every time as the first question is random
    */
    cy.get('h6').invoke(
      'text',
      'They believe they should always show respect to their parents and to older people. It is important to them to be obedient.'
    );
    cy.contains('important to them to be obedient').should('be.visible');
    cy.percySnapshot('Questionnaire');
  });

  it('Can answer questions in the questionnaire', () => {
    cy.contains('Like Me').should('be.visible').click();
    cy.contains('Q2.').should('be.visible');
  });

  it('Can complete the questionnaire with random answers', () => {
    cy.fixture('questions').then((questions) => {
      let question = 1;
      while (question <= 10) {
        const randomAnswer = Math.floor(Math.random() * 6);
        const nextQuestion =
          question < 10 ? `Q${question + 1}` : 'Woohoo! Good Job!';
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
    cy.contains('Find out my Climate Personality').click()
    cy.url().should('include', '/personal-values')
  });

  it('loads the previous question when using back button', () => {
    cy.goToNextQuestion();
    //check back arrow icon is visible
    cy.get('[data-name="icon/content/add_24px"]').should('be.visible');
    cy.goToPreviousQuestion();
    //check that navigating to the next question still works after going back
    cy.goToNextQuestion();
  });

});
