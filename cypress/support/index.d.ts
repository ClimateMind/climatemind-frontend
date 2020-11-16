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
  }
}
