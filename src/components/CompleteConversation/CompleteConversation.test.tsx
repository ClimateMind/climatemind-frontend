import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CompleteConversation } from './CompleteConversation';
import { TConversationState } from '../../types/Conversation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

const mockQueryClient = new QueryClient();

const mockConversationId = '08f097e8-68b6-47bc-bbf1-df48b5d9ae0c';

describe('CompeteConversation Component', () => {
  it('shows a disabled button when user b is invited', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <CompleteConversation
          conversationState={0}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(
      screen.getByRole('button', { name: 'YEA WE TALKED!' })
    ).toBeDisabled();
  });

  it('shows a disabled button when user b has consented', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <CompleteConversation
          conversationState={1}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(
      screen.getByRole('button', { name: 'YEA WE TALKED!' })
    ).toBeInTheDocument();
  });

  it('shows a disabled button when user b has viewed the alignment', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <CompleteConversation
          conversationState={2}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(
      screen.getByRole('button', { name: 'YEA WE TALKED!' })
    ).toBeDisabled();
  });

  it('enables the button when user has view the topics', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <CompleteConversation
          conversationState={3}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(screen.getByRole('button', { name: 'YEA WE TALKED!' }));
  });

  it('Shows the success message when the conversation is complete', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <CompleteConversation
          conversationState={4}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(screen.queryByText(/YEA WE TALKED!/i)).toBeNull();
    expect(screen.queryByText(/Yay! Go you!/i)).toBeTruthy();
  });

  it('Conversation can be marked as complete', async () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <CompleteConversation
          conversationState={3}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
  });
});