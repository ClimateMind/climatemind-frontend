import { render, screen } from '@testing-library/react';
import React from 'react';
import { ConversationRatingButton } from './ConversationRatingButton';

const mockIcon = '🍄';
const mockRating = 1;
const mockConversationRating = null;
const mockConversationId = 'a68fa808-1a64-4bd3-8247-69afb4c3cddc';

describe('ConversationRatingButton', () => {
  it('shows the icon', () => {
    render(
      <ConversationRatingButton
        emojiIcon={mockIcon}
        buttonRating={mockRating}
        conversationRating={mockConversationRating}
        conversationId={mockConversationId}
      />
    );
    expect(screen.getByText(mockIcon)).toBeInTheDocument();
  });

  it('is a button', () => {
    render(
      <ConversationRatingButton
        emojiIcon={mockIcon}
        buttonRating={mockRating}
        conversationRating={mockConversationRating}
        conversationId={mockConversationId}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('is disabled when conversation has a rating', () => {
    render(
      <ConversationRatingButton
        emojiIcon={mockIcon}
        buttonRating={mockRating}
        conversationRating={1}
        conversationId={mockConversationId}
      />
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('has a grey background when the ratings match', () => {
    render(
      <ConversationRatingButton
        emojiIcon={mockIcon}
        buttonRating={1}
        conversationRating={1}
        conversationId={mockConversationId}
      />
    );
    expect(screen.getByRole('button')).toHaveStyle(`background: 'lightgrey'`);
  });

  it('it has an accessable label', () => {
    render(
      <ConversationRatingButton
        emojiIcon={mockIcon}
        buttonRating={1}
        conversationRating={1}
        conversationId={mockConversationId}
      />
    );

    const label = screen.getByLabelText(/1 out of 5/i);
    expect(label).toBeInTheDocument();
  });
});
