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
  return Number(text.substring(1, text.length));
}

Cypress.Commands.add('checkAccessibility', (logType) => {
  cy.injectAxe();
  cy.checkA11y(
    null,
    {
      includedImpacts: ['serious', 'critical'],
      rules: {
        'color-contrast': {
          enabled: false,
        },
      },
    },
    logType
  );
});

Cypress.Commands.add('goToNextQuestion', () => {
  //figure out what question we are on
  cy.get('[data-testid="questionNumber"]').then(($h4) => {
    const text = $h4.text();
    const nextQuestion = String(getCurrentQuestion(text) + 1);

    cy.contains('Like Me').should('be.visible').click();
    //assert that we are seeing the next question
    cy.get('[data-testid="Question"] h4').should(
      'have.text',
      `Q${nextQuestion}`
    );
  });
});

Cypress.Commands.add('goToPreviousQuestion', () => {
  //figure out what question we are on
  // TODO:this test is failing
  cy.get('[data-testid="questionNumber"]').then(($h4) => {
    const text = $h4.text();
    const question = text[1];
    console.log(question);

    expect(text).to.be('Q1');
    const prevQuestion = String(getCurrentQuestion(text) - 1);

    cy.get('[data-testid="PrevButton"]').click();
    //assert that we are seeing the previous question
    cy.get('[data-testid="Question"] h4').should(
      'have.text',
      `Q${prevQuestion}`
    );
  });
});

Cypress.Commands.add('acceptCookies', () => {
  window.localStorage.setItem('hasAcceptedCookies', 'true');
});

Cypress.Commands.add('setSession', () => {
  window.localStorage.setItem('sessionId', '1234');
});

Cypress.Commands.add('login', () => {
  cy.acceptCookies();
  cy.visit('/login');
  cy.get('input#email').type('test.user@example.com');
  cy.get('input#password').type('Password123!');
  cy.contains(/log in/i).click();
  cy.get('.MuiAlert-root').contains('Welcome, Test T User');
});

Cypress.Commands.add('mockServer', (quizId = '1234') => {
  // TODO: Mock server

  cy.server();
  cy.route({
    method: 'POST',
    url: '/login',
    response: 'fixture:login.json',
  });
  cy.route({
    method: 'POST',
    url: '/register',
    response: 'fixture:register.json',
  });
  cy.route({
    method: 'GET',
    url: '/questions',
    response: 'fixture:questions.json',
  });
  cy.route({
    method: 'POST',
    url: '/scores',
    response: `{"quizId": "${quizId}"}`,
    status: 201,
  });
  cy.route({
    method: 'GET',
    url: /\/personal_values?(\?quizId=)?(\S*)/i, //persional-values?quizId=1234
    response: 'fixture:personal-values.json',
  });
  cy.route({
    method: 'GET',
    url: /\/feed?(\?quizId=)?(\S*)/i, // feed?quizId=1234
    response: 'fixture:climate-feed.json',
  });
  cy.route({
    method: 'GET',
    url: `/myths`,
    response: 'fixture:myths.json',
  });

  cy.route({
    method: 'POST',
    url: `/subscribe`,
    response: 'fixture:subscribe.json',
  });

  cy.route({
    method: 'POST',
    url: `/post-code`,
    response: 'fixture:zipCode.json',
  });

  cy.route({
    method: 'GET',
    url: /\/myths\/(\S*)/i,
    response: 'fixture:mythOne.json',
  });
  cy.route({
    method: 'GET',
    url: /\/solutions?(\?quizId=)?(\S*)/i,
    response: 'fixture:solutions.json',
  });
});
