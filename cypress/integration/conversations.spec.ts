/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';
import { isFeatureEnabled } from '../../src/features';

const conversationsEnabled = isFeatureEnabled.conversations;

conversationsEnabled &&
  describe('Conversations', () => {
    beforeEach(() => {
      cy.server();
      cy.acceptCookies();
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
      cy.get('.conversation-card').should('have.length', 6);
      cy.checkAccessibility(terminalLog);
    });

    it('Conversation Card has all the elements', () => {
      cy.get(
        '[data-testid="conversation-card-8872BAFF-284A-4DDF-92E5-8F37A0718F44"]'
      ).within(() => {
        cy.contains(/MORE/i).click();
        cy.contains(/LESS/i);
        cy.contains(/invited betty to talk/i);
        cy.contains(/see how you align/i).should('be.disabled');
        cy.contains(/view selected topics/i).should('be.disabled');
        cy.contains(/yes we talked/i).should('be.disabled');
      });
    });

    it('can view alignment after user b has consented', () => {
      cy.get(
        '[data-testid="conversation-card-15a523d8-a82f-4c11-bcee-8007a3b9b1d7"]'
      ).within(() => {
        cy.contains(/MORE/i).click();
        cy.contains(/LESS/i);
        cy.contains(/prepare to talk with barney/i);
        cy.contains(/view selected topics/i).should('be.disabled');
        cy.contains(/yes we talked/i).should('be.disabled');
        cy.contains(/see how you align/i).should('be.enabled');
        // [CM-1089] Cypress Tests for user a viewing alignment
        // TODO: Finish off the test to click through all the actions
        //   .click();
        // cy.url().should('include', 'shared-values');
        // cy.go('back');
      });
    });

    it('can view values after alignment has been viewed', () => {
      cy.get(
        '[data-testid="conversation-card-fd10d354-806a-4a4c-8e80-84f799f56810"]'
      ).within(() => {
        cy.contains(/MORE/i).click();
        cy.contains(/LESS/i);
        cy.contains(/prepare to talk with Wilma/i);
        cy.contains(/see how you align/i).should('be.enabled');
        cy.contains(/view selected topics/i).should('be.enabled');
        cy.contains(/yes we talked/i).should('be.disabled');
      });
    });

    it('can mark the conversation as complete after topics have been viewed', () => {
      cy.get(
        '[data-testid="conversation-card-788af33d-059e-4f79-8bbf-a2161183bc98"]'
      ).within(() => {
        cy.contains(/MORE/i).click();
        cy.contains(/LESS/i);
        cy.contains(/Ready to talk with fred/i);
        cy.contains(/see how you align/i).should('be.enabled');
        cy.contains(/view selected topics/i).should('be.enabled');
        cy.contains(/yes we talked/i).should('be.enabled');
      });
    });

    it('can rate the conversation after it has been marked as completed', () => {
      cy.get(
        '[data-testid="conversation-card-d39e937f-74bb-4522-944f-fbcd546ce131"]'
      ).within(() => {
        cy.contains(/MORE/i).click();
        cy.contains(/LESS/i);
        cy.contains(/Talked with bam bam/i);
        cy.contains(/see how you align/i).should('be.enabled');
        cy.contains(/view selected topics/i).should('be.enabled');
        cy.contains(/yay! go you!/i);
      });
    });

    it('Can see Delete conversation button', () => {
      cy.get(
        '[data-testid="conversation-card-d39e937f-74bb-4522-944f-fbcd546ce131"]'
      ).within(() => {
        cy.get('[aria-label="delete"]');
      });
    });

    it('Delete confrimation modal opens and closes', () => {
      cy.get(
        '[data-testid="conversation-card-d39e937f-74bb-4522-944f-fbcd546ce131"]'
      ).within(() => {
        cy.get('[aria-label="delete"]').click();
      });
      cy.get('#modal-title');
      cy.get('#CancelButton').click();
      cy.get('#modal-title').should('not.exist');
    });

    it('Delete conversation', () => {
      cy.get(
        '[data-testid="conversation-card-d39e937f-74bb-4522-944f-fbcd546ce131"]'
      ).within(() => {
        cy.get('[aria-label="delete"]').click();
      });
      cy.route('DELETE', '**/conversation/*', {
        statusCode: 204,
          conversationId: 'd39e937f-74bb-4522-944f-fbcd546ce131',
          message: 'Conversation has removed successfully.',
        },
      ).as('deleteConversation');
      cy.get('#ConfirmButton').click();
      cy.wait('@deleteConversation');        
      cy.get('#modal-title').should('not.exist');
      cy.get(
        '[data-testid="conversation-card-d39e937f-74bb-4522-944f-fbcd546ce131"]'
      ).should('not.exist');
    });

  
    it('Can see Register button if not logged in', () => {
      cy.visit('/conversations');
      cy.contains(/Register To Start Talking/i);
      cy.visit('/conversations');
      cy.contains(/Register To Start Talking/i);
    });

    it('Can Invite a friend', () => {
      cy.login();
      cy.contains(/talk/i).click();
      cy.contains(/Start Talking With People/i).click();
      cy.contains('Add their name');
      cy.get('input#friend').type('John');
      cy.contains(/GENERATE LINK/i).click();
      cy.contains(/Unique for John/i);
      cy.contains(/http:\/\/localhost:3000\/landing/i);
      cy.wait(1);
      cy.contains(
        'http://localhost:3000/landing/296a5131-02f2-4e57-bed4-69a5c42024ce'
      );
      cy.get('[data-testid="copy-link-button"]').click();
      // TODO: [CM-1084] Test copying to the clipboard for Dialoge and cards
    });

    it('reverts the username to the orginal values if card is collaped while editing', () => {
      cy.login();
      cy.contains(/talk/i).click();
      cy.contains(/Start Talking With People/i).click();
      cy.get('[data-testid="dashboard-drawer-button"]').click();
      cy.get(
        '[data-testid="conversation-card-fd10d354-806a-4a4c-8e80-84f799f56810"]'
      ).within(() => {
        cy.contains(/more/i).click();
        cy.get('[aria-label="edit name"]').click();
        cy.get('[data-cy="update-name-textfield"]').within(() => {
          cy.get('input').type('{selectAll}{backspace}Flintstone');
        });

        cy.contains(/LESS/i).click();
        cy.contains(/Wilma/i);
      });
    });

    it('allows the username to be edited', () => {
      cy.login();
      cy.contains(/talk/i).click();
      cy.contains(/Start Talking With People/i).click();
      cy.get('[data-testid="dashboard-drawer-button"]').click();
      cy.get(
        '[data-testid="conversation-card-fd10d354-806a-4a4c-8e80-84f799f56810"]'
      ).within(() => {
        cy.contains(/more/i).click();
        cy.get('[aria-label="edit name"]').click();
        cy.get('[data-cy="update-name-textfield"]').type(' Flintstone');
        cy.get('[aria-label="update name"]').click();
        cy.contains(/Wilma Flintstone/i).click();
      });
    });

    // Worked locally but not in automated test on github
    // it('Back button for Selected Topics brings user back to conversation card', () => {
    //   cy.get(
    //     '[data-testid="conversation-card-788af33d-059e-4f79-8bbf-a2161183bc98"]'
    //   ).within(() => {
    //     cy.wait(200);
    //     cy.contains(/more/i).click();
    //     cy.wait(200);
    //     cy.contains(/view selected topics/i).click();
    //   });
    //   cy.wait(1);
    //   cy.get('[data-testid="PrevButton"]').click();
    //   cy.wait(1)
    //   cy.isInViewport('[data-testid="conversation-card-788af33d-059e-4f79-8bbf-a2161183bc98"]')
    // });
  });

