declare namespace Cypress {
  interface Chainable {
    loginWithGoogle(): Chainable<void>;
  }
}
