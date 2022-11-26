import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import AppBarWithMenu from '../../../components/AppBar/AppBarWithMenu';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { QueryClientProvider, QueryClient } from 'react-query';

const mockHistoryPush = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const queryClient = new QueryClient();

const links = [
  {
    label: 'Feed',
    value: '/climate-feed',
    index: 1,
  },
  {
    label: 'Myths',
    value: '/myths',
    index: 2,
  },
  {
    label: 'Solutions',
    value: '/solutions',
    index: 3,
  },
  {
    label: 'Conversation',
    value: '/saved',
    index: 4,
  },
];

describe('AppBarWithMenu', () => {
  it('AppBarWithMenu menu renders', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AppBarWithMenu links={links} />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(getByTestId('AppBarWithMenu')).toBeInTheDocument();
  });

  it('AppBarWithMenu has its links', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AppBarWithMenu links={links} />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(getByText('Feed')).toBeInTheDocument();
    expect(getByText('Myths')).toBeInTheDocument();
    expect(getByText('Solutions')).toBeInTheDocument();
    expect(getByText('Conversation')).toBeInTheDocument();
  });

  it('The menu can open', async () => {
    const { getByTestId, getByText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AppBarWithMenu links={links} />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const button = getByRole('button');
    fireEvent.click(button);
    await wait(() => {
      expect(getByTestId('TopMenuDrawer')).toBeInTheDocument();
      expect(getByText(/About ClimateMind/i)).toBeInTheDocument();
      expect(getByText(/Community & Chat/i)).toBeInTheDocument();
      expect(getByTestId('socials')).toBeInTheDocument();
      expect(getByText(/feedback/i)).toBeInTheDocument();
      expect(getByText(/privacy/i)).toBeInTheDocument();
    });
  });
});
