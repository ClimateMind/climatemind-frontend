describe ('User B', () => {
  beforeEach(() => {
    cy.clock();

    // Mock the API calls
    cy.intercept('POST', '/session', { sessionId: '4a24b3f8-6743-4173-b8fb-e461a4537ed6' });
    cy.intercept('POST', '/analytics', { status: 201 });
    cy.intercept('GET', '/questions', { fixture: 'questions.json' });
    cy.intercept('POST', 'http://localhost:5000/scores', { quizId: '4a24b3f8-6743-4173-b8fb-e461a4537ed6' });
    cy.intercept('GET', '/personal_values*', { status: 200, fixture: 'personal-values.json' });
    // cy.intercept('POST', '/register', { status: 201, fixture: 'sign-up.json' });
  });

  it('allows new userB to go through the quiz', () => {
    // Load the UserBLandingPage and accept cookies
    // cy.visit('/landing/4a24b3f8-6743-4173-b8fb-e461a4537ed6');
    cy.visit('/how-cm-works/4a24b3f8-6743-4173-b8fb-e461a4537ed6');
    cy.get('button').contains(/accept/i).click();

    // Transition to UserBHowCmWorksPage through button click
    // cy.get('button').contains(/how does climatemind work/i).click();
    cy.location('pathname').should('include', '/how-cm-works');

    // Transition to UserBQuizPage through button click
    cy.get('button').contains(/take the quiz/i).click({ force: true });
    cy.location('pathname').should('include', '/questionnaire');

    // Complete the quiz.
    for (let i = 0; i < 10; i++) {
      cy.contains('Q' + (i+1));
      cy.contains('/10')
      cy.contains(/not like me at all/i).click({ force: true });
      cy.tick(300); // Skip the animation between questions
      cy.wait(100); // Wait for the next question to appear
    }

    // Verify results
    cy.location('pathname').should('include', '/core-values');
    cy.contains(/power/i).should('be.visible');
    cy.contains(/security/i).should('be.visible');
    cy.contains(/tradition/i).should('be.visible');
  });
});
