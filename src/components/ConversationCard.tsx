import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import EditIcon  from '@material-ui/icons/Edit';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { buildReactUrl } from '../api/apiHelper';
import ROUTES from '../components/Router/RouteConfig';
import { capitalize } from '../helpers/capitalize';
import { useAlignment } from '../hooks/useAlignment';
import { useCopyLink } from '../hooks/useCopyLink';
import { useGetOneConversation } from '../hooks/useGetOneConversation';
import { SHARE_OPTIONS } from '../shareSettings';
import { TConversation } from '../types/Conversation';
import { ConversationStatus } from './ConversationStatus';
import {UserBEditNameForm}  from '../pages/userB/EditUserB/UserBEditNameForm';
import { userBEditContext } from '../contexts/userBEdit';


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
  const { invitedUserName, conversationStatus, conversationId } = conversation;
  const { push } = useHistory();
  const classes = useStyles();
  const link = buildReactUrl(SHARE_OPTIONS.endpoint) + '/' + conversationId;
  const { copyLink, clipboard } = useCopyLink();

  const { setAlignmentScoresId } = useAlignment();
  const { conversation: data } = useGetOneConversation(conversationId);

  const handleSharedValues = () => {
    if (data?.alignmentScoresId) {
      setAlignmentScoresId(data.alignmentScoresId as string);
      push(`${ROUTES.SHARED_VALUES}`);
    }
  };


  const {isEdit, toggleEdit} = useContext(userBEditContext)

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
        <Typography
          variant="h4"
          component="h4"
          style={{ marginBottom: '1.5em' }}
        >
          {
            !isEdit &&
          (<Grid item>
            {capitalize(invitedUserName)}
            <EditIcon onClick={() => toggleEdit()}/>
          </Grid>)
          }

          {isEdit && <UserBEditNameForm conversationId = {conversationId} invitedUserName = {invitedUserName}/>}
          
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
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!data?.alignmentScoresId}
          >
            VIEW SELECTED TOPICS
          </Button>
        </Grid>

        {/* <Typography variant="h6" component="h6"  className={classes.headerLink}>
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
        </Grid> */}
      </CardContent>
    </Card>
  );
};

export default ConversationCard;
