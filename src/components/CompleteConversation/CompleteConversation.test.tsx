import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CompleteConversation } from './CompleteConversation';
import { TConversationStatus } from '../../types/Conversation';

// export enum TConversationStatus {
//   Invited = 0,
//   Visited = 1,
//   QuizCompleted = 2,
//   ConversationCompleted = 3,
// }

const mockConversationId = '08f097e8-68b6-47bc-bbf1-df48b5d9ae0c';

describe('CompeteConversation section', () => {
  it('It shows the button to mark the conversation as compelete', () => {
    render(
      <CompleteConversation
        conversationStatus={1}
        conversationId={mockConversationId}
      />
    );
    expect(
      screen.getByRole('button', { name: 'YEA WE TALKED!' })
    ).toBeInTheDocument();
  });

  it('Button should be disabled when conversation is not complete', () => {
    render(
      <CompleteConversation
        conversationStatus={1}
        conversationId={mockConversationId}
      />
    );
    expect(
      screen.getByRole('button', { name: 'YEA WE TALKED!' })
    ).toBeDisabled();
  });

  it('Button should be enabled when user is ready to talk', () => {
    render(
      <CompleteConversation
        conversationStatus={TConversationStatus.QuizCompleted}
        conversationId={mockConversationId}
      />
    );
    expect(
      screen.getByRole('button', { name: 'YEA WE TALKED!' })
    ).toBeEnabled();
  });

  it('Shows the success message when the conversation is complete', () => {
    render(
      <CompleteConversation
        conversationStatus={3}
        conversationId={mockConversationId}
      />
    );
    expect(screen.queryByText(/YEA WE TALKED!/i)).toBeNull();
    expect(screen.queryByText(/Yay! Go you!/i)).toBeTruthy();
  });

  it('Conversation can be marked as complete', () => {
    render(
      <CompleteConversation
        conversationStatus={3}
        conversationId={mockConversationId}
      />
    );
    expect(false).toBeTruthy();
  });
});
