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
  it('shows find out text ', () => {
    const { getByText } = render(<ClimatePersonality />);
    expect(getByText(/find out your Climate Personality/i)).toBeInTheDocument();
  });
  it('displays expandlable card', () => {
    const { getByText } = render(<ClimatePersonality />);
    expect(getByText(/What's a Climate Personality/i)).toBeInTheDocument();
  });
  it('displays expandlable card, card expanded', () => {
    const { getByText } = render(<ClimatePersonality />);
    const expander = getByText(/what's a Climate Personality/i);
    fireEvent.click(expander);
    expect(getByText(/to make decisions we each employ three personal values/i)).toBeInTheDocument();
  });
  it('has a take the quiz button', () => {
    const { getByRole } = render(<ClimatePersonality />);
    expect(getByRole('button', { name: /take the quiz/i })).toBeInTheDocument();
  });
});