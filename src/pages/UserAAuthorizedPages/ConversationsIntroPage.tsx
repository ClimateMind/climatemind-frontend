import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Box, Grid } from '@mui/material';

import Wrapper from '../../components/Wrapper';
import ROUTES from '../../router/RouteConfig';
import PageContent from '../../components/PageContent';
import { useAuth } from '../../hooks/auth/useAuth';
import { useSession } from '../../hooks/useSession';
import { StartTalkingEvent, analyticsService } from 'services';
import { CmButton, CmTypography } from 'shared/components';

function ConversationsIntroPage() {
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
              <CmTypography variant='h1'>How to talk about Climate Change</CmTypography>
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
                <CmButton
                  text='Register to start talking'
                  onClick={() => navigate(ROUTES.SIGN_UP_PAGE)}
                />
              ) : (
                <CmButton
                  text='Start a conversation'
                  onClick={handleStartTalking}
                />
              )}
            </Box>
          </Grid>

          <Box my={4}>
            <CmTypography variant="body">
              You don't need to be an expert to talk about climate change. Follow
              these easy steps to start having effective conversations:
            </CmTypography>
          </Box>

          <CmTypography variant="body">Reach out to a friend</CmTypography>
          <CmTypography variant="body">They'll pick an article to talk about with you</CmTypography>
          <CmTypography variant="body">Use the article to start a conversation</CmTypography>
          <CmTypography variant="body">Tell us how it went!</CmTypography>

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
