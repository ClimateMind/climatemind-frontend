import React from 'react';
import { render, fireEvent } from '@testing-library/react';
window.scrollTo = jest.fn();

import SubmitSetTwo from '../../pages/SubmitSetTwo';

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

describe('Submit Set One Page', () => {
  it('displays the app logo', () => {
    const { getByTestId } = render(<SubmitSetTwo />);
    expect(getByTestId('climate-mind-logo')).toBeInTheDocument();
  });
  it('the correct text shows', () => {
    const headingText = /Woohoo! Good Job!/i;
    const { getByText } = render(<SubmitSetTwo />);
    expect(getByText(headingText)).toBeInTheDocument();
  });

  it('It has the submit button', () => {
    const { getByTestId } = render(<SubmitSetTwo />);
    const finishButton = getByTestId('finish-quiz-button');
    expect(finishButton);
  });
});
