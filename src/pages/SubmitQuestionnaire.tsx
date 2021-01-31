import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, Box } from '@material-ui/core';
import { ReactComponent as RewardsIcon } from '../assets/reward-personalities.svg';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import Button from '../components/Button';
import ROUTES from '../components/Router/RouteConfig';
import { submitScores } from '../api/postScores';
import { useResponsesData } from '../hooks/useResponses';
import { useSession } from '../hooks/useSession';
import PageWrapper from '../components/PageWrapper';
import { useClimatePersonality } from '../hooks/useClimatePersonality';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

const SubmitQuestionnaire: React.FC<{}> = () => {
  const history = useHistory();
  const quizResponses = useResponsesData();
  const { setSessionId, zipCode, quizSessionId } = useSession();
  const { setPersonalValuesError } = useClimatePersonality();

  const handleSubmit = async () => {
    // Submit my scores
    if (quizSessionId) {
      const SetOne = quizResponses.SetOne;
      const response = await submitScores({ SetOne, zipCode }, quizSessionId);
      // Set the Session id
      if (response && response.sessionId && setSessionId) {
        const sessionId = response.sessionId;
        setSessionId(sessionId);
      } else {
        setPersonalValuesError();
        // throw new Error('Failed to submit scores');
      }
      // Navigate to the climate personality page
      history.push(ROUTES.ROUTE_VALUES);
    }
  };

  return (
    <PageWrapper bgColor="#FF9439">
      <ScrollToTopOnMount />
      <Grid item spacing={5} container direction="row" alignItems="center">
        <Grid item xs={3}>
          <Logo width="76" data-testid="climate-mind-logo" />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h4">Woohoo! Good Job!</Typography>
        </Grid>
      </Grid>

      <Grid item>
        <Box textAlign="center">
          <Typography variant="h6">
            With the questions you just answered I can predict your Climate
            Personality.
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Box>
          <RewardsIcon />
        </Box>
      </Grid>

      <Grid item>
        <Box textAlign="center">
          <Typography variant="body1">
            This is a ranking of the top three personal values that you deploy
            when making decisions.
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Box>
          <Button
            id="submitButton"
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
            onClick={handleSubmit}
          >
            Find out my Climate Personality
          </Button>
        </Box>
      </Grid>
    </PageWrapper>
  );
};

export default SubmitQuestionnaire;
