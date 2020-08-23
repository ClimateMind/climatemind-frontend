/// <reference types="cypress" />


declare namespace Cypress {
  interface Chainable {
    /**
     * A command to check a pages accessibility
    */
    checkAccessibility(): void;
  }
}
