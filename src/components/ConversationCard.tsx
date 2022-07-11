import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { buildReactUrl } from '../api/apiHelper';
import { ConversationState } from '../components/ConversationState/ConversationState';
import ROUTES from '../components/Router/RouteConfig';
import { capitalize } from '../helpers/capitalize';
import { useAlignment } from '../hooks/useAlignment';
import { useCopyLink } from '../hooks/useCopyLink';
import { useGetOneConversation } from '../hooks/useGetOneConversation';
import { useUpdateConversation } from '../hooks/useUpdateConversation';
import { SHARE_OPTIONS } from '../shareSettings';
import { TConversation } from '../types/Conversation';
import { CompleteConversation } from './CompleteConversation/CompleteConversation';
import { ViewSelectedTopics } from './ViewSelectedTopics';

export type ConversationCardProps = {
  conversation: TConversation;
};

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

export const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
}) => {
  const { invitedUserName, state, conversationId, userARating } = conversation;
  const { push } = useHistory();
  const classes = useStyles();
  const link = buildReactUrl(SHARE_OPTIONS.endpoint) + '/' + conversationId;
  const { copyLink, clipboard } = useCopyLink();

  const { setAlignmentScoresId } = useAlignment();
  const { conversation: data } = useGetOneConversation(conversationId);

  const { updateConversationState } = useUpdateConversation(conversationId);

  const handleSharedValues = () => {
    if (data?.alignmentScoresId) {
      setAlignmentScoresId(data.alignmentScoresId as string);
      updateConversationState(2);
      push(`${ROUTES.SHARED_VALUES}`);
    }
  };

  return (
    <Card
      className={classes.card}
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
            <ConversationState
              state={state}
              userBName={conversation.userB?.name}
            />
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
          {capitalize(invitedUserName)}
        </Typography>

        <Typography variant="h6" component="h6" className={classes.headerLink}>
          1. {capitalize(invitedUserName)} took the values quiz
        </Typography>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSharedValues}
            className={classes.button}
            disabled={!data?.alignmentScoresId}
          >
            SEE HOW YOU ALIGN
          </Button>
        </Grid>

        <Typography variant="h6" component="h6" className={classes.headerLink}>
          2. See what you can discuss with {invitedUserName}
        </Typography>
        <Grid>
          <ViewSelectedTopics
            conversationState={state}
            conversationId={conversationId}
          />
        </Grid>

        <Typography variant="h6" component="h6" className={classes.headerLink}>
          3. Have you had your conversation with {conversation.userB?.name}?
        </Typography>
        <Grid>
          <CompleteConversation
            conversationRating={userARating}
            conversationState={state}
            conversationId={conversationId}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConversationCard;
