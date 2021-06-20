/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * A command to check a pages accessibility
     */
    checkAccessibility(log_type: any): void;

    /**
     * A command to go to next question
     */
    goToNextQuestion(): void;

    /**
     * A command to go to previous question
     */
    goToPreviousQuestion(): void;

    /**
     * A command to go set hasAcceptedCookies in localStorage
     */
    acceptCookies(): void;
    /**
     * A command to go set setSession in localStorage to 1234
     */
    setSession(): void;

    /**
     * A command to log the user in
     */
    login(): void;

    /**
     * A command to go mock the api responses
     */
    mockServer(sessionId?: string): void;
  }
}
