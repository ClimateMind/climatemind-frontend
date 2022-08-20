import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SubmitSetOne from '../../pages/SubmitSetOne';
import { MemoryRouter } from 'react-router-dom';

window.scrollTo = jest.fn();
const queryClient = new QueryClient();

// Mock react router to simulate history.push on button click
const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
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
    const welcomeText = 'Woah! You are doing great!';
    const climatePersonalityExp =
      'Do you want to carry on with another 10 questions or get your results now?';

    const { getByText } = render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SubmitSetOne />
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(getByText(welcomeText)).toBeInTheDocument();
    expect(getByText(climatePersonalityExp)).toBeInTheDocument();
  });

  it('the correct text shows', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SubmitSetOne />
        </QueryClientProvider>
      </MemoryRouter>
    );
    const continueButton = getByTestId('continue-quiz-button');
    const finishButton = getByTestId('finish-quiz-button');
    expect(continueButton);
    expect(finishButton);
  });
});
