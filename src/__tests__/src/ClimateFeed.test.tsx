import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ClimateFeed from 'pages/ClimateFeed';
import { dummyEffects } from '../../../cypress/fixtures/dummyEffects';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    location: {
      pathname: '/climate-feed',
    },
  }),
}));

const titles = dummyEffects.map((effect) => effect.effectTitle);
const queryClient = new QueryClient();

test('climate feed should have the right number of cards', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <ClimateFeed mockData={dummyEffects} />
    </QueryClientProvider>
  );

  const cards = screen.getAllByTestId('CMCard');
  expect(cards.length).toBe(dummyEffects.length);
});

test('each card should contain the title', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <ClimateFeed mockData={dummyEffects} />
    </QueryClientProvider>
  );

  titles.forEach((title) => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
