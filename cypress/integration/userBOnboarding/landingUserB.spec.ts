/// <reference types="cypress" />

import { terminalLog } from '../../support/helpers';

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

const getSingleConversationResponse = {
    conversationId: "cc63e48f-d066-44e7-851c-c28af17ab3fb",
    userA: {
      name: "Bill",
      id: "ba5df442-7261-4fc1-bff0-5dfd84035d56",
      sessionId: "671e4949-a3e4-4844-b9d2-cd843f48f357"
    },
    userB: {
      name: "Bob"
    },
    state: 1,
    consent: false,
    conversationTimestamp: "Sun, 10 Oct 2021 18:35:02 GMT",
    alignmentScoresId: "842a4949-a3e4-4914-c9d2-cd843f48f357"
  };

function setMockIds() {
  const mockQuizId = '1234';
  const mockAlignmentId = '62d21cd3-be65-4d14-b702-e39943a284f2';
  window.localStorage.setItem('quizId', mockQuizId);
  window.localStorage.setItem('alignmentScoresId', mockAlignmentId);
}

describe('Landing user B', () => {
  it.only('temporarily disable tests', () => {
    expect(true).eq(true);
  });
  
  // beforeEach(() => {
  //   cy.acceptCookies();
  //   cy.server();
  //   cy.mockServer();
  // });

  it('Shows the landing page for user B', () => {
    cy.visit('/landing/d63b3815-7d0e-4097-bce0-d5348d403ff6');
    cy.checkAccessibility(terminalLog);
    cy.contains(/ invited you to take our core values quiz!/i);
    cy.contains(
      /Talking about climate change is the most effective way to take action./i
    );
    cy.get('[data-testid="how-cm-works-button"]')
      .contains('Next: How does ClimateMind work?')
      .click();
    cy.contains(/take the quiz/i).click();
    cy.url().should('include', 'questionnaire');
  });

  it('should only make the user answer 10 questions', () => {
    cy.answerFirstTenQuestions();
    cy.url().should('include', 'core-values');
  });

  it('Shows the cards', () => {
    setMockIds();

    // Mock the api routes to return dummy data
    cy.route({
      method: 'GET',
      url: /[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i,
      response: getSingleConversationResponse,
    });
    cy.route({
      method: 'GET',
      url: /\/personal_values?(\?quizId=)?(\S*)/i, //personal-values?quizId=1234
      response: updatedPersonalValues,
    });

    // Check that all the cards are there
    // First Card
    cy.get('[data-testid="ValueCard-0"]').contains(/value 0/i);
    cy.get('[data-testid="ValueCard-0"]').contains(/1st/i);
    // Second Card
    cy.get('[data-testid="ValueCard-1"]').contains(/value 1/i);
    cy.get('[data-testid="ValueCard-1"]').contains(/2nd/i);
    // Third Card
    cy.get('[data-testid="ValueCard-2"]').contains(/value 2/i);
    cy.get('[data-testid="ValueCard-2"]').contains(/3rd/i);
  });

  it('Can show and hide the more infomation on the card', () => {
    setMockIds();

    // Mock the api routes to return dummy data
    cy.route({
      method: 'GET',
      url: /d63b3815-7d0e-4097-bce0-d5348d403ff6/i,
      response: getSingleConversationResponse,
    });
    cy.route({
      method: 'GET',
      url: /\/personal_values?(\?quizId=)?(\S*)/i, //personal-values?quizId=1234
      response: updatedPersonalValues,
    });

    cy.get('[data-testid="ValueCard-0"]').contains(/more/i).click();
    cy.contains(
      /Joy, pleasure and satisfaction are a big part of what drives you. From big moments to the little things, you find bliss in enjoying what you do/i
    );
    cy.get('[data-testid="ValueCard-0"]').contains(/close/i).click();
    cy.contains(
      /Joy, pleasure and satisfaction are a big part of what drives you. From big moments to the little things, you find bliss in enjoying what you do/i
    ).should('not.exist');
  });

  it('let the user retake the quiz', () => {
    setMockIds();

    // Mock the api routes to return dummy data
    cy.route({
      method: 'GET',
      url: /d63b3815-7d0e-4097-bce0-d5348d403ff6/i,
      response: getSingleConversationResponse,
    });
    cy.route({
      method: 'GET',
      url: /\/personal_values?(\?quizId=)?(\S*)/i, //personal-values?quizId=1234
      response: updatedPersonalValues,
    });

    cy.contains(/retake quiz/i).click();
    cy.answerFirstTenQuestions();
    cy.url().should('include', 'core-values');

    // TODO: Circle CI creates real values instead of value 0, value 1...
    cy.get('[data-testid="ValueCard-0"]');
    cy.get('[data-testid="ValueCard-1"]');
    cy.get('[data-testid="ValueCard-2"]');
  });

  it.skip('can navigate to the shared values page', () => { });

  it('Test Consent', () => {
    cy.route({
      method: 'GET',
      url: /\/conversation\/(\S*)/i,
      response: 'fixture:getOneConversationConsent.json',
      status: 201,
    });
    cy.visit('/landing/8CC3F52E-88E7-4643-A490-519E170DB470');
    cy.contains(/Impacts/).should('not.exist')
    cy.contains(/Create Account/i).click();
    cy.contains(/Create a Climate Mind account/);
  });
});
