import React from 'react';
import { render, fireEvent, wait, screen } from '@testing-library/react';
import { AccountIcon } from './AccountIcon';
import { AuthContext } from '../../contexts/auth';
import { QueryClient, QueryClientProvider } from 'react-query';

const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const queryClient = new QueryClient();

const mockAuth = {
  firstName: 'Test',
  lastName: 'User',
  userIntials: 'TU',
  accessToken: '1234',
  email: 'test@example.com',
  userId: '1234',
  isLoggedIn: true,
  quizId: '6789',
};

describe('Account Icon', () => {
  it('Has the correct initals ', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuth}>
          <AccountIcon />
        </AuthContext.Provider>
      </QueryClientProvider>
    );
    const initials = screen.getByText(/TU/i);
    expect(initials).toBeInTheDocument();
  });
});
