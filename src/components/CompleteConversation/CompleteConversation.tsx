import { Button, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { TConversationState } from '../../types/Conversation';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: '0 0 1.5em',
    },
  })
);

export interface CompleteConversationProps {
  conversationStatus: TConversationState;
  conversationId: string;
}

export const CompleteConversation: React.FC<CompleteConversationProps> = ({
  conversationStatus,
  conversationId,
}) => {
  const classes = useStyles();
  const { updateConversationState } = useUpdateConversation(conversationId);

  const isButtonDisabled =
    conversationStatus !== TConversationState.TopicsViewed;

  const isButtonShown = conversationStatus <= TConversationState.TopicsViewed;

  const handleCompleteConversation = () => {
    // TODO: Update this to use new update mechanismn
    updateConversationState(4);
  };

  return (
    <div>
      {isButtonShown && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={isButtonDisabled}
          onClick={handleCompleteConversation}
        >
          YEA WE TALKED!
        </Button>
      )}

      {!isButtonShown && <Typography variant="h3">Yay! Go you!</Typography>}
    </div>
  );
};
