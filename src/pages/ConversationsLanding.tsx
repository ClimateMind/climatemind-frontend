import React from 'react';
import {
  Typography,
  Grid,
  Box,
  makeStyles,
  createStyles,
  Button,
} from '@material-ui/core';
import Wrapper from '../components/Wrapper';
import { COLORS } from '../common/styles/CMTheme';
import ROUTES from '../components/Router/RouteConfig';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import { useHistory } from 'react-router-dom';
import { isFeatureEnabled } from '../features';
import { EmailNewsletterSignUpPage } from '../pages/EmailNewsletterSignUp';
import { useAuth } from '../hooks/auth/useAuth';
import { useSession } from '../hooks/useSession';
import { StartTalkingEvent, analyticsService } from 'services';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    iconContainer: {
      textAlign: 'center',
    },
    bigIcon: {
      color: COLORS.DK_TEXT,
      height: '100px',
      marginRight: '15px',
      width: '55px',
      '& svg': {
        height: '50px',
      },
    },
    links: {
      marginBottom: '20px',
      '& a': {
        color: COLORS.DK_TEXT,
        textDecoration: 'underline',
      },
      '& :first-child': {
        marginBottom: '1em',
      },
    },
    bullet: {
      '&::before': {
        content: '"• "',
      },
    },
  })
);

const ConversationsLanding: React.FC = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const { isLoggedIn } = useAuth();
  const { sessionId, hasAcceptedCookies } = useSession();

  if (!isFeatureEnabled.conversations) return <EmailNewsletterSignUpPage />;

  const handleStartTalking = () => {
    if (sessionId && hasAcceptedCookies) {
      analyticsService.postEvent(StartTalkingEvent);
    }
    push(ROUTES.ROUTE_SHARE_LINK);
  };

  return (
    <>
      <Wrapper bgColor="rgba(138, 213, 204, 0.6)" fullHeight={true}>
        <PageContent>
          <div style={{ maxWidth: 400, paddingLeft: 40, paddingRight: 40 }}>
          <Box>
            <Grid item>
              <PageTitle>How to talk about Climate Change</PageTitle>
            </Grid>
          </Box>

          <Box mb={2}>
            <Typography variant="h6" component="h6">
              Climate change is a global issue, and your contribution matters!
            </Typography>
          </Box>

          <Box my={4}>
            <Typography variant="h6" component="h6">
              You don't need to be an expert to talk about climate change. Follow
              these easy steps to start having effective conversations:
            </Typography>
          </Box>

          <Typography
            variant="body1"
            component="p"
            className={classes.bullet}
            align="left"
          >
            Reach out to a friend
          </Typography>

          <Typography
            variant="body1"
            component="p"
            className={classes.bullet}
          >
            They'll pick an article to talk about with you
          </Typography>

          <Typography
            variant="body1"
            component="p"
            className={classes.bullet}
          >
            Use the article to start a conversation
          </Typography>

          <Typography
            variant="body1"
            component="p"
            className={classes.bullet}
          >
            Tell us how it went!
          </Typography>

          <Box my={4}>
          <Typography variant="h6" component="h6">
            When you have conversations with others, you take part in a network
            of people around the world who are working together to find
            solutions.
          </Typography>
          </Box>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <Box mt={8} mb={3}>
              {/* SHOW THE REGISTER BUTTON IF USER NOT REGISTERED */}
              {!isLoggedIn ? (
                <Button
                  color="primary"
                  onClick={() => push(ROUTES.ROUTE_REGISTER)}
                  variant="contained"
                  disableElevation
                  data-testid="register-button"
                >
                  Register to start talking
                </Button>
              ) : (
                <Button
                  color="primary"
                  onClick={handleStartTalking}
                  variant="contained"
                  disableElevation
                  data-testid="start-talking-with-people-button"
                >
                  Start a conversation
                </Button>
              )}
            </Box>
          </Grid>
          </div>
        </PageContent>
      </Wrapper>
    </>
  );
};

export default ConversationsLanding;
