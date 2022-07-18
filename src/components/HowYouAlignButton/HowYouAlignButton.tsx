import React from 'react';
import { TConversationState } from '../../types/Conversation';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ROUTES from '../Router/RouteConfig';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';

export interface HowYouAlignButtonProps {
  conversationId: string;
  conversationState: TConversationState;
}

export const HowYouAlignButton: React.FC<HowYouAlignButtonProps> = ({
  conversationState,
  conversationId,
}) => {
  const { push } = useHistory();
  const { updateConversationState } = useUpdateConversation(conversationId);

  const handleClick = () => {
    if (conversationState < TConversationState.AlignmentViewed) {
      updateConversationState(2);
    }
    push(`${ROUTES.SHARED_VALUES}`);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      style={{ margin: '0 0 1.5em' }}
      onClick={handleClick}
      disabled={conversationState === 0}
    >
      SEE HOW YOU ALIGN
    </Button>
  );
};
