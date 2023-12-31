import { Grid, Box } from '@mui/material';
import { ConversationRatingButton } from '../ConversationRatingButton';
import { TConversationState } from '../../types/Conversation';
import { CmTypography } from 'shared/components';

export interface ConversationRatingProps {
  conversationId: string;
  conversationState: TConversationState;
}

export const ConversationRating: React.FC<ConversationRatingProps> = ({
  conversationId,
}) => {
  const buttons = [
    { icon: '😡', buttonRating: 1, accesibleText: 'terrible' },
    { icon: '😐', buttonRating: 2, accesibleText: 'unpleasant' },
    { icon: '🤔', buttonRating: 3, accesibleText: 'okay' },
    { icon: '😊', buttonRating: 4, accesibleText: 'good' },
    { icon: '🥳', buttonRating: 5, accesibleText: 'amazing' },
  ];

  return (
    <div>
      <Box my={2}>
        <CmTypography variant="h3" style={{ textAlign: 'left' }}>How Did it go?</CmTypography>
      </Box>
      <Grid
        spacing={1}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {buttons.map((button) => (
          <Grid item>
            <ConversationRatingButton
              key={`rating-btn-${button.buttonRating}`}
              emojiIcon={button.icon}
              buttonRating={button.buttonRating}
              conversationId={conversationId}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
