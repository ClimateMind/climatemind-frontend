import { render, screen } from '@testing-library/react';
import React from 'react';
import { ConversationState } from './ConversationState';

const mockUserBName = 'Nick';

describe('Conversation status shows the correct text', () => {
  it('is correct for invited users', () => {
    render(
      <ConversationState
        isExpanded={true}
        state={0}
        userBName={mockUserBName}
      />
    );
    expect(
      screen.getByText(`Invited ${mockUserBName} to talk`)
    ).toBeInTheDocument();
  });
  it('is correct for user who have consented', () => {
    render(
      <ConversationState
        isExpanded={true}
        state={1}
        userBName={mockUserBName}
      />
    );
    expect(
      screen.getByText(`Prepare to talk with ${mockUserBName}`)
    ).toBeInTheDocument();
  });

  it('is correct for user who viewed the alignment', () => {
    render(
      <ConversationState
        isExpanded={true}
        state={2}
        userBName={mockUserBName}
      />
    );
    expect(
      screen.getByText(`Prepare to talk with ${mockUserBName}`)
    ).toBeInTheDocument();
  });
  it('is correct for user who viewed the topics', () => {
    render(
      <ConversationState
        isExpanded={true}
        state={3}
        userBName={mockUserBName}
      />
    );
    expect(
      screen.getByText(`Ready to talk with ${mockUserBName}`)
    ).toBeInTheDocument();
  });

  it('is correct for user who have talked', () => {
    render(
      <ConversationState
        isExpanded={true}
        state={4}
        userBName={mockUserBName}
      />
    );
    expect(
      screen.getByText(`Talked with ${mockUserBName}`)
    ).toBeInTheDocument();
  });

  it('is correct for user who have rated', () => {
    render(
      <ConversationState
        isExpanded={true}
        state={5}
        userBName={mockUserBName}
      />
    );
    expect(
      screen.getByText(`Talked with ${mockUserBName}`)
    ).toBeInTheDocument();
  });

  it('the status is hidden when the card is collapsed and the conversation has been rated.', () => {
    render(
      <ConversationState
        isExpanded={false}
        state={5}
        userBName={mockUserBName}
      />
    );
    expect(screen.queryByText(`Talked with ${mockUserBName}`)).toBeNull();
  });
});
