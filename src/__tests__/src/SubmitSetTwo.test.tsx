import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

window.scrollTo = jest.fn();
const queryClient = new QueryClient();

import SubmitSetTwo from '../../pages/SubmitSetTwo';

// Mock react router to simulate history.push on button click
const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
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
  it('the correct text shows', () => {
    const headingText = /Woohoo! Good Job!/i;
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <SubmitSetTwo />
      </QueryClientProvider>
    );
    expect(getByText(headingText)).toBeInTheDocument();
  });

  it('It has the submit button', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <SubmitSetTwo />
      </QueryClientProvider>
    );
    const finishButton = getByTestId('finish-quiz-button');
    expect(finishButton);
  });
});
