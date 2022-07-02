import React from 'react';
import { Typography, Button } from '@material-ui/core';

export interface ConversationRatingProps {
  rating: number | null;
}

export const ConversationRating: React.FC<ConversationRatingProps> = ({
  rating,
}) => {
  const icons = ['😡', '😐', '🤔', '😊', '🥳'];

  return (
    <div>
      <Typography variant="h3">How Did it go?</Typography>
      <div>
        {!rating &&
          icons.map((icon) => <Button variant="outlined">{icon}</Button>)}
      </div>
    </div>
  );
};
