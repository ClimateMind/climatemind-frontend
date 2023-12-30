import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, createStyles, Grid, makeStyles } from '@material-ui/core';
import OpenInNew from '@material-ui/icons/OpenInNew';

import { ReactComponent as ArrowDownPurple } from '../../assets/icon-arrow-down-purple.svg';
import { ReactComponent as StepFourIcon } from '../../assets/step-four-icon.svg';
import { ReactComponent as StepOneIcon } from '../../assets/step-one-icon.svg';
import { ReactComponent as StepThreeIcon } from '../../assets/step-three-icon.svg';
import { ReactComponent as StepTwoIcon } from '../../assets/step-two-icon.svg';
import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import PageSection from '../../components/PageSection';
import PageTitle from '../../components/PageTitle';
import ROUTES_CONFIG from '../../router/RouteConfig';
import Wrapper from '../../components/Wrapper';
import { basicHumanValuesUrl } from '../../shareSettings';
import { useUserB } from '../../hooks/useUserB';
import { CmButton, CmTypography } from 'shared/components';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
    },
    typography: {
      textAlign: 'center',
    },
    upper: {
      textTransform: 'uppercase',
      letterSpacing: '1pt',
      fontSize: '10px',
      fontWeight: 500,
    },
  })
);

function UserBHowCMWorksPage() {
  const classes = useStyles();
  // TODO: will be used later
  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = useUserB();

  useEffect(() => {
    console.log('HowCMWorks...', conversationId);
    //TODO: we need to pass conversationId to questionnarie to distinguish userB journey from userA's
  }, [conversationId]);

  const handleUserBTakesQuiz = () => {
    navigate(`${ROUTES_CONFIG.QUIZ_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  const handleNoThanks = () => {
    navigate(`${ROUTES_CONFIG.USERB_NO_CONSENT_PAGE}/${conversationId}`, {
      ...location.state,
      prevLocation: `${ROUTES_CONFIG.USERB_HOW_CM_WORKS_PAGE}`,
    });
  };

  const handleNavAway = (url: string) => {
    window.open(url);
  };

  return (
    <main>
      <Grid
        container
        className={classes.root}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        {/* --- */}

        <Wrapper bgColor="rgba(138, 213, 204, 0.6)">
          <PageSection>
            <PageTitle>How does Climate Mind work?</PageTitle>

            <Box textAlign="center">
              <CmTypography variant="h3" style={{ margin: 0 }}>Step 1</CmTypography>
              <CmTypography variant="h3" style={{ margin: 0 }}>Take a quiz</CmTypography>
            </Box>
            <Box textAlign="center" pt={2} pb={1}>
              <StepOneIcon data-testid="step-one-icon" />
            </Box>
            <Box textAlign="center" pb={4}>
              <CmTypography variant="body">
                Discover your core values and see which values make you tick.
              </CmTypography>
            </Box>

            <Box textAlign="center" pt={4}>
              <CmTypography variant="h3" style={{ margin: 0 }}>Step 2</CmTypography>
              <CmTypography variant="h3" style={{ margin: 0 }}>See how you and your friends align</CmTypography>
            </Box>
            <Box textAlign="center" pt={2} pb={1}>
              <StepTwoIcon data-testid="step-two-icon" />
            </Box>
            <Box textAlign="center" pb={4}>
              <CmTypography variant="body">
                Understand how your shared values can help frame conversations
                and climate change action.
              </CmTypography>
            </Box>

            <Box textAlign="center" pt={4}>
              <CmTypography variant="h3" style={{ margin: 0 }}>Step 3</CmTypography>
              <CmTypography variant="h3" style={{ margin: 0 }}>Connect, learn, and act on common interests together</CmTypography>
            </Box>
            <Box textAlign="center" pt={2} pb={1}>
              <StepThreeIcon data-testid="step-three-icon" />
            </Box>
            <Box textAlign="center" pb={4}>
              <CmTypography variant="body">
                Share climate conversation topics and solutions that align with
                you and your friend’s shared values to make collective action
                easier and more comfortable.
              </CmTypography>
            </Box>

            <Box textAlign="center" pt={2} pb={1}>
              <StepFourIcon data-testid="step-four-icon" />
            </Box>
            <Box textAlign="center" mb={-3}>
              <CmTypography variant="body">
                Create an account, invite others, and track your progress.
              </CmTypography>
            </Box>
          </PageSection>
        </Wrapper>

        {/* --- */}
        <Wrapper bgColor={'white'}>
          <PageSection>
            <Box textAlign="center">
              <ArrowDownPurple data-testid="arrow-down-purple-logo" />
            </Box>

            <Box textAlign="center" pt={2}>
              <CmTypography variant='overline'>Further reading</CmTypography>
            </Box>

            <PageTitle>What is the core values quiz?</PageTitle>

            <Box textAlign="center" pb={4}>
              <CmTypography variant="body">
                A 10 question multiple choice quiz to discover which guiding
                life principles are most important to you.
              </CmTypography>
            </Box>
            <Box textAlign="center" pb={4}>
              <CmTypography variant="body">
                These guiding life principles are your core values and each
                value holds a varying degree of importance for you.
              </CmTypography>
            </Box>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 100 }}>
              <CmButton
                text='Learn More'
                startIcon={<OpenInNew fontSize="small" />}
                onClick={() => handleNavAway(basicHumanValuesUrl)}
              />
            </div>

            <FooterAppBar bgColor={COLORS.ACCENT10}>
              <CmButton
                text='No Thanks'
                onClick={handleNoThanks}
                style={{ backgroundColor: 'transparent', borderColor: 'black' }}
              />

              <CmButton
                text='Take the Quiz'
                onClick={handleUserBTakesQuiz}
              />
            </FooterAppBar>
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
}

export default UserBHowCMWorksPage;
