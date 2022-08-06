/// <reference types="cypress" />

import { terminalLog } from '../../support/helpers';

function setMockIds() {
  const mockQuizId = '1234';
  const mockAlignmentId = '62d21cd3-be65-4d14-b702-e39943a284f2';
}

describe('Consent', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.server();
    cy.mockServer();
    setMockIds();
  });

  it('user can click the not now button', () => {
    window.localStorage.setItem(
      'alignmentScoresId',
      '3bbafa3f-0c55-44ab-9b6c-b318e43ad1e3'
    );
    // window.localStorage.setItem('quizId', '2244');
    // console.log(window.localStorage);
    cy.visit('/shared-summary');
    cy.checkAccessibility(terminalLog);
    cy.contains(/sharing is caring/i);
    cy.contains(/not now/i).click();
    cy.url().should('include', 'user-b-no-consent');
  });

  it('user can go back to impacts', () => {
    cy.checkAccessibility(terminalLog);
    cy.contains(/back to impacts/i).click();
    cy.url().should('include', 'shared-impacts');
  });

  it.skip('shows the correct summary for a user', () => {
    // TODO: [CM-1088] Implement cypress tests for user B sharing summary
  });

  it.skip('allows the user to consent to share', () => {
    // TODO:
  });
});
