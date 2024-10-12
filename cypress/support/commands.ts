// In your commands.js or commands.ts file
Cypress.Commands.add('loginWithGoogle', () => {
  cy.log('Starting Google login process');

  // Visit the page where Google login is implemented
  cy.visit('/');

  // Wait for the Google Sign-In SDK to potentially load
  cy.wait(1000); // Adjust this wait time as necessary

  // Mock the Google Sign-In API
  cy.window().then((win) => {
    win.google = {
      accounts: {
        id: {
          initialize: cy.stub().as('googleInitialize'),
          prompt: cy.stub().as('googlePrompt'),
          callback: cy.stub().as('googleCallback'),
        },
      },
    };
  });

  cy.get('button')
    .contains(/accept/i)
    .click();
  cy.wait(1000);
  cy.get('button').contains(/login/i).click();

  // Trigger the Google login process
  cy.contains('button', /log in with google/i).click();

  // Intercept the initialization of Google Sign-In
  cy.get('@googleInitialize').should('be.called');

  // Simulate the Google credential response
  cy.window().then((win) => {
    const mockCredentialResponse = {
      credential:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MGY2ZTcwZWY0YjU0OGE1ZmQ5MTQyZWVjZDFmYjhmNTRkY2U5ZWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDg0ODk2MjY2Ny12dTQya3A0MmJhMTZxM21jMWFoOGw4cm1tMDI4anNrZi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQwODQ4OTYyNjY3LXZ1NDJrcDQyYmExNnEzbWMxYWg4bDhybW0wMjhqc2tmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEwNTUyOTU0MTYwNTY0MzY3MzUzIiwiZW1haWwiOiJraXJzdGllLmwuaGF5ZXNAZ29vZ2xlbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzI4NjUzMzYyLCJuYW1lIjoiS2lyc3RpZSBIIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tfQWU1TlpWVnlkbjR3ck9panRxdzA1OHdKYmNxRGJDNE1jbmlpX21QVTRqVVdhdGc9czk2LWMiLCJnaXZlbl9uYW1lIjoiS2lyc3RpZSIsImZhbWlseV9uYW1lIjoiSCIsImlhdCI6MTcyODY1MzY2MiwiZXhwIjoxNzI4NjU3MjYyLCJqdGkiOiIyMDlmYjFjMmIzZGFhZDljNWY1MjhlNDVlYWQ2ZjQwZDFiMmY3ZjJiIn0.uUWZGh-AyBUK-QSUaXpxY1caonOznq-Lkm4QFdxrZJTFpSUiXbdogHcUfESTgv59Wc9Cvzr_yJHNKa3wU-CMXtw5bfmwbpgG84sPF_rOrZyN_6hxBjqVhgH5yxE9DTBDR0D4QF_wjdylPhBPpqEz4XGoRXQv7_3OVzxvO7QPlZMRjElYqUJ8pvccMzEgVfkRPALkq49wGwk6o2rQKbONR0sGyOpqWWzMp79s7DGACextBS5VYzt6Enf7Ts2ZVJBD5H9SwSO1YQC-bckMQev32UKtZmap5ZDl4WYNkLFKK5wgFL6RCS6vXdrbfMTQSGfJ8O2rqu946K68qsVDT7TlPA',
    };

    // Get the callback function that was passed to initialize
    const initializeCall = win.google.accounts.id.initialize.getCall(0);
    const options = initializeCall.args[0];
    const callback = options.callback;

    // Call the callback function with the mock credential
    callback(mockCredentialResponse);
  });

  // Intercept the POST request to your backend
  cy.intercept('POST', '**/auth/google').as('googleAuth');

  // Wait for the auth request to complete
  cy.wait('@googleAuth').then((interception) => {
    expect(interception.response.statusCode).to.eq(200);
  });

  // Check for successful login (adjust according to your app's behavior)
  cy.url().should('include', '/climate-feed');
});
