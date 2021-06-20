import React from 'react';
import { render, screen, wait, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import Register from '../../pages/Register';

//mock history
const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

//  queryClient for mocking
const queryClient = new QueryClient();

describe('Registration Page', () => {
  it('Has all the inputs', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Register />
      </QueryClientProvider>
    );

    const fullName = await screen.getByLabelText(/full name/i);
    const email = await screen.getByLabelText(/email/i);
    const password = await screen.getByLabelText(/^password/i);
    const confirmPassword = await screen.getByLabelText(/confirm password/i);
    expect(fullName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
  });

  it('Has a submit button it is disabled by default', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Register />
      </QueryClientProvider>
    );

    const registerButton = await screen.getByRole('button', {
      name: 'Create Account and go to feed',
    });

    expect(registerButton).toBeDisabled();
  });

  it('It has a skip button ', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Register />
      </QueryClientProvider>
    );
    const skipButton = await screen.getByRole('button', {
      name: 'Skip making an account and see feed',
    });
    expect(skipButton).toBeInTheDocument();
  });

  it('User can complete the form and the submit button is enabled', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Register />
      </QueryClientProvider>
    );

    const fullName = await screen.getByLabelText(/full name/i);
    const email = await screen.getByLabelText(/email/i);
    const password = await screen.getByLabelText(/^password/i);
    const confirmPassword = await screen.getByLabelText(/confirm password/i);
    const registerButton = await screen.getByRole('button', {
      name: 'Create Account and go to feed',
    });

    await wait(() => userEvent.type(fullName, 'Test User'));
    await wait(() => userEvent.type(email, 'test.user@example.com'));
    await wait(() => userEvent.type(password, 'Password123!'));
    await wait(() => userEvent.type(confirmPassword, 'Password123!'));

    expect(registerButton).toBeEnabled();
  });
});
