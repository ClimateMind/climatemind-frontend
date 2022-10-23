import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import OpenInNew from '@material-ui/icons/OpenInNew';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as ArrowDownPurple } from '../../assets/icon-arrow-down-purple.svg';
import { ReactComponent as StepFourIcon } from '../../assets/step-four-icon.svg';
import { ReactComponent as StepOneIcon } from '../../assets/step-one-icon.svg';
import { ReactComponent as StepThreeIcon } from '../../assets/step-three-icon.svg';
import { ReactComponent as StepTwoIcon } from '../../assets/step-two-icon.svg';
import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import PageSection from '../../components/PageSection';
import PageTitle from '../../components/PageTitle';
import ROUTES_CONFIG from '../../components/Router/RouteConfig';
import Wrapper from '../../components/Wrapper';
import { basicHumanValuesUrl } from '../../shareSettings';
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';
import { useUserB } from '../../hooks/useUserB';

type TState = {
  from: string;
  id: string;
  userAName: string;
};

const useStyles = makeStyles((theme: Theme) =>
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

const HowCMWorks: React.FC = () => {
  const classes = useStyles();
  // TODO: will be used later
  const { push } = useHistory();
  const location = useLocation<TState>();
  const { conversationId } = useUserB();

  useEffect(() => {
    console.log('HowCMWorks...', conversationId);
    //TODO: we need to pass conversationId to questionnarie to distinguish userB journey from userA's
  }, [conversationId]);

  const handleUserBTakesQuiz = () => {
    push({
      pathname: `${ROUTES_CONFIG.ROUTE_QUIZ}/${conversationId}`,
      state: { from: location.pathname, id: conversationId },
    });
  };

  const handleNoThanks = () => {
    push(`${ROUTES_CONFIG.USERB_NO_CONSENT}/${conversationId}`, {
      ...location.state,
      prevLocation: `${ROUTES_CONFIG.ROUTE_HOW_CM_WORKS}`,
    });
  };

  const handleNavAway = (url: string) => {
    window.open(url);
  };

  return (
    <main>
      <ScrollToTopOnMount />
      <Grid
        container
        className={classes.root}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        {/* --- */}

        <Wrapper bgColor={COLORS.SECTION1}>
          <PageSection>
            <PageTitle>How does Climate Mind work?</PageTitle>

            <Box textAlign="center">
              <Typography variant="subtitle2">Step 1</Typography>
              <Typography variant="subtitle2">Take a quiz</Typography>
            </Box>
            <Box textAlign="center" pt={2} pb={1}>
              <StepOneIcon data-testid="step-one-icon" />
            </Box>
            <Box textAlign="center" pb={4}>
              <Typography variant="body2">
                Discover your core values and see which values make you tick.
              </Typography>
            </Box>

            <Box textAlign="center" pt={4}>
              <Typography variant="subtitle2">Step 2</Typography>
              <Typography variant="subtitle2">
                See how you and your friends align
              </Typography>
            </Box>
            <Box textAlign="center" pt={2} pb={1}>
              <StepTwoIcon data-testid="step-two-icon" />
            </Box>
            <Box textAlign="center" pb={4}>
              <Typography variant="body2">
                Understand how your shared values can help frame conversations
                and climate change action.
              </Typography>
            </Box>

            <Box textAlign="center" pt={4}>
              <Typography variant="subtitle2">Step 3</Typography>
              <Typography variant="subtitle2">
                Connect, learn, and act on common interests together
              </Typography>
            </Box>
            <Box textAlign="center" pt={2} pb={1}>
              <StepThreeIcon data-testid="step-three-icon" />
            </Box>
            <Box textAlign="center" pb={4}>
              <Typography variant="body2">
                Share climate conversation topics and solutions that align with
                you and your friend’s shared values to make collective action
                easier and more comfortable.
              </Typography>
            </Box>

            <Box textAlign="center" pt={2} pb={1}>
              <StepFourIcon data-testid="step-four-icon" />
            </Box>
            <Box textAlign="center" mb={-3}>
              <Typography variant="body2">
                Create an account, invite others, and track your progress.
              </Typography>
            </Box>
          </PageSection>
        </Wrapper>

        {/* --- */}
        <Wrapper bgColor={COLORS.SECTION2}>
          <PageSection>
            <Box textAlign="center">
              <ArrowDownPurple data-testid="arrow-down-purple-logo" />
            </Box>

            <Box textAlign="center" pt={2}>
              <Typography className={classes.upper}>Further reading</Typography>
            </Box>

            <PageTitle>What is the core values quiz?</PageTitle>

            <Box textAlign="center" pb={4}>
              <Typography variant="body2">
                A 10 question multiple choice quiz to discover which guiding
                life principles are most important to you.
              </Typography>
            </Box>
            <Box textAlign="center" pb={4}>
              <Typography variant="body2">
                These guiding life principles are your core values and each
                value holds a varying degree of importance for you.
              </Typography>
            </Box>

            <Box textAlign="center" pb={3}>
              <Button
                style={{ border: '1px solid #a347ff' }}
                variant="contained"
                color="primary"
                disableElevation
                endIcon={<OpenInNew fontSize="small" />}
                data-testid="learn-more-button"
                onClick={() => handleNavAway(basicHumanValuesUrl)}
              >
                Learn More
              </Button>
            </Box>

            <FooterAppBar bgColor={COLORS.ACCENT10}>
              <Button
                style={{ border: '1px solid #07373B', marginRight: '8px' }}
                onClick={handleNoThanks}
              >
                No Thanks
              </Button>

              <Button
                variant="contained"
                data-testid="take-quiz-userb-button"
                color="primary"
                disableElevation
                style={{ border: '1px solid #a347ff', marginLeft: '8px' }}
                onClick={handleUserBTakesQuiz}
              >
                Take the Quiz
              </Button>
            </FooterAppBar>
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
};

export default HowCMWorks;
