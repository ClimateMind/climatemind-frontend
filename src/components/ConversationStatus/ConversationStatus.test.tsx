import { render, screen } from '@testing-library/react';
import React from 'react';
import { ConversationStatus } from './ConversationStatus';

describe('Conversation status shows the correct text', () => {
  it('is correct for invited users', () => {
    render(<ConversationStatus status={0} />);
    expect(screen.getByText('Invited to talk')).toBeInTheDocument();
  });
  it('is correct for user who have consented', () => {
    render(<ConversationStatus status={1} />);
    expect(screen.getByText('Ready to talk')).toBeInTheDocument();
  });

  it('is correct for user who viewed the alignment', () => {
    render(<ConversationStatus status={2} />);
    expect(screen.getByText('Ready to talk')).toBeInTheDocument();
  });
  it('is correct for user who viewed the topics', () => {
    render(<ConversationStatus status={3} />);
    expect(screen.getByText('Ready to talk')).toBeInTheDocument();
  });

  it('is correct for user who have talked', () => {
    render(<ConversationStatus status={4} />);
    expect(
      screen.getByText('Conversation Completed, You Rock!')
    ).toBeInTheDocument();
  });

  it('is correct for user who have rated', () => {
    render(<ConversationStatus status={5} />);
    expect(
      screen.getByText('Conversation Completed, You Rock!')
    ).toBeInTheDocument();
  });
});
