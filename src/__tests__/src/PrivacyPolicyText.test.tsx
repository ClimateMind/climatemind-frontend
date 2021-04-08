import React from 'react';
import { render } from '@testing-library/react';
import PrivacyPolicyText from '../../components/PrivacyPolicyText';

// Mock react router to simulate history.push on button click

window.scrollTo = jest.fn();

// TODO: Ideally it would be nice to mock the privacy policy text so the tests don't break if the text changes.
describe('Privacy Policy', () => {
  it('it has text', () => {
    const { queryAllByText, getByRole } = render(<PrivacyPolicyText />);
    expect(queryAllByText(/privacy policy/i));
    expect(
      queryAllByText(
        /When you use our website, even if you aren't logged in, we receive some personal information from you like the type of device you're using and your IP address./i
      )
    );
  });
});
