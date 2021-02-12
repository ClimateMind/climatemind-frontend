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
  it('it has The title', () => {
    const { getByText } = render(<PrivacyPolicy />);
    expect(getByText(/privacy policy/i)).toBeInTheDocument(); // this test will fail now
  });
  it('it has the back button', () => {
    const { queryAllByText, getByRole } = render(<PrivacyPolicy />);
    expect(getByRole('button').textContent).toContain('Go Back');
  });

  it('it has the privacy policy text', () => {
    const { getByTestId } = render(<PrivacyPolicy />);
    expect(getByTestId('PrivacyPolicyText'));
  });
});
