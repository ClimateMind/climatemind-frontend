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

// Asumming the user is on the first question answer 10 randomly
Cypress.Commands.add('answerFirstTenQuestions', () => {
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
  });
});

Cypress.Commands.add('acceptCookies', () => {
  window.localStorage.setItem('hasAcceptedCookies', 'true');
});

// Cypress.Commands.add('login', () => {
//   cy.acceptCookies();
//   cy.visit('/login');
//   cy.get('input#email').type('test.user@example.com');
//   cy.get('input#password').type('Password123!');
//   cy.switchToIframe('iframe[title="reCAPTCHA"]').click();
//   cy.contains(/log in/i).click();
//   cy.get('.MuiAlert-root').contains('Welcome back, Test');
// });
Cypress.Commands.add('login', () => {
  cy.acceptCookies();
  cy.route({
    method: 'POST',
    url: /refresh/,
    response: 'fixture:refresh.json',
  });
  //window.sessionStorage.setItem('sessionId', 'b80f6d37-8bfc-4c8b-b51a-7df89d9a9fad')
});

Cypress.Commands.add('logout', () => {
  cy.acceptCookies();
  cy.route({
    method: 'POST',
    url: /refresh/,
    status: 400,
  });
});

Cypress.Commands.add(
  'mockServer',
  (quizId = '62ad879c-5034-4f3c-b497-b5e027e8c245') => {
    cy.server();
    cy.route({
      method: 'POST',
      url: '/login',
      response: 'fixture:login.json',
    });
    cy.route({
      method: 'POST',
      url: '/logout',
      status: 200,
      response: 'fixture:logout.json',
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
      method: 'GET',
      url: `/quizId`,
      response: `{"quizId": "${quizId}"}`,
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
      method: 'POST',
      url: `/session`,
      response: 'fixture:session.json',
    });

    cy.route({
      method: 'GET',
      url: /\/myths\/(\S*)/i,
      response: 'fixture:mythOne.json',
    });
    cy.route({
      method: 'GET',
      url: /\/conversation\/(\S*)/i,
      response: 'fixture:getOneConversation.json',
      status: 201,
    });
    cy.route({
      method: 'POST',
      url: /conversation/i,
      response: 'fixture:postConversation.json',
    });
    cy.route({
      method: 'GET',
      url: /\/solutions?(\?quizId=)?(\S*)/i,
      response: 'fixture:solutions.json',
    });
    cy.route({
      method: 'GET',
      url: '/conversations',
      response: 'fixture:conversations.json',
    });
    cy.route({
      method: 'GET',
      url: '/email',
      response: 'fixture:getEmail.json',
    });
    cy.route({
      method: 'PUT',
      url: '/email',
      response: 'fixture:putEmail.json',
    });

    cy.route({
      method: 'POST',
      url: '/alignment',
      response: 'fixture:postAlignment.json',
    });

    cy.route({
      method: 'GET',
      url: /alignment\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b\/summary/,
      response: 'fixture:getAlignmentSummary.json',
    });

    cy.route({
      method: 'GET',
      // url: /alignment\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/,
      url: /alignment/,
      response: 'fixture:getAlignment.json',
    });

    // Post to record user b visit
    cy.route({
      method: 'POST',
      url: /user-b\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/,
      response: 'fixture:recordUserBVisit.json',
    });

    cy.route({
      method: 'POST',
      url: /password-rest/,
      response: 'fixture:postPasswordReset.json',
    });
  }
);

// Check if element is in viewport
Cypress.Commands.add('isNotInViewport', (element) => {
  cy.get(element).then(($el) => {
    const bottom = Cypress.$(cy.state('window')).height() as number;
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).to.be.greaterThan(bottom);
    expect(rect.bottom).to.be.greaterThan(bottom);
  });
});

Cypress.Commands.add('isInViewport', (element) => {
  cy.get(element).then(($el) => {
    const bottom = Cypress.$(cy.state('window')).height() as number;
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).not.to.be.greaterThan(bottom);
    expect(rect.bottom).not.to.be.greaterThan(bottom);
  });
});

//Switch to iFrame
Cypress.Commands.add('switchToIframe', (iframe) => {
  return cy
    .get(iframe, { force: true })
    .its('0.contentDocument.body')
    .should('be.visible')
    .then(cy.wrap);
});
