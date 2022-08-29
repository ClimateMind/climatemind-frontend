/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('View Selected Topics Page', () => {
    beforeEach(() => {
        cy.acceptCookies();
        cy.mockServer();
        cy.login();
        cy.visit('/user-a-shared-feed/9F20CC7C-C0F5-47B3-B235-33CBE0755251');
    })

    it('It has the correct url', () => {
        // cy.get('View Selected Topics').click()
        cy.url().should('include', )
    })
})