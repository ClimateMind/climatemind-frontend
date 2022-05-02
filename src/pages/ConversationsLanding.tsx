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

  if (!isFeatureEnabled.conversations) return <EmailNewsletterSignUpPage />;

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT3} fullHeight={true}>
        <PageContent>
          <Box>
            <Grid item>
              <PageTitle>How to talk about Climate Change…</PageTitle>
            </Grid>
          </Box>

          <Box my={2}>
            <Typography variant="h6" component="h6" align="center">
              Talking about climate change is the most effective way to take
              action.
            </Typography>
          </Box>

          <Box display="flex" justifyContent="flex-start">
            <PageTitle align="left">Step 1: Bond</PageTitle>
          </Box>
          <Box display="flex" justifyContent="flex-start">
            <Typography variant="h6" component="h6" align="left">
              Start your conversation by bonding over similarities in personal
              values and interests.
            </Typography>
          </Box>
          <Box display="flex" pt={1} justifyContent="flex-start">
            <Typography
              variant="body1"
              component="p"
              className={classes.bullet}
              align="left"
            >
              Climate Mind helps with this by giving you a special link to the
              values questionnaire to share with others before you chat.
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-start">
            <PageTitle align="left">Step 2: Connect</PageTitle>
          </Box>
          <Box display="flex" justifyContent="flex-start">
            <Typography variant="h6" component="h6" align="left">
              Connect the dots for others on how your shared values relate to
              climate change.
            </Typography>
          </Box>
          <Box display="flex" pt={1} justifyContent="flex-start">
            <Typography
              variant="body1"
              component="p"
              className={classes.bullet}
              align="left"
            >
              Climate Mind will find the connections so you don’t have to!
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-start">
            <PageTitle align="left">Step 3: Inspire</PageTitle>
          </Box>
          <Box display="flex" justifyContent="flex-start">
            <Typography variant="h6" component="h6" align="left">
              Motivate the other person with solutions they find attractive.
            </Typography>
          </Box>
          <Box display="flex" pt={1} justifyContent="flex-start">
            <Typography
              variant="body1"
              component="p"
              className={classes.bullet}
              align="left"
            >
              Climate Mind has you covered for this one too!
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
                  onClick={() => push(ROUTES.ROUTE_SHARE_LINK)}
                  variant="contained"
                  disableElevation
                  data-testid="start-talking-with-people-button"
                >
                  Start Talking With People
                </Button>
              )}
            </Box>
          </Grid>
        </PageContent>
      </Wrapper>
    </>
  );
};

export default ConversationsLanding;
