import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { buildReactUrl } from '../api/apiHelper';
import { SHARE_OPTIONS } from '../shareSettings';
import { TConversation } from '../types/Conversation';
import { ConversationStatus } from './ConversationStatus';
import { useCopyLink } from '../hooks/useCopyLink';

export type ConversationCardProps = {
  conversation: TConversation;
};

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      margin: '0 0 2em',
      width: '100%',
    },
    copyLink: {
      color: '#07373B',
    },
  })
);

export const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
}) => {
  const { invitedUserName, conversationStatus, conversationId } = conversation;
  const classes = useStyles();
  const link = buildReactUrl(SHARE_OPTIONS.endpoint) + '/' + conversationId;
  const { copyLink, clipboard } = useCopyLink();

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
            <ConversationStatus status={conversationStatus} />
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
        <Typography variant="h4" component="h4">
          {invitedUserName}
        </Typography>
        <Grid>
          </Grid>
          <Typography variant="h6" component="h6">
          1. {invitedUserName} took the values quiz
          </Typography>
          <Grid>
          <Button
            variant="contained"
            color="primary"
          >
            <Typography variant="h6" component="h6" >
            SEE HOW YOU ALIGN
            </Typography>
          </Button>
        </Grid>
        <Grid>
        </Grid>
          <Typography variant="h6" component="h6">
          3. Have you had your conversation?
          </Typography>
          <Grid>
          <Button
            variant="contained"
            color="primary"
          >
            <Typography variant="h6" component="h6" >
            YEA WE TALKED!
            </Typography>
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConversationCard;
