import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ClimatePersonality from '../../pages/ClimatePersonality';

// Mock react router to simulate history.push on button click
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('ClimatePersonality', () => {
  it('displays the app logo', () => {
    const { getByTestId } = render(<ClimatePersonality />);
    expect(getByTestId('climate-mind-logo')).toBeInTheDocument();
  });
  it('shows header text ', () => {
    const { getByText } = render(<ClimatePersonality />);
    expect(getByText(/Let's find out your core values/i)).toBeInTheDocument();
  });

  it('has a take the quiz button', () => {
    const { getByRole } = render(<ClimatePersonality />);
    expect(getByRole('button', { name: /take the quiz/i })).toBeInTheDocument();
  });
});
