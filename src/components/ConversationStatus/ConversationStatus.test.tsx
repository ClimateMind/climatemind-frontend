import { render, screen } from '@testing-library/react';
import React from 'react';
import { ConversationStatus } from './ConversationStatus';

const mockUserBName = 'Nick';

describe('Conversation status shows the correct text', () => {
  it('is correct for invited users', () => {
    render(<ConversationStatus status={0} userBName={mockUserBName} />);
    expect(
      screen.getByText(`Invited ${mockUserBName} to talk`)
    ).toBeInTheDocument();
  });
  it('is correct for user who have consented', () => {
    render(<ConversationStatus status={1} userBName={mockUserBName} />);
    expect(
      screen.getByText(`Ready to talk with ${mockUserBName}`)
    ).toBeInTheDocument();
  });

  it('is correct for user who viewed the alignment', () => {
    render(<ConversationStatus status={2} userBName={mockUserBName} />);
    expect(
      screen.getByText(`Ready to talk with ${mockUserBName}`)
    ).toBeInTheDocument();
  });
  it('is correct for user who viewed the topics', () => {
    render(<ConversationStatus status={3} userBName={mockUserBName} />);
    expect(
      screen.getByText(`Ready to talk with ${mockUserBName}`)
    ).toBeInTheDocument();
  });

  it('is correct for user who have talked', () => {
    render(<ConversationStatus status={4} userBName={mockUserBName} />);
    expect(
      screen.getByText(
        `Conversation Completed with ${mockUserBName}, You Rock!`
      )
    ).toBeInTheDocument();
  });

  it('is correct for user who have rated', () => {
    render(<ConversationStatus status={5} userBName={mockUserBName} />);
    expect(
      screen.getByText(
        `Conversation Completed with ${mockUserBName}, You Rock!`
      )
    ).toBeInTheDocument();
  });
});
