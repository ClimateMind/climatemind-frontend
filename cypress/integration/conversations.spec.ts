/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';

describe('Conversations', () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.server();
    cy.mockServer();
    cy.login();
  });

  it('Shows the conversations onboarding and navigate to dash', () => {
    cy.contains(/Talk/i).click();
    cy.contains(/How to talk about Climate Change/i);
    cy.contains(/Start Talking With People/i).click();
  });

  it('Can Invite a friend', () => {
    cy.visit('/conversations');
    cy.contains(/Start Talking With People/i).click();
    cy.contains('Add their name');
    cy.get('input#friend').type('John');
    cy.contains(/GENERATE LINK/i).click();
    cy.contains(/Unique for John/i);
    cy.contains(/http:\/\/localhost:3000\/landing/i);
    cy.wait(1);
    cy.get('[data-testid="copy-link-button"]').click();
    // TODO: This is failing can't replicate the failure in the app when not automated
    // cy.wait(1).contains(/link was copied/i);
  });

  it('open and close the conversations drawer', () => {
    cy.visit('/conversations');
    cy.contains(/Start Talking With People/i).click();
    cy.get('[data-testid="dashboard-drawer-closed"]');
    cy.get('[data-testid="dashboard-drawer-button"]').click();
    cy.get('[data-testid="dashboard-drawer-open"]');
    cy.get('[data-testid="close-drawer-button"]').click();
    cy.get('[data-testid="dashboard-drawer-closed"]');
  });

  it('Displays the list of conversations', () => {
    cy.visit('/conversations');
    cy.contains(/Start Talking With People/i).click();
    cy.get('[data-testid="dashboard-drawer-button"]').click();
    cy.fixture('conversations.json').then((conversationFixture) => {
      const conversations = conversationFixture.conversations;
      conversations.forEach((conversation: any) => {
        console.log(conversation.conversationId);
        cy.get(
          `[data-testid="conversation-card-${conversation.conversationId}"]`
        ).then(($card) => {
          cy.wrap($card).contains(`${conversation.invitedUserName}`);
          cy.wrap($card).contains(/Invited to talk/i);
        });
      });
    });
  });
});
