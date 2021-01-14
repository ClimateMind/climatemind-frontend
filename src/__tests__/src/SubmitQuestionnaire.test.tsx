import React from 'react';
import { render, fireEvent } from '@testing-library/react';
window.scrollTo = jest.fn();

import SubmitQuestionnaire from '../../pages/SubmitQuestionnaire';

// Mock react router to simulate history.push on button click
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

// Mocking axios to prevent console.error
jest.mock('axios', () => ({
  post: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../hooks/useResponses', () => {
  return {
    useResponsesData: jest.fn(() => {
      return {
        SetOne: [
          { questionId: 1, answerId: 1 },
          { questionId: 2, answerId: 1 },
          { questionId: 3, answerId: 1 },
          { questionId: 4, answerId: 1 },
          { questionId: 5, answerId: 1 },
          { questionId: 6, answerId: 1 },
          { questionId: 7, answerId: 1 },
          { questionId: 8, answerId: 1 },
          { questionId: 9, answerId: 1 },
          { questionId: 10, answerId: 1 },
        ],
      };
    }),
  };
});

describe('Quiz Welcome', () => {
  it('has a get started button', () => {
    const { getByRole } = render(<SubmitQuestionnaire />);
    expect(getByRole('button'));
    fireEvent(
      getByRole('button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  it('displays the app logo', () => {
    const { getByTestId } = render(<SubmitQuestionnaire />);
    expect(getByTestId('climate-mind-logo')).toBeInTheDocument();
  });
  it('the correct text shows', () => {
    const welcomeText = 'Woohoo! Good Job!';
    const climatePersonalityExp =
      'With the questions you just answered I can predict your Climate Personality.';
    const topThree =
      'This is a ranking of the top three personal values that you deploy when making decisions.';
    const { getByText } = render(<SubmitQuestionnaire />);

    expect(getByText(welcomeText)).toBeInTheDocument();
    expect(getByText(climatePersonalityExp)).toBeInTheDocument();
    expect(getByText(topThree)).toBeInTheDocument();
  });
});
