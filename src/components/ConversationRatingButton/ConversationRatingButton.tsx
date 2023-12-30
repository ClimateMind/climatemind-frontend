import React from 'react';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';
import { CmButton } from 'shared/components';

export interface ConversationRatingButtonProps {
  emojiIcon: string;
  buttonRating: number;
  conversationId: string;
}

export const ConversationRatingButton: React.FC<
  ConversationRatingButtonProps
> = ({
  emojiIcon,
  buttonRating,
  conversationId,
}) => {
  const { updateConversation } = useUpdateConversation(conversationId);

  const handleUpdateRating = () => {
    try {
      updateConversation({ userARating: buttonRating });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CmButton
      text={emojiIcon}
      onClick={handleUpdateRating}
    />
  );
};
