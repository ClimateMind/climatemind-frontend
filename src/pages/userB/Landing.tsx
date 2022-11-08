import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { ReactComponent as CMLogoDark } from '../../assets/cm-logo-dark.svg';
import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import PageTitle from '../../components/PageTitle';
import ROUTES from '../../components/Router/RouteConfig';
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { useRecordEvents } from '../../hooks/useRecordEvents';
import { useSession } from '../../hooks/useSession';
import { useUserB } from '../../hooks/useUserB';
import Error404 from '../Error404';

const styles = makeStyles((theme) => {
  return {
    root: {
      minHeight: '100vh',
      backgroundColor: COLORS.SECTION1,
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

const Landing: React.FC = () => {
  const classes = styles();

  const { push } = useHistory();
  const location = useLocation();
  const { resetAppStateForUserB } = useUserB();

  const { conversationId } = useParams<UrlParamType>();
  const { isLoading, isError, conversation } =
    useGetOneConversation(conversationId);
  const { recordUserBVisit } = useRecordEvents();
  const { sessionId } = useSession();

  useEffect(() => {
    resetAppStateForUserB(conversationId ?? '');
    // eslint-disable-next-line
  }, [conversation]);

  // Conversation is validated, register user b visit. When the api returns get conversation
  useEffect(() => {
    if (conversation && sessionId) {
      recordUserBVisit(conversationId);
      if (conversation.consent) {
        push({
          pathname: `${ROUTES.USERB_SHARED_SUCCESS}/${conversationId}`,
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
    push({
      pathname: `${ROUTES.ROUTE_HOW_CM_WORKS}/${conversationId}`,
      state: {
        from: location.pathname,
        id: conversationId,
        userAName: conversation?.userA?.name,
      },
    });
  };

  const handleLogin = () => {
    push({
      pathname: `${ROUTES.ROUTE_LOGIN}`,
      state: {
        from: location.pathname,
        to: `${ROUTES.USERB_SHARED_VALUES}/${conversationId}`,
        id: conversationId,
      },
    });
  };

  // If the conversation can not be found
  if (isError) return <Error404 />;

  return (
    <>
      <ScrollToTopOnMount />
      <div className={classes.root}>
        <div className={classes.container}>
          <Box textAlign="center">
            <PageTitle variant="h1">Climate Mind</PageTitle>
          </Box>
          <Box>
            <CMLogoDark data-testid="climate-mind-logo" />
          </Box>
          <Box textAlign="center" pt={2} pb={2}>
            <Typography variant="h3">
              {conversation?.userA?.name} invited you to take our core values
              quiz!
            </Typography>
          </Box>

          <Box textAlign="center" pb={2}>
            <Typography variant="h6">
              Talking about climate change is the most effective way to take
              action.
            </Typography>
          </Box>
          <Box component="div" pt={1} pb={2}>
            <Typography variant="body1" align="center">
              We’ll match your core values and personalized climate topics with{' '}
              {conversation?.userA?.name}'s to unlock your potential to act
              together
            </Typography>
          </Box>
          <Box component="div" pt={1} pb={1}>
            <Typography variant="h5" align="center">
              Already have an account?
            </Typography>
          </Box>
          <Box textAlign="center" pb={10}>
            <Button
              variant="outlined"
              disableElevation
              data-testid="login-button"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
          <FooterAppBar bgColor={COLORS.ACCENT10} align="center">
            <Button
              style={{
                border: `${
                  isLoading ? '1px solid transparent' : '1px solid #a347ff'
                }`,
              }}
              disabled={isLoading}
              variant="contained"
              color="primary"
              disableElevation
              data-testid="how-cm-works-button"
              onClick={() => handleHowCMWorks()}
            >
              Next: How does ClimateMind work?
            </Button>
          </FooterAppBar>
        </div>
      </div>
    </>
  );
};

export default Landing;
