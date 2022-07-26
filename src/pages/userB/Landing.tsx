import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import OpenInNew from '@material-ui/icons/OpenInNew';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ReactComponent as CMLogoDark } from '../../assets/cm-logo-dark.svg';
import { ReactComponent as ArrowDown } from '../../assets/icon-arrow-down-white.svg';
import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import PageTitle from '../../components/PageTitle';
import ROUTES from '../../components/Router/RouteConfig';
import { useAlignment } from '../../hooks/useAlignment';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { useRecordEvents } from '../../hooks/useRecordEvents';
import { useSession } from '../../hooks/useSession';
import { framingUrl } from '../../shareSettings';
import Error404 from '../Error404';
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';

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
  const { quizId, sessionId } = useSession();

  const { conversationId } = useParams<UrlParamType>();
  const { isLoading, isError, conversation } =
    useGetOneConversation(conversationId);
  const { recordUserBVisit } = useRecordEvents();
  const { setIsUserB } = useAlignment();

  useEffect(() => {
    // Set the conversation id and isUserB on load
    if (conversationId) {
      setIsUserB(true, conversationId);
    }
    // Direct user b to the core values if they already have done the quiz
    if (quizId) {
      push(ROUTES.USERB_CORE_VALUES);
    }
    // eslint-disable-next-line
  }, []);

  // Conversation is validated, register user b visit. When the api returns get conversation
  useEffect(() => {
    if (sessionId && conversation) {
      recordUserBVisit(conversationId);
    }
  }, [conversation, conversationId, sessionId, recordUserBVisit]);

  const handleHowCMWorks = () => {
    push(ROUTES.ROUTE_HOW_CM_WORKS);
  };

  const handleNavAway = (url: string) => {
    window.open(url);
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
          <Box textAlign="center">
            <PageTitle variant="h1">
              {conversation?.userA?.name} invited you to take our core values
              quiz!
            </PageTitle>
          </Box>

          <Box textAlign="center" pb={4}>
            <Typography variant="h6">
              Talking about climate change is the most effective way to take
              action.
            </Typography>
          </Box>
          <Box component="div" pt={2} pb={2}>
            <Typography variant="body1" align="center">
              We’ll match your core values and personalized climate topics with 
              {conversation?.userA?.name}'s to unlock your potential to act together
            </Typography>
          </Box>
          <Box textAlign="center" pt={3} pb={3}>
            <ArrowDown data-testid="arrow-down-landing-logo" />
          </Box>
          <Box textAlign="center" pt={2}>
            <Typography variant="h6">
              Want to learn more about framing conversations?
            </Typography>
          </Box>
          <Box component="div" pt={2} pb={8}>
            <Button
              variant="outlined"
              disabled={isLoading}
              disableElevation
              data-testid="framing-button"
              endIcon={<OpenInNew fontSize="small" />}
              onClick={() => handleNavAway(framingUrl)}
            >
              Framing
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
              onClick={handleHowCMWorks}
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
