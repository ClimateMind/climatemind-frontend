import React from 'react';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../../common/styles/CMTheme';
import { useUpdateConversation } from '../../hooks/useUpdateConversation';

export interface ConversationRatingButtonProps {
  emojiIcon: string;
  buttonRating: number;
  conversationRating: number | null;
  conversationId: string;
  accessibleText: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      border: `1px solid ${COLORS.DEEP_PURPLE}`,
      minWidth: '50px',

      // Button should have a shaded backgroung when the rating of the convesation has been chosen and that button represents the rating of the conversation
      backgroundColor: (props: any) => (props.ratingMatches ? 'lightGrey' : ''),
    },
  })
);

export const ConversationRatingButton: React.FC<
  ConversationRatingButtonProps
> = ({
  emojiIcon,
  buttonRating,
  conversationRating,
  accessibleText,
  conversationId,
}) => {
  const ratingMatches = buttonRating === conversationRating;
  const classes = useStyles({ ratingMatches });

  const { updateConversation } = useUpdateConversation(conversationId);

  const handleUpdateRating = () => {
    try {
      updateConversation({ userARating: buttonRating });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      className={classes.root}
      variant="outlined"
      onClick={handleUpdateRating}
      aria-label={accessibleText}
      data-testid="btn-rate-conversation"
    >
      {emojiIcon}
    </Button>
  );
};
