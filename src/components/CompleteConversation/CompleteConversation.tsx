import { Button, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { TConversationState } from '../../types/Conversation';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';
import { ConversationRating } from '../ConversationRating';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: '0 0 1.5em',
    },
  })
);

export interface CompleteConversationProps {
  conversationState: TConversationState;
  conversationId: string;
  conversationRating: number | null;
  onClick: (state: number) => void;
}

export const CompleteConversation: React.FC<CompleteConversationProps> = ({
  conversationState,
  conversationId,
  conversationRating,
  onClick,
}) => {
  const classes = useStyles();
  const { updateConversationState } = useUpdateConversation(conversationId);

  const isButtonDisabled =
    conversationState !== TConversationState.TopicsViewed;

  const isButtonShown = conversationState <= TConversationState.TopicsViewed;

  const showRating = conversationState >= TConversationState.Talked;

  return (
    <div>
      {isButtonShown && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={isButtonDisabled}
          onClick={() => {updateConversationState(4); onClick(4)}}
        >
          YES WE TALKED!
        </Button>
      )}

      {!isButtonShown && <Typography variant="h3">Yay! Go you!</Typography>}

      {showRating && (
        <ConversationRating
          conversationState={conversationState}
          conversationRating={conversationRating}
          conversationId={conversationId}
        />
      )}
    </div>
  );
};
