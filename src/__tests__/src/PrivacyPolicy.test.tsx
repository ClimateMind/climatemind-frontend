import React from 'react';
import { render } from '@testing-library/react';
import PrivacyPolicy from '../../pages/PrivacyPolicy';

// Mock react router to simulate history.push on button click
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

window.scrollTo = jest.fn();

describe('Privacy Policy', () => {
  it('it has the title', () => {
    const { getByRole } = render(<PrivacyPolicy />);
    expect(getByRole('button').textContent).toContain('Go Back');
  });

  it('it has the back button', () => {
    const { getByRole } = render(<PrivacyPolicy />);
    expect(getByRole('button').textContent).toContain('Go Back');
  });

  it('it has the privacy policy text', () => {
    const { getByText } = render(<PrivacyPolicy />);
    expect(
      getByText(
        /All we know about you is what you share by visiting and exploring our website. We don't collect any of your personal information from any third parties/i
      )
    );
  });
});
