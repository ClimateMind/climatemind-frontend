import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import ROUTES from '../Router/RouteConfig';
import { TConversationState } from '../../types/Conversation';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: '0 0 1.5em',
    },
  })
);

export interface ViewSelectedTopicsProps {
  conversationState: TConversationState;
  conversationId: string;
}

export const ViewSelectedTopics: React.FC<ViewSelectedTopicsProps> = ({
  conversationState: conversationStatus,
  conversationId,
}) => {
  const classes = useStyles();
  const { updateConversationState } = useUpdateConversation(conversationId);
  const navigate = useNavigate();

  const isBumpStatus = conversationStatus < TConversationState.TopicsViewed;
  const isButtonEnabled =
    conversationStatus >= TConversationState.AlignmentViewed;

  const handleViewSelectedTopics = () => {
    // if conversation state is below 3 (TConversationState.AlignmentViewed) we update state,
    // otherwise not
    if (isBumpStatus) {
      updateConversationState(3);
    }
    navigate(`${ROUTES.USERA_SHARED_FEED_PAGE}/${conversationId}`, {
      state: { from: `${ROUTES.CONVERSATIONS_PAGE}`, id: conversationId },
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={!isButtonEnabled}
        onClick={handleViewSelectedTopics}
      >
        VIEW SELECTED TOPICS
      </Button>
    </div>
  );
};
