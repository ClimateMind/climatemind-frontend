import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CompleteConversation } from './CompleteConversation';
import { TConversationStatus } from '../../types/Conversation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const mockQueryClient = new QueryClient();

const mockConversationId = '08f097e8-68b6-47bc-bbf1-df48b5d9ae0c';

describe('CompeteConversation section', () => {
  it('It shows the button to mark the conversation as compelete', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <CompleteConversation
          conversationStatus={1}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(
      screen.getByRole('button', { name: 'YEA WE TALKED!' })
    ).toBeInTheDocument();
  });

  it('Button should be disabled when conversation is invited', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <CompleteConversation
          conversationStatus={0}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(
      screen.getByRole('button', { name: 'YEA WE TALKED!' })
    ).toBeDisabled();
  });

  it('Button should be disabled when quiz is not complete', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <CompleteConversation
          conversationStatus={1}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(
      screen.getByRole('button', { name: 'YEA WE TALKED!' })
    ).toBeDisabled();
  });

  it('Button should be enabled when user is ready to talk', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <CompleteConversation
          conversationStatus={TConversationStatus.QuizCompleted}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(
      screen.getByRole('button', { name: 'YEA WE TALKED!' })
    ).toBeEnabled();
  });

  it('Shows the success message when the conversation is complete', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <CompleteConversation
          conversationStatus={3}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(screen.queryByText(/YEA WE TALKED!/i)).toBeNull();
    expect(screen.queryByText(/Yay! Go you!/i)).toBeTruthy();
  });

  it('Conversation can be marked as complete', () => {
    render(
      <QueryClientProvider client={mockQueryClient}>
        <CompleteConversation
          conversationStatus={3}
          conversationId={mockConversationId}
        />
      </QueryClientProvider>
    );
    expect(screen.queryByText(/Yay! Go you!/i)).toBeTruthy();
  });
});
