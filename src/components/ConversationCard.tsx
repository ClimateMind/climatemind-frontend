import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ROUTES from '../components/Router/RouteConfig';
import { buildReactUrl } from '../api/apiHelper';
import { SHARE_OPTIONS } from '../shareSettings';
import { TConversation } from '../types/Conversation';
import { ConversationStatus } from './ConversationStatus';
import { useCopyLink } from '../hooks/useCopyLink';
import { useHistory } from 'react-router-dom';

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
    button: {
      margin:'0 0 1.5em'
    },
    headerLink: {
      margin:'0 0 0.5em'
    }
  })
);

export const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
}) => {
  const { invitedUserName, conversationStatus, conversationId } = conversation;
  const { push } = useHistory();
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
        <Typography variant="h4" component="h4" style={{marginBottom:'1.5em'}} >
          {invitedUserName}
        </Typography>

        <Typography variant="h6" component="h6"  className={classes.headerLink}>
          1. {invitedUserName} took the values quiz
        </Typography>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            onClick = {()=>push(ROUTES.USERB_SHARED_VALUES)}
            className={classes.button}
          >
            SEE HOW YOU ALIGN
          </Button>
        </Grid>

        <Typography variant="h6" component="h6"  className={classes.headerLink}>
          2. See what you can discuss with {invitedUserName}
        </Typography>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            VIEW SELECTED TOPICS
          </Button>
        </Grid>
        
        <Typography variant="h6" component="h6"  className={classes.headerLink}>
          3. Have you had your conversation?
        </Typography>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            YEA WE TALKED!
          </Button>
        </Grid>

      </CardContent>
    </Card>
  );
};

export default ConversationCard;
