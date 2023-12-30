import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';

import { ReactComponent as CMLogoDark } from '../../assets/cm-logo-dark.svg';
import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import PageTitle from '../../components/PageTitle';
import ROUTES from '../../router/RouteConfig';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { useRecordEvents } from '../../hooks/useRecordEvents';
import { useSession } from '../../hooks/useSession';
import { useUserB } from '../../hooks/useUserB';
import Error404 from '../SharedPages/Error404Page';
import { CmButton, CmTypography } from 'shared/components';

const styles = makeStyles(() => {
  return {
    root: {
      minHeight: '100vh',
      backgroundColor: 'rgba(138, 213, 204, 0.6)',
    },
    typography: {
      textAlign: 'center',
    },
    container: {
      textAlign: 'center',
      maxWidth: '640px',
      margin: '0 auto',
      padding: '0 1em',
    },
  };
});

type UrlParamType = {
  conversationId: string;
};

function UserBLandingPage() {
  const classes = styles();
  localStorage.removeItem('alignmentScoresId');

  const navigate = useNavigate();
  const location = useLocation();
  const { resetAppStateForUserB } = useUserB();

  const { conversationId } = useParams<UrlParamType>();
  const { isLoading, isError, conversation } =
    useGetOneConversation(conversationId ?? '');
  const { recordUserBVisit } = useRecordEvents();
  const { sessionId } = useSession();

  useEffect(() => {
    resetAppStateForUserB(conversationId ?? '');
    // eslint-disable-next-line
  }, [conversation]);

  // Conversation is validated, register user b visit. When the api returns get conversation
  useEffect(() => {
    if (conversation && sessionId) {
      recordUserBVisit(conversationId ?? '');
      if (conversation.consent) {
        navigate(`${ROUTES.USERB_SHARED_SUCCESS_PAGE}/${conversationId}`, {
          state: {
            from: location.pathname,
            id: conversationId,
            userAName: conversation?.userA?.name,
          },
        });
      }
    }
    // eslint-disable-next-line
  }, [conversation, sessionId]);

  const handleHowCMWorks = () => {
    navigate(`${ROUTES.USERB_HOW_CM_WORKS_PAGE}/${conversationId}`, {
      state: {
        from: location.pathname,
        id: conversationId,
        userAName: conversation?.userA?.name,
      },
    });
  };

  const handleLogin = () => {
    navigate(`${ROUTES.LOGIN_PAGE}`, {
      state: {
        from: location.pathname,
        to: `${ROUTES.USERB_SHARED_VALUES_PAGE}/${conversationId}`,
        id: conversationId,
      },
    });
  };

  // If the conversation can not be found
  if (isError) return <Error404 />;

  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <Box textAlign="center">
            <PageTitle variant="h1">Climate Mind</PageTitle>
          </Box>
          <Box>
            <CMLogoDark data-testid="climate-mind-logo" />
          </Box>
          <Box textAlign="center" pt={2} pb={2}>
            <CmTypography variant="h2">
              {conversation?.userA?.name} invited you to take our core values quiz!
            </CmTypography>
          </Box>

          <Box textAlign="center" pb={2}>
            <CmTypography variant="h4" style={{ margin: 0 }}>
              Talking about climate change is the most effective way to take
              action.
            </CmTypography>
          </Box>
          <Box component="div" pt={1} pb={2}>
            <CmTypography variant="body" style={{ textAlign: 'center' }}>
              We’ll match your core values and personalized climate topics with{' '}
              {conversation?.userA?.name}'s to unlock your potential to act together
            </CmTypography>
          </Box>
          <Box component="div" pt={1} pb={1}>
            <CmTypography variant="h3">
              Already have an account?
            </CmTypography>
          </Box>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CmButton
              text='Login'
              onClick={handleLogin}
            />
          </div>
          <FooterAppBar bgColor={COLORS.ACCENT10} align="center">
            <CmButton
              text='Next: How does ClimateMind work?'
              disabled={isLoading}
              onClick={() => handleHowCMWorks()}
            />
          </FooterAppBar>
        </div>
      </div>
    </>
  );
}

export default UserBLandingPage;
