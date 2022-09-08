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
    logout(): void;

    /**
     * A command to go mock the api responses
     */
    mockServer(sessionId?: string): void;

    /**
     * A command to switch to click recaptcha iframe
     */
    switchToIframe(iframeName: any): any;

    /**
     * A command to login with the recaptcha clicked
     */
    loginWithRecaptcha(email: string, password: string): void;

    /**
     * A command to click the login button
     */
    clickLoginButton(): void;

    answerFirstTenQuestions(): void;

    isInViewport(elementMatcher: string): void;

    isNotInViewport(elementMatcher: string): void;
  }
}
