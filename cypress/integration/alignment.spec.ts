/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';
import { isFeatureEnabled } from '../../src/features';
import ROUTES from '../../src/components/Router/RouteConfig';

const conversationsEnabled = isFeatureEnabled.conversations;
const conversationId = '62cddb66-6c68-4601-8d8e-80fa496a280b';

const getSingleConversationResponse = {
  conversationId: '62cddb66-6c68-4601-8d8e-80fa496a280b',
  userA: {
    name: 'Bill',
    id: 'ba5df442-7261-4fc1-bff0-5dfd84035d56',
    sessionId: '671e4949-a3e4-4844-b9d2-cd843f48f357',
  },
  userB: {
    name: 'Bob',
  },
  state: 2,
  consent: true,
  conversationTimestamp: 'Sun, 10 Oct 2021 18:35:02 GMT',
  alignmentScoresId: '842a4949-a3e4-4914-c9d2-cd843f48f357',
};

conversationsEnabled &&
  describe('Alignment', () => {
    beforeEach(() => {
      cy.server();
      cy.acceptCookies();
      cy.mockServer();
      cy.login();
      // Mock the api route to return dummy data
      cy.route({
        method: 'GET',
        url: /62cddb66-6c68-4601-8d8e-80fa496a280b/i,
        response: getSingleConversationResponse,
      });
      cy.visit(`${ROUTES.SHARED_VALUES}/${conversationId}`);
    });

    it('allows navigation to selected topics', () => {
      cy.contains(/VIEW SELECTED TOPICS/i).click();
      cy.url().should(
        'contain',
        `${ROUTES.USERA_SHARED_FEED}/${conversationId}`
      );
      cy.go('back');
    });

    // TODO: [CM-1089]
    it.skip('shows the correct allignment for a user', () => {});
    it.skip('shows the correct top personal value a match percentage', () => {});
    it.skip('shows the correct overall similarity', () => {});
    it.skip('allows the top personalvalue card to be expanded and collapsed', () => {});
  });
