////To Test clicking recaptcha
describe('Login With Recaptcha', () => {
    it('should let you switch to the iframe', () => {
        cy.visit('/login');
        cy.contains(/Accept/i).click({ force: true });
        cy.loginWithRecaptcha("anna@example.com", "@Anna1234!");
        cy.switchToIframe('iframe[title="reCAPTCHA"]').click();
        cy.clickLoginButton();
    });
});