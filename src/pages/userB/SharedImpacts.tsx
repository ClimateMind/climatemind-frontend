import {
    Box,
    Button,
    createStyles,
    Grid,
    makeStyles,
    Theme,
    Typography,
  } from '@material-ui/core';
  import React, { useEffect } from 'react';
  import { useHistory } from 'react-router-dom';
  import { ReactComponent as StepOneIcon } from '../../assets/step-one-icon.svg';
  import { ReactComponent as StepTwoIcon } from '../../assets/step-two-icon.svg';
  import { COLORS } from '../../common/styles/CMTheme';
  import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
  import PageSection from '../../components/PageSection';
  import PageTitle from '../../components/PageTitle';
  import ROUTES_CONFIG from '../../components/Router/RouteConfig';
  import Wrapper from '../../components/Wrapper';
  
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
  
  const SharedImpacts: React.FC = () => {
    const classes = useStyles();
    const { push } = useHistory();
    
    const handleUserBTakesQuiz = () => {
      push(ROUTES_CONFIG.ROUTE_QUIZ);
    };
  
    return (
      <main>
        <Grid
          container
          className={classes.root}
          data-testid="PersonalValues"
          justify="space-around"
        >
          {/* --- */}
  
          <Wrapper bgColor={COLORS.SECTION3}>
            <PageSection>
              <PageTitle>Climate impacts you and Stevie share</PageTitle>
  
              <Box textAlign="center">
                <Typography variant="subtitle2">
                  Select one impact of climate change you’d be interested in talking to Stevie about.
                </Typography>
              </Box>
              
              <Box textAlign="center" pt={4}>
                <Typography variant="h6">
                  These topics already align with your shared core values, so it’ll be easy to start having meaningful conversations.
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
  
            
  
              <FooterAppBar bgColor={COLORS.ACCENT10}>
                <Button
                  style={{ border: '1px solid #07373B', marginRight: '8px' }}
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
  
  export default SharedImpacts;
  