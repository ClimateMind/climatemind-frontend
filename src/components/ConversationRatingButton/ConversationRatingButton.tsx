import React from 'react';
import { Button } from '@material-ui/core';

export interface ConversationRatingButtonProps {
  emojiIcon: string;
  buttonRating: number;
  conversationRating: number | null;
}

export const ConversationRatingButton: React.FC<
  ConversationRatingButtonProps
> = ({ emojiIcon }) => {
  return <Button variant="outlined">{emojiIcon}</Button>;
};
