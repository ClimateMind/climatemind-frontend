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

export interface ViewSelecteTopicsProps {
  conversationState: TConversationState;
  conversationId: string;
}

export const ViewSelecteTopics: React.FC<ViewSelecteTopicsProps> = ({
  conversationState: conversationStatus,
  conversationId,
}) => {
  const classes = useStyles();
  const { updateConversationState } = useUpdateConversation(conversationId);

  const isButtonDisabled =
    conversationStatus <= TConversationState.AlignmentViewed;  //probably need to push state forward ehen clicking on "See how you align"

  const isButtonShown = conversationStatus <= TConversationState.AlignmentViewed;

  const handleViewSelectedTopics = () => {
    // TODO: Update this to use new update mechanismn
    // updateConversationState(4);
  };

  return (
    <div>
      {isButtonShown && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={isButtonDisabled}
          onClick={handleViewSelectedTopics}
        >
          VIEW SELECTED TOPICS
        </Button>
      )}

    </div>
  );
};
