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
      getByText(/First, what are your core values\?/i)
    ).toBeInTheDocument();
  });

  it('shows the instructions ', () => {
    const { getByText } = render(<StartQuiz />);
    expect(
      getByText(
        /Read each statement and decide how much you are like or not like that. Don’t worry! There’s no right or wrong answers!/i
      )
    ).toBeInTheDocument();
  });

  it('has a take the quiz button', () => {
    const { getByRole } = render(<StartQuiz />);
    expect(getByRole('button', { name: /take the quiz/i })).toBeInTheDocument();
  });
});
