describe('New UserA', () => {
  beforeEach(() => {
    cy.clock();

    // Mock the API calls
    cy.intercept('POST', '/session', { sessionId: '4a24b3f8-6743-4173-b8fb-e461a4537ed6' });
    cy.intercept('POST', '/analytics', { status: 201 });
    cy.intercept('GET', '/questions', { fixture: 'questions.json' });
    cy.intercept('POST', 'http://localhost:5000/feedback', { status: 201 });
    cy.intercept('POST', 'http://localhost:5000/scores', { quizId: '4a24b3f8-6743-4173-b8fb-e461a4537ed6' });
    cy.intercept('GET', '/personal_values*', { status: 200, fixture: 'personal-values.json' });
    cy.intercept('POST', '/register', { status: 201, fixture: 'sign-up.json' });
  });

  it('allows new userA to go through 10 questions, see his results (personal values) and sign up', () => {
    // Load the HomePage and accept cookies
    cy.visit('/');
    cy.get('button').contains(/accept/i).click();

    // Transition to the PreQuizPage through button click
    cy.get('button').contains(/get started/i).click({ force: true });
    cy.location('pathname').should('equal', '/start');

    // Transition to the QuizPage through button click
    cy.get('button').contains(/take the quiz/i).click({ force: true });
    cy.location('pathname').should('equal', '/questionnaire');

    // Complete the quiz.
    for (let i = 0; i < 10; i++) {
      cy.contains('Q' + (i+1));
      cy.contains('/10')
      cy.contains(/not like me at all/i).click({ force: true });
      cy.tick(300); // Skip the animation between questions
      cy.wait(100); // Wait for the next question to appear
    }

    // Submit the feedback and finish the quiz
    cy.contains(/bonus/i);
    cy.get('input').type('Some custom feedback');
    cy.get('button').contains(/finish quiz/i).click();

    // Find out the results (personal values)
    cy.location('pathname').should('equal', '/submit');
    cy.get('button').contains(/find out my climate personality/i).click();
    cy.location('pathname').should('equal', '/personal-values');

    cy.contains(/power/i).should('be.visible');
    cy.contains(/security/i).should('be.visible');
    cy.contains(/tradition/i).should('be.visible');

    cy.get('canvas[typeof="radar"]').should('be.visible');

    // Complete by going to the sign up page
    cy.get('button').contains(/dive in/i).click();
    cy.location('pathname').should('equal', '/sign-up');

    // At first the sign up button should be disabled
    cy.get('button').should('be.disabled');

    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@gmail.com');
    cy.get('input[name="password"]').type('asdf1234');
    cy.get('input[name="confirmPassword"]').type('asdf1234');

    // Now the sign up button should be enabled and login the user as well
    cy.get('button').contains(/create account/i).click();
    cy.location('pathname').should('equal', '/climate-feed');
  });

  it('allows new userA to go through 20 questions, see his results (personal values) and sign up', () => {
    // Load the HomePage and accept cookies
    cy.visit('/');
    cy.get('button').contains(/accept/i).click();

    // Transition to the PreQuizPage through button click
    cy.get('button').contains(/get started/i).click({ force: true });
    cy.location('pathname').should('equal', '/start');

    // Transition to the QuizPage through button click
    cy.get('button').contains(/take the quiz/i).click({ force: true });
    cy.location('pathname').should('equal', '/questionnaire');

    // Complete the quiz.
    for (let i = 0; i < 10; i++) {
      cy.contains('Q' + (i+1));
      cy.contains('/10');
      cy.contains(/not like me at all/i).click({ force: true });
      cy.tick(300); // Skip the animation between questions
      cy.wait(100); // Wait for the next question to appear
    }

    // Submit the feedback and finish the quiz
    cy.contains(/bonus/i);
    cy.get('input').type('Some custom feedback');
    cy.get('button').contains(/finish quiz/i).click();

    // Continue with the next 10 questions
    cy.location('pathname').should('equal', '/submit');
    cy.get('button').contains(/continue/i).click();
    cy.location('pathname').should('equal', '/questionnaire');

    // Complete the quiz.
    for (let i = 10; i < 20; i++) {
      cy.contains('Q' + (i+1));
      cy.contains('/20');
      cy.contains(/not like me at all/i).click({ force: true });
      cy.tick(300); // Skip the animation between questions
      cy.wait(100); // Wait for the next question to appear
    }

    // Find out the results (personal values)
    cy.location('pathname').should('equal', '/submit-set-two');
    cy.get('button').contains(/find out my climate personality/i).click();
    cy.location('pathname').should('equal', '/personal-values');

    cy.contains(/power/i).should('be.visible');
    cy.contains(/security/i).should('be.visible');
    cy.contains(/tradition/i).should('be.visible');

    cy.get('canvas[typeof="radar"]').should('be.visible');

    // Complete by going to the sign up page
    cy.get('button').contains(/dive in/i).click();
    cy.location('pathname').should('equal', '/sign-up');
  });
});
