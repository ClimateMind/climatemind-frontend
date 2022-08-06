import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Collapse,
  Box,
} from '@material-ui/core';
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

import { ConversationCardUserBName } from '../ConversationCardUserBName/ConversationCardUserBName';

import { NotifyIcon } from '../NotifyIcon';
import { COLORS } from '../../common/styles/CMTheme';


export interface ConversationCardProps {
  conversation: TConversation;
}

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      margin: '0 0 2em',
      backgroundColor: (props: { state: number }) =>
        props.state === 5 ? COLORS.SUCCESS_LIGHT2 : 'white',
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
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles({ state });
  const link = buildReactUrl(SHARE_OPTIONS.endpoint) + '/' + conversationId;
  const { copyLink, clipboard } = useCopyLink();

  const handleToggleExpanded = () => setIsExpanded(!isExpanded);

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
            <ConversationState
              state={state}
              userBName={userB?.name}
              isExpanded={isExpanded}
            />
          </Grid>
          <Grid item>
            {isExpanded ? (
              <Button
                ref={clipboard.target}
                className={classes.copyLink}
                onClick={() => copyLink(link)}
                data-testid={`copy-link-button-${conversationId}`}
              >
                Copy Link
              </Button>
            ) : (
              <NotifyIcon state={state} />
            )}
          </Grid>
        </Grid>

        <Typography
          variant="h4"
          component="h4"
          style={{ marginBottom: '1.5em' }}
        >
          <ConversationCardUserBName conversationId={conversationId} invitedUserName={userBName}/>
        </Typography>

        <Typography variant="h6" component="h6" className={classes.headerLink}>
          1. {capitalize(userBName)} took the values quiz
        </Typography>

        <Grid>
          <HowYouAlignButton
            conversationState={state}
            conversationId={conversationId}
          />
        </Grid>

        <Typography variant="h4" component="h4">
          {capitalize(userB?.name || '')}
        </Typography>

        {/* Conversation Action Buttons */}


        <Collapse in={isExpanded} unmountOnExit>
          <Box py={2} data-testid="conversation-card-actions">
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
          </Box>
        </Collapse>

        {/* Collapse Button */}
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Box>
            <Button onClick={handleToggleExpanded}>
              {isExpanded ? 'LESS' : 'MORE'}
            </Button>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConversationCard;
