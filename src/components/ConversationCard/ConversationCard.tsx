import React, { useState, useEffect } from 'react';
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
import { TLocation } from '../../types/Location';
import { useLocation } from 'react-router-dom';
import { useUrlParamQuery } from '../../hooks/useUrlParamQuery';
import DeleteIconButton from '../DeleteIconButton';
import { ConversationCardUserBName } from '../ConversationCardUserBName/ConversationCardUserBName';
import { NotifyIcon } from '../NotifyIcon';
import { COLORS } from '../../common/styles/CMTheme';

export interface ConversationCardProps {
  conversation: TConversation;
  displayModal: (x?: any) => void;
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
  displayModal,
}) => {
  const { userB, state, conversationId, userARating } = conversation;
  const userBName = userB?.name || 'unknown user';

  // Expand Card if route location includes conversation ID to focus
  const location = useLocation<TLocation>();
  const query = useUrlParamQuery();
  const focusCard =
    location.state?.id === conversationId ||
    query.get('conversation') === conversationId;
  const [isExpanded, setIsExpanded] = useState(focusCard);

  const classes = useStyles({ state });
  const link = buildReactUrl(SHARE_OPTIONS.endpoint) + '/' + conversationId;
  const { copyLink, clipboard } = useCopyLink();

  const handleToggleExpanded = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    if (focusCard) {
      document
        .getElementById('conversation-card-focus')
        ?.scrollIntoView({ block: 'center' });
    }
  }, [focusCard]);

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
      id={focusCard ? 'conversation-card-focus' : ''}
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

        <ConversationCardUserBName
          conversationId={conversationId}
          invitedUserName={userBName}
          isEditable={isExpanded}
        />

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
          justifyContent={isExpanded ? 'space-between' : 'flex-end'}
          alignItems="center"
        >
          {isExpanded && (
            <DeleteIconButton
              color={COLORS.ICON_LIGHT}
              onClick={() => displayModal(conversationId)}
            />
          )}
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
