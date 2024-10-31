import React from 'react';
import GoogleLogin from '../../src/features/auth/components/GoogleLogin';
import { mount } from '@cypress/react';
describe('Google Authentication', () => {
      const navigateAfterLogin = cy.stub();
      const text = 'Login with Google';
      mount(<GoogleLogin navigateAfterLogin={navigateAfterLogin} text={text} />);
      //Stepper should have initial count of 0 (default)
      cy.get('[data-cy=counter]').should('have.text', '0');
    });
  it('should login with Google successfully', () => {
    cy.loginWithGoogle();
    // Add more assertions as needed
  });

