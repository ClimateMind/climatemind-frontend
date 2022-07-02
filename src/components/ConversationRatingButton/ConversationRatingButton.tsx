import React from 'react';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme, { COLORS } from '../../common/styles/CMTheme';

export interface ConversationRatingButtonProps {
  emojiIcon: string;
  buttonRating: number;
  conversationRating: number | null;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      border: `1px solid ${COLORS.DEEP_PURPLE}`,
      // Button should have a shaded backgroung when the rating of the convesation has been chosen and that button represents the rating of the conversation
      backgroundColor: (props: any) => (props.ratingMatches ? 'lightGrey' : ''),
    },
  })
);

export const ConversationRatingButton: React.FC<
  ConversationRatingButtonProps
> = ({ emojiIcon, buttonRating, conversationRating }) => {
  const ratingMatches = buttonRating === conversationRating;
  const classes = useStyles({ ratingMatches });

  return (
    <Button className={classes.root} variant="outlined">
      {emojiIcon}
    </Button>
  );
};
