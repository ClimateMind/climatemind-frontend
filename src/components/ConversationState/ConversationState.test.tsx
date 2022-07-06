import { render, screen } from '@testing-library/react';
import React from 'react';
import { ConversationState } from './ConversationState';

const mockUserBName = 'Nick';

describe('Conversation status shows the correct text', () => {
  it('is correct for invited users', () => {
    render(<ConversationState state={0} userBName={mockUserBName} />);
    expect(
      screen.getByText(`Invited ${mockUserBName} to talk`)
    ).toBeInTheDocument();
  });
  it('is correct for user who have consented', () => {
    render(<ConversationState state={1} userBName={mockUserBName} />);
    expect(
      screen.getByText(`Ready to talk with ${mockUserBName}`)
    ).toBeInTheDocument();
  });

  it('is correct for user who viewed the alignment', () => {
    render(<ConversationState state={2} userBName={mockUserBName} />);
    expect(
      screen.getByText(`Ready to talk with ${mockUserBName}`)
    ).toBeInTheDocument();
  });
  it('is correct for user who viewed the topics', () => {
    render(<ConversationState state={3} userBName={mockUserBName} />);
    expect(
      screen.getByText(`Ready to talk with ${mockUserBName}`)
    ).toBeInTheDocument();
  });

  it('is correct for user who have talked', () => {
    render(<ConversationState state={4} userBName={mockUserBName} />);
    expect(
      screen.getByText(
        `Conversation Completed with ${mockUserBName}, You Rock!`
      )
    ).toBeInTheDocument();
  });

  it('is correct for user who have rated', () => {
    render(<ConversationState state={5} userBName={mockUserBName} />);
    expect(
      screen.getByText(
        `Conversation Completed with ${mockUserBName}, You Rock!`
      )
    ).toBeInTheDocument();
  });
});
