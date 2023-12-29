import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Grid, Box, makeStyles, createStyles, Button } from '@material-ui/core';

import Wrapper from '../../components/Wrapper';
import { COLORS } from '../../common/styles/CMTheme';
import ROUTES from '../../router/RouteConfig';
import PageContent from '../../components/PageContent';
import PageTitle from '../../components/PageTitle';
import { useAuth } from '../../hooks/auth/useAuth';
import { useSession } from '../../hooks/useSession';
import { StartTalkingEvent, analyticsService } from 'services';
import CmTypography from 'shared/components/CmTypography';

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

function ConversationsIntroPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { sessionId, hasAcceptedCookies } = useSession();

  const handleStartTalking = () => {
    if (sessionId && hasAcceptedCookies) {
      analyticsService.postEvent(StartTalkingEvent);
    }
    navigate(ROUTES.CONVERSATIONS_PAGE);
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
            <CmTypography variant="body">
              Climate change is a global issue, and your contribution matters!
            </CmTypography>
          </Box>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <Box mt={2} mb={2}>
              {/* SHOW THE REGISTER BUTTON IF USER NOT REGISTERED */}
              {!isLoggedIn ? (
                <Button
                  color="primary"
                  onClick={() => navigate(ROUTES.SIGN_UP_PAGE)}
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

          <Box my={4}>
            <CmTypography variant="body">
              You don't need to be an expert to talk about climate change. Follow
              these easy steps to start having effective conversations:
            </CmTypography>
          </Box>

          <CmTypography variant="body" className={classes.bullet}>Reach out to a friend</CmTypography>
          <CmTypography variant="body" className={classes.bullet}>They'll pick an article to talk about with you</CmTypography>
          <CmTypography variant="body" className={classes.bullet}>Use the article to start a conversation</CmTypography>
          <CmTypography variant="body" className={classes.bullet}>Tell us how it went!</CmTypography>

          <Box my={4}>
            <CmTypography variant="body">
              When you have conversations with others, you take part in a network
              of people around the world who are working together to find
              solutions.
            </CmTypography>
          </Box>
          </div>
        </PageContent>
      </Wrapper>
    </>
  );
}

export default ConversationsIntroPage;
