import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { buildReactUrl } from '../../api/apiHelper';
import { ConversationState } from '../../components/ConversationState/ConversationState';
import Loader from '../../components/Loader';
import { capitalize } from '../../helpers/capitalize';
import { useCopyLink } from '../../hooks/useCopyLink';
import { SHARE_OPTIONS } from '../../shareSettings';
import { TConversation } from '../../types/Conversation';
import { CompleteConversation } from '../CompleteConversation/CompleteConversation';
import { HowYouAlignButton } from '../HowYouAlignButton';
import { ViewSelectedTopics } from '../ViewSelectedTopics';
import { ConversationCardActions } from '../ConversationCardActions/ConversationCardActions';

export interface ConversationCardProps {
  conversation: TConversation;
}

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      margin: '0 0 2em',
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

export const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
}) => {
  const { userB, state, conversationId, userARating } = conversation;
  const userBName = userB?.name || 'unknown user';

  const classes = useStyles();
  const link = buildReactUrl(SHARE_OPTIONS.endpoint) + '/' + conversationId;
  const { copyLink, clipboard } = useCopyLink();

  if (!conversation)
    return (
      <Card>
        <Loader />
      </Card>
    );

  return (
    <Card
      className={cx(classes.card, 'conversation-card')}
      data-testid={`conversation-card-${conversationId}`}
    >
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <ConversationState state={state} userBName={userB?.name} />
          </Grid>
          <Grid item>
            <Button
              ref={clipboard.target}
              className={classes.copyLink}
              onClick={() => copyLink(link)}
              data-testid={`copy-link-button-${conversationId}`}
            >
              Copy Link
            </Button>
          </Grid>
        </Grid>
        <Typography
          variant="h4"
          component="h4"
          style={{ marginBottom: '1.5em' }}
        >
          {capitalize(userB?.name || '')}
        </Typography>
        <ConversationCardActions>
          <Typography
            variant="h6"
            component="h6"
            className={classes.headerLink}
          >
            1. {capitalize(userBName)} took the values quiz
          </Typography>
          <Grid>
            <HowYouAlignButton
              conversationState={state}
              conversationId={conversationId}
            />
          </Grid>

          <Typography
            variant="h6"
            component="h6"
            className={classes.headerLink}
          >
            2. See what you can discuss with {userBName}
          </Typography>
          <Grid>
            <ViewSelectedTopics
              conversationState={state}
              conversationId={conversationId}
            />
          </Grid>

          <Typography
            variant="h6"
            component="h6"
            className={classes.headerLink}
          >
            3. Have you had your conversation with {userBName}?
          </Typography>
          <Grid>
            <CompleteConversation
              conversationRating={userARating}
              conversationState={state}
              conversationId={conversationId}
            />
          </Grid>
        </ConversationCardActions>
      </CardContent>
    </Card>
  );
};

export default ConversationCard;
