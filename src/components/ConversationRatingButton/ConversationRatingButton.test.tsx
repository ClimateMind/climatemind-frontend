import { render, screen } from '@testing-library/react';
import React from 'react';
import { ConversationRatingButton } from './ConversationRatingButton';

const mockIcon = '🍄';
const mockRating = 1;
const mockConversationRating = null;

describe('ConversationRatingButton', () => {
  it('shows the icon', () => {
    render(
      <ConversationRatingButton
        emojiIcon={mockIcon}
        buttonRating={mockRating}
        conversationRating={mockConversationRating}
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
        conversationId={conver}
      />
    );

    const label = screen.getByLabelText(/1 out of 5/i);
    expect(label).toBeInTheDocument();
  });
});
