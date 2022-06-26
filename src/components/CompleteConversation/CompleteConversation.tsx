import { Button, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { TConversationStatus } from '../../types/Conversation';
import { useConversation } from '../../hooks/useConversation';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      margin: '0 0 2em',
      width: '100%',
      padding: '10px 20px',
    },
    copyLink: {
      color: '#07373B',
    },
    button: {
      margin: '0 0 1.5em',
    },
    headerLink: {
      margin: '0 0 0.5em',
    },
  })
);

export interface CompleteConversationProps {
  conversationStatus: TConversationStatus;
  conversationId: string;
}

export const CompleteConversation: React.FC<CompleteConversationProps> = ({
  conversationStatus,
  conversationId,
}) => {
  const classes = useStyles();
  const { updateConversationStatus } = useConversation(conversationId);

  const isButtonDisabled =
    conversationStatus !== TConversationStatus.QuizCompleted;

  const handleCompleteConversation = () => {
    updateConversationStatus(TConversationStatus.ConversationCompleted);
  };

  return (
    <div>
      {conversationStatus !== TConversationStatus.ConversationCompleted && (
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

      {conversationStatus === TConversationStatus.ConversationCompleted && (
        <Typography variant="h3">Yay! Go you!</Typography>
      )}
    </div>
  );
};
