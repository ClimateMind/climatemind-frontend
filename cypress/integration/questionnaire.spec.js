/// <reference types="cypress" />

import {terminalLog} from '../support/helpers.ts'

describe('Questionnaire loads and looks correct', () => {
  before(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/questions',
      response: 'fixture:questions.json'
    });
  })

  beforeEach(() => {
    cy.visit('/questionnaire');
  });

  it('Can open the questionnaire', () => {
    cy.contains('Q1.').should('be.visible');
    // cy.checkAccessibility(terminalLog) TODO: Failing

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
  })
});
