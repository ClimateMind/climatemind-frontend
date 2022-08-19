import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { TConversationState } from '../../types/Conversation';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';
import ROUTES from '../Router/RouteConfig';
import { useHistory } from 'react-router-dom';

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
  const { push } = useHistory();

  const isBumpStatus = conversationStatus < TConversationState.TopicsViewed;
  const isButtonEnabled =
    conversationStatus >= TConversationState.AlignmentViewed;

  const handleViewSelectedTopics = () => {
    // if conversation state is below 3 (TConversationState.AlignmentViewed) we update state,
    // otherwise not
    if (isBumpStatus) {
      updateConversationState(3);
    }
    push({
      pathname: `${ROUTES.USERA_SHARED_FEED}/${conversationId}`,
      state: { from: `${ROUTES.ROUTE_SHARE_LINK}`, id: conversationId },
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
