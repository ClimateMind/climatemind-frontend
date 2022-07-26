import React, { useEffect } from 'react';
import { TConversationState } from '../../types/Conversation';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ROUTES from '../Router/RouteConfig';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { useAlignment } from '../../hooks/useAlignment';

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
  const { conversation: data } = useGetOneConversation(conversationId);
  const { setAlignmentScoresId } = useAlignment();

  useEffect(() => {
    if (data?.alignmentScoresId) {
      setAlignmentScoresId(data.alignmentScoresId);
    }
    // eslint-disable-next-line
  }, [data]);

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
