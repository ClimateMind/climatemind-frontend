import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { useAlignment } from '../../hooks/useAlignment';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';
import { TConversationState } from '../../types/Conversation';
import ROUTES from '../../router/RouteConfig';

export interface HowYouAlignButtonProps {
  conversationId: string;
  conversationState: TConversationState;
}

export const HowYouAlignButton: React.FC<HowYouAlignButtonProps> = ({
  conversationState,
  conversationId,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateConversationState } = useUpdateConversation(conversationId);
  const { conversation: data } = useGetOneConversation(conversationId);
  const { setAlignmentScoresId } = useAlignment();

  const handleClick = () => {
    if (conversationState < TConversationState.AlignmentViewed) {
      updateConversationState(2);
    }
    if (data?.alignmentScoresId) {
      setAlignmentScoresId(data.alignmentScoresId);
      navigate(`${ROUTES.SHARED_VALUES_PAGE}/${conversationId}`, {
        state: { from: location.pathname, id: conversationId },
      });
    }
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
