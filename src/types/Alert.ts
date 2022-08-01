import { TConversationRating, TConversationState } from './Conversation';

export type TAlert = {
  message: string;
  type: 'success' | 'error' | 'info';
};

export interface TRatingAlert {
  conversationId: string;
  userBName: string;
  conversationRating: TConversationRating;
  conversationState: TConversationState;
}

export type TAlerts = TAlert[];
export type TRatingAlerts = TRatingAlert[];
