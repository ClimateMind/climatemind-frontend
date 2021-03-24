import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import StartQuiz from '../../pages/StartQuiz';

// Mock react router to simulate history.push on button click
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
window.scrollTo = jest.fn();

describe('ClimatePersonality', () => {
  it('shows the main heading ', () => {
    const { getByText } = render(<StartQuiz />);
    expect(
      getByText(
        /We want to make constructive conversations about climate change easier./i
      )
    ).toBeInTheDocument();
  });
  it('shows header core values heading ', () => {
    const { getByText } = render(<StartQuiz />);
    expect(getByText(/Let's find out your core values/i)).toBeInTheDocument();
  });

  it('It explains about the core values ', () => {
    const { getByText } = render(<StartQuiz />);
    expect(
      getByText(/By answering 10 research-backed questions/i)
    ).toBeInTheDocument();
  });

  it('has a take the quiz button', () => {
    const { getByRole } = render(<StartQuiz />);
    expect(getByRole('button', { name: /take the quiz/i })).toBeInTheDocument();
  });
});
