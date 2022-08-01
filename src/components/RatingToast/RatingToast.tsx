import { Alert } from '@material-ui/lab';
import React from 'react';
import {
  TConversationRating,
  TConversationState,
} from '../../types/Conversation';
import {
  ConversationRating,
  ConversationRatingProps,
} from '../ConversationRating';

export interface RatingToastProps {
  conversationId: string;
  userBName: string;
  conversationRating: TConversationRating;
  conversationState: TConversationState;
}

export const RatingToast: React.FC<RatingToastProps> = () => {
  return (
    <Alert>
      <ConversationRating
        conversationRating={null}
        conversationId="1234"
        conversationState={4}
      />
    </Alert>
  );
};
