import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ShareLink from '../../pages/ConversationsDashboard';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const queryClient = new QueryClient();

const mockConfig = {
  isLoggedIn: true,
};

jest.mock('../../hooks/auth/useAuth', () => ({
  useAuth: () => mockConfig,
}));

// Mock react router
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: jest.fn().mockReturnValue({
    pathname: '/another-route',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
}));

const mockedShowToast = jest.fn();
jest.mock('../../hooks/useToast', () => ({
  useToast: () => ({
    showToast: mockedShowToast,
  }),
}));

const mockedAddConversations = jest.fn();
jest.mock('../../hooks/useConversations', () => ({
  useConversations: () => ({
    addConversation: mockedAddConversations,
  }),
}));

describe('Share Link Page', () => {
  it('Has the correct text', () => {
    const inputTitle = 'Name of recipient';

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ShareLink />
        </QueryClientProvider>
      </QueryClientProvider>
    );
    expect(getByText(inputTitle));
  });

  it('Has a Generate Link button disabled by default', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ShareLink />
      </QueryClientProvider>
    );

    expect(getByTestId('generate-link-button')).toBeDisabled();
  });

  it('Enables Generate link when User writes text', async () => {
    const { getByTestId, getByLabelText } = render(
      <QueryClientProvider client={queryClient}>
        <ShareLink />
      </QueryClientProvider>
    );

    await act(() =>
      userEvent.type(getByLabelText(/ Try "Peter Smith" or "Mom"/i), 'Testname')
    );

    expect(getByTestId('generate-link-button')).toBeEnabled();
  });

  it('Opens dialog when user clicks Generate link', async () => {
    const dialogText = 'Copy Link';
    const { getByTestId, getByLabelText, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <ShareLink />
      </QueryClientProvider>
    );

    await act(() =>
      userEvent.type(getByLabelText(/ Try "Peter Smith" or "Mom"/i), 'Testname')
    );

    await act(async () => {
      fireEvent.click(getByTestId('generate-link-button'));
    });

    expect(getByText(dialogText));
  });

  it('Can create conversation', async () => {
    const { getByLabelText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ShareLink />
      </QueryClientProvider>
    );

    await act(() =>
      userEvent.type(getByLabelText(/ Try "Peter Smith" or "Mom"/i), 'Testname')
    );

    await act(async () => {
      fireEvent.click(getByTestId('generate-link-button'));
    });

    expect(mockedAddConversations).toHaveBeenCalledTimes(2);
    expect(mockedAddConversations).toHaveBeenCalledWith('Testname');
  });

  it('Shows Toast message when link copied successfully', async () => {
    const { getByLabelText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ShareLink />
      </QueryClientProvider>
    );

    await act(() =>
      userEvent.type(getByLabelText(/ Try "Peter Smith" or "Mom"/i), 'Testname')
    );

    await act(async () => {
      fireEvent.click(getByTestId('generate-link-button'));
    });

    await act(async () => {
      fireEvent.click(getByTestId('copy-link-button'));
    });

    expect(mockedShowToast).toHaveBeenCalledTimes(1);
  });
});
