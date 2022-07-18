/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';
import { isFeatureEnabled } from '../../src/features';

const conversationsEnabled = isFeatureEnabled.conversations;

conversationsEnabled &&
  describe('Conversations', () => {
    beforeEach(() => {
      cy.acceptCookies();
      cy.server();
      cy.mockServer();
    });

    it('Shows the conversations onboarding and navigate to dash', () => {
      cy.login();
      cy.contains(/Talk/i).click();
      cy.contains(/How to talk about Climate Change/i);
      cy.contains(/Start Talking With People/i).click();
      cy.checkAccessibility(terminalLog);
    });

    it('It shows all the conversations', () => {
      cy.get('[data-testid="dashboard-drawer-closed"]');
      cy.get('[data-testid="dashboard-drawer-button"]').click();
      cy.get('.conversation-card').should('have.length', 2);
      cy.checkAccessibility(terminalLog);
    });

    it('Conversation Card has all the elements', () => {
      cy.get(
        '[data-testid="conversation-card-8872BAFF-284A-4DDF-92E5-8F37A0718F44"]'
      ).within(() => {
        cy.contains(/Ready to talk with betty/i);
        cy.contains(/see how you align/i).should('be.disabled');
        cy.contains(/view selected topics/i).should('be.disabled');
        cy.contains(/yes we talked/i).should('be.disabled');
      });
    });

    it('Conversation can be advanced through all states', () => {
      cy.get(
        '[data-testid="conversation-card-15a523d8-a82f-4c11-bcee-8007a3b9b1d7"]'
      ).within(() => {
        cy.contains(/see how you align/i).click();
        // .should('be.');
        // cy.contains(/view selected topics/i).should('be.disabled');
        // cy.contains(/yes we talked/i).should('be.disabled');
      });
    });

    it.skip('Can see Register button if not logged in', () => {
      cy.visit('/conversations');
      cy.contains(/Register To Start Talking/i);
      cy.visit('/conversations');
      cy.contains(/Register To Start Talking/i);
    });

    //TODO: these test will only work if the user is logged in

    // it('Can Invite a friend', () => {
    //   cy.visit('/conversations');
    //   cy.contains(/Start Talking With People/i).click();
    //   cy.contains('Add their name');
    //   cy.get('input#friend').type('John');
    //   cy.contains(/GENERATE LINK/i).click();
    //   cy.contains(/Unique for John/i);
    //   cy.contains(/http:\/\/localhost:3000\/landing/i);
    //   cy.wait(1);
    //   cy.get('[data-testid="copy-link-button"]').click();
    //   // TODO: This is failing can't replicate the failure in the app when not automated
    //   // cy.wait(1).contains(/link was copied/i);
    // });

    // it('open and close the conversations drawer', () => {
    //   cy.visit('/conversations');
    //   cy.contains(/Start Talking With People/i).click();
    //   cy.get('[data-testid="dashboard-drawer-closed"]');
    //   cy.get('[data-testid="dashboard-drawer-button"]').click();
    //   cy.get('[data-testid="dashboard-drawer-open"]');
    //   cy.get('[data-testid="close-drawer-button"]').click();
    //   cy.get('[data-testid="dashboard-drawer-closed"]');
    // });

    // it('Displays the list of conversations', () => {
    //   cy.visit('/conversations');
    //   cy.contains(/Start Talking With People/i).click();
    //   cy.get('[data-testid="dashboard-drawer-button"]').click();
    //   cy.fixture('conversations.json').then((conversationFixture) => {
    //     const conversations = conversationFixture.conversations;
    //     conversations.forEach((conversation: any) => {
    //       console.log(conversation.conversationId);
    //       cy.get(
    //         `[data-testid="conversation-card-${conversation.conversationId}"]`
    //       ).then(($card) => {
    //         cy.wrap($card).contains(`${conversation.invitedUserName}`);
    //         cy.wrap($card).contains(/Invited to talk/i);
    //       });
    //     });
    //   });
    // });
  });
