// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@percy/cypress';

function getCurrentQuestion(text: String) {
  return Number(text.substring(1, text.length - 1));
}

Cypress.Commands.add('checkAccessibility', (logType) => {
  cy.injectAxe()
  cy.checkA11y(null, {
    includedImpacts: ['serious', 'critical'], 
    rules: {
      'color-contrast': {
         enabled: false
       }
    }
  }, logType)
})

Cypress.Commands.add('goToNextQuestion', () => {
  //figure out what question we are on
  cy.get('[data-testid="Question"] h4').then(($h4) => {
    const text = $h4.text();
    const nextQuestion = String(getCurrentQuestion(text) + 1);

    cy.contains('Like Me').should('be.visible').click();
    //assert that we are seeing the next question
    cy.get('[data-testid="Question"] h4').should('have.text', `Q${nextQuestion}.`)
  });
});

Cypress.Commands.add('goToPreviousQuestion', () => {
  //figure out what question we are on
  cy.get('[data-testid="Question"] h4').then(($h4) => {
    const text = $h4.text();
    const prevQuestion = String(getCurrentQuestion(text) - 1);

    cy.get('[data-testid="PrevButton"]').click();
    //assert that we are seeing the previous question
    cy.get('[data-testid="Question"] h4').should('have.text', `Q${prevQuestion}.`);
  });
});