/// <reference types="cypress" />

import { terminalLog } from '../support/helpers';
import { isFeatureEnabled } from '../../src/features';
import ROUTES from '../../src/components/Router/RouteConfig';

const conversationsEnabled = isFeatureEnabled.conversations;
const conversartionId = '62cddb66-6c68-4601-8d8e-80fa496a280b';

conversationsEnabled &&
  describe('Alignment', () => {
    beforeEach(() => {
      cy.server();
      cy.acceptCookies();
      cy.mockServer();
    });

    it('allows navigation to selected topics', () => {
      cy.login();
      cy.visit(`${ROUTES.SHARED_VALUES}/${conversartionId}`);
      cy.contains(/VIEW SELECTED TOPICS/i).click();
      cy.url().should(
        'contain',
        `${ROUTES.USERA_SHARED_FEED}/${conversartionId}`
      );
      cy.go('back');
    });

    it.skip('shows the correct allignment for a user', () => {});
    it.skip('shows the correct top personal value a match percentage', () => {});
    it.skip('shows the correct overall similarity', () => {});
    it.skip('allows the top personalvalue card to be expanded and collapsed', () => {});
  });
