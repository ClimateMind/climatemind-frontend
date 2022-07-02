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
});
