/// <reference types="cypress" />


declare namespace Cypress {
  interface Chainable {
    /**
     * A test command to show how they're done when using Typescript
    */
    testCommand(): void;
  }
}
