/// <reference types="cypress" />

import { terminalLog } from '../support/helpers.ts';

describe('Personal values page loads and looks correct', () => {
  beforeEach(() => {
    const sessionId = 'fake-session=id';

    cy.server();
    cy.route({
      method: 'GET',
      url: '/questions',
      response: 'fixture:questions.json',
    });
    cy.route({
      method: 'POST',
      url: '/scores',
      response: `{"sessionId": "${sessionId}"}`,
    });
    cy.route({
      method: 'GET',
      url: `/personal_values?session-id=${sessionId}`,
      response: 'fixture:personal-values.json',
    });
  });

  it('can complete questionnaire and see personal values', () => {
    cy.visit('./questionnaire');
    let i = 0;
    while (i < 10) {
      cy.contains(`Q${i + 1}`).should('be.visible');
      cy.contains('Very Much Like Me').click();
      i++;
    }
    cy.contains('Find out my Climate Personality').click();
    cy.contains('This is your Climate Personality').should('be.visible');

    // Check personality cards
    cy.contains('Security').should('be.visible');
    cy.get('[data-testid="CMCardMore"]').each((moreButton) => {
      cy.get(moreButton).should('have.text', 'MORE');
    });
    cy.get('[data-testid="CMCardMore"]').first().click();
    cy.get('[data-testid="CMCardMore"]').first().should('have.text', 'LESS');
    cy.contains(
      'What is important to you is the safety, harmony and stability of society',
    ).should('be.visible');

    // need to remove the animations for the percysnapshot
    cy.get('[data-testid="CMCard-Image"]').invoke('attr', 'style', '');
    cy.percySnapshot('Personal Values');
  });

  context('onwards navigation works', () => {
    beforeEach(() => {
      cy.visit('/personal-values');
    });

    it('can retake the quiz', () => {
      cy.contains('Climate Personality not quite right?').should('be.visible');
      cy.contains('Retake the Quiz').should('be.visible').click();
      cy.contains('Q1').should('be.visible');
    });

    it('can move on to climate feed', () => {
      cy.contains(
        'Ready to see how you can take action against climate change?',
      ).should('be.visible');
      cy.contains('Yes I’m ready!').should('be.visible').click();
      cy.url().should('include', '/climate-feed');
    });
  });
});
