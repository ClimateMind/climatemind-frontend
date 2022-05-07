import React from 'react';
import { render, wait, screen } from '@testing-library/react';
import PersonalValues from '../../pages/PersonalValuesFeed';
// import 'jest-canvas-mock';
import { SessionContext } from '../../contexts/session';
import { QueryClient, QueryClientProvider } from 'react-query';

// TODO: ResiseObserver and canvas not implemented in JSDOM so cant work out how to test the chart just now
jest.mock('react-chartjs-2', () => ({
  Radar: () => null,
}));

// quizId must be mocked or the api will never be called.
const mockSession = {
  sessionId: '4567',
  quizId: '1234',
  zipCode: null,
  hasAcceptedCookies: true,
  setHasAcceptedCookies: () => {},
};

const queryClient = new QueryClient();

// Mock react router to simulate history.push on button click
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Climate Personality', () => {
  it('it has the call to action', async () => {
    render(
      <SessionContext.Provider value={mockSession}>
        <QueryClientProvider client={queryClient}>
          <PersonalValues />
        </QueryClientProvider>
      </SessionContext.Provider>
    );

    const text = await screen.findByText(
      /You are about to see the effects of climate change and how you can take action against it/i
    );
    expect(text).toBeInTheDocument();
  });

  it('has the button to advance to the feed', async () => {
    render(
      <SessionContext.Provider value={mockSession}>
        <QueryClientProvider client={queryClient}>
          <PersonalValues />
        </QueryClientProvider>
      </SessionContext.Provider>
    );

    const button = await screen.findByRole('button', {
      name: /yes, i’m ready!/i,
    });
    expect(button).toBeInTheDocument();
  });

  it('has the button to advance to re-take the quiz', async () => {
    render(
      <SessionContext.Provider value={mockSession}>
        <QueryClientProvider client={queryClient}>
          <PersonalValues />
        </QueryClientProvider>
      </SessionContext.Provider>
    );

    const button = await screen.findByRole('button', {
      name: /retake the quiz/i,
    });

    expect(button).toBeInTheDocument();
  });

  it('it has the correct number of cards', async () => {
    render(
      <SessionContext.Provider value={mockSession}>
        <QueryClientProvider client={queryClient}>
          <PersonalValues />
        </QueryClientProvider>
      </SessionContext.Provider>
    );
    const cards = await screen.findAllByTestId('CMCard');
    expect(cards.length).toBe(3);
  });
});
