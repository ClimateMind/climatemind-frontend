/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Shared Solutions - User B', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.server();
    cy.mockServer();
  });

  const mockQuizId = '1234';
  const mockAlignmentScoresId = '1234';

  it('does not make a returing user do the quiz again', () => {
    window.localStorage.setItem('quizId', mockQuizId);
    window.localStorage.setItem('alignmentScores', mockAlignmentScoresId);
    cy.visit('/shared-solutions');
    cy.checkAccessibility(terminalLog);
    cy.url().should('include', '/shared-solutions');
    cy.contains(/Climate solutions for you and Stevie/i);
  });

// TODO: complete this when backend can provide data
//   it('Shows the shared solutions cards', () => {
//     window.localStorage.setItem('quizId', mockQuizId);
//     window.localStorage.setItem('alignmentScores', mockAlignmentScoresId);
//     cy.visit('/shared-solutions');
//     // Check that all the cards are there
//     // First Card
//     cy.get('[data-testid="SharedImpactCard-R9x3oCu22QJK9ebw5xL7NvB-testid"]').contains(/Increase in coral bleaching and destruction/i);
//     // Second Card
//     cy.get('[data-testid="SharedImpactCard-R7Yo5FYFleUwkbXjCU3xo4E-testid"]').contains(/Decrease in test scores/i);
//     // Third Card
//     cy.get('[data-testid="SharedImpactCard-RnbPKhyIQNnShkRKHqGrGm-testid"]').contains(/Increase in flooding of land and property/i);
//   });

//   it('Can show and hide the more infomation on the card', () => {
//     ...
//   });

});
