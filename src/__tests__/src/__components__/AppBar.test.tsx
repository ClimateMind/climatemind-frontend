import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import AppBar from '../../../components/AppBar/AppBar';
import { QueryClient, QueryClientProvider } from 'react-query';

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
      <QueryClientProvider client={queryClient}>
        <AppBar />
      </QueryClientProvider>
    );
    expect(getByText(/climate mind/i)).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });
  it('The menu can open', async () => {
    const { getByTestId, getByText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <AppBar />
      </QueryClientProvider>
    );
    const button = getByRole('button');
    fireEvent.click(button);
    await wait(() => {
      expect(getByTestId('TopMenuDrawer')).toBeInTheDocument();
      expect(getByText(/About ClimateMind/i)).toBeInTheDocument();
      expect(getByText(/Scientists Speak Up/i)).toBeInTheDocument();
      expect(getByTestId('socials')).toBeInTheDocument();
      expect(getByText(/email us/i)).toBeInTheDocument();
      expect(getByText(/privacy/i)).toBeInTheDocument();
    });
  });
});
