import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import AppBar from '../../../components/AppBar/AppBar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const queryClient = new QueryClient();

describe('AppBar', () => {
  it('Contains the title and menu ', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AppBar />
        </QueryClientProvider>
      </MemoryRouter>
    );
    expect(getByText(/climate mind/i)).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });
  it('The menu can open', async () => {
    const { getByTestId, getByText, getByRole } = render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AppBar />
        </QueryClientProvider>
      </MemoryRouter>
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
