/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

const updatedPersonalValues = {
  personalValues: [
    {
      description:
        'Whether through exploring the world or indulging in your favorite food, you likely love instant gratification and value decisions that reward your senses.',
      id: 'value-0',
      name: 'value 0',
      shortDescription:
        'Joy, pleasure and satisfaction are a big part of what drives you. From big moments to the little things, you find bliss in enjoying what you do.',
    },
    {
      description:
        'Being reliable and devoted to the needs of those around you gives you great satisfaction; you likely do a great deal to keep your close relationships thriving.',
      id: 'value-1',
      name: 'value 1',
      shortDescription:
        'Forgiving, helping, and being loyal are important to you. You likely look to preserve and improve the lives of those that share your core interests or identities.',
    },
    {
      description:
        'Broadminded and selfless, you likely focus on bolstering social justice and equality so that the world is more fair and peaceful for all.',
      id: 'value-2',
      name: 'value 2',
      shortDescription:
        'You care a great deal for the well-being of all people and life. You likely also value diversity and protecting the environment.',
    },
  ],
};

describe('Shared Impacts - User B', () => {
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
    cy.visit('/shared-impacts/8CC3F52E-88E7-4643-A490-519E170DB470');
    cy.checkAccessibility(terminalLog);
    cy.url().should('include', '/shared-impacts');
    cy.contains(/Climate impacts you and/i);
  });

  // TODO: complete this when backend can provide data
  //   it('Shows the shared impacts cards', () => {
  //     window.localStorage.setItem('quizId', mockQuizId);
  //     window.localStorage.setItem('alignmentScores', mockAlignmentScoresId);
  //     cy.visit('/shared-impacts');
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
