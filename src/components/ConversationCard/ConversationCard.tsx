import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Grid, Collapse, Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import cx from 'classnames';
import { buildReactUrl } from '../../api/ClimateApi';
import { ConversationState } from '../../components/ConversationState/ConversationState';
import Loader from '../../components/Loader';
import { capitalize } from '../../helpers/capitalize';
import { SHARE_OPTIONS } from '../../shareSettings';
import { TConversation } from '../../types/Conversation';
import { CompleteConversation } from '../CompleteConversation/CompleteConversation';
import { HowYouAlignButton } from '../HowYouAlignButton';
import { ViewSelectedTopics } from '../ViewSelectedTopics';
import { useUrlParamQuery } from '../../hooks/useUrlParamQuery';
import DeleteIconButton from '../DeleteIconButton';
import { ConversationCardUserBName } from '../ConversationCardUserBName/ConversationCardUserBName';
import { NotifyIcon } from '../NotifyIcon';
import { COLORS } from '../../common/styles/CMTheme';
import { CmButton, CmTypography } from 'shared/components';

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
  const { userB, state, conversationId } = conversation;
  const userBName = userB?.name || 'unknown user';

  // Expand Card if route location includes conversation ID to focus
  const location = useLocation();
  const query = useUrlParamQuery();
  const focusCard =
    location.state?.id === conversationId ||
    query.get('conversation') === conversationId;
  const [isExpanded, setIsExpanded] = useState(focusCard);

  const [conversationState, setConversationState] = useState<number>(state);

  const classes = useStyles({ state: conversationState });
  const link = buildReactUrl(SHARE_OPTIONS.endpoint) + '/' + conversationId;

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
              state={conversationState}
              userBName={userB?.name}
              isExpanded={isExpanded}
            />
          </Grid>
          <Grid item>
            {isExpanded ? (
              <CmButton
                text='Copy Link'
                onClick={() => navigator.clipboard.writeText(link)}
                variant='text'
              />
            ) : (
              <NotifyIcon state={conversationState} />
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
            {conversationState === 0 ? (
              <CmTypography variant='body'>
                When {userBName} is finished, we will send you an email and
                their results will appear here. Then you can start preparing for
                your chat!
                <br /><br />
                If you need to resend {userBName} their link, you can access it
                by clicking “COPY LINK”.
              </CmTypography>
            ) : (
              <>
                <CmTypography variant="h4" style={{ textAlign: 'left', marginTop: 0, marginBottom: 10 }}>
                  1. {capitalize(userBName)} took the values quiz
                </CmTypography>
                <Grid>
                  <HowYouAlignButton
                    conversationState={conversationState}
                    conversationId={conversationId}
                  />
                </Grid>

                <CmTypography variant="h4" style={{ textAlign: 'left', marginTop: 0, marginBottom: 10 }}>
                  2. See what you can discuss with {userBName}
                </CmTypography>
                <Grid>
                  <ViewSelectedTopics
                    conversationState={conversationState}
                    conversationId={conversationId}
                  />
                </Grid>

                <CmTypography variant="h4" style={{ textAlign: 'left', marginTop: 0, marginBottom: 10 }}>
                  3. Have you had your conversation with {userBName}?
                </CmTypography>
                <Grid>
                  <CompleteConversation
                    conversationState={conversationState}
                    conversationId={conversationId}
                    onClick={() => (state < 4 ? setConversationState(4) : null)}
                  />
                </Grid>
              </>
            )}
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
            <CmButton
              variant='text'
              text={isExpanded ? 'LESS' : 'MORE'}
              onClick={handleToggleExpanded}
            />
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConversationCard;
