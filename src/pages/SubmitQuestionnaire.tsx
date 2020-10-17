import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Grid, makeStyles, Box } from '@material-ui/core';
import { ReactComponent as RewardsIcon } from '../assets/reward-personalities.svg';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import ROUTES from '../components/Router/RouteConfig';
import { submitScores } from '../api/submitScores';
import { useResponsesData } from '../hooks/useResponses';
import { useSession } from '../hooks/useSession';
import PageWrapper from '../components/PageWrapper';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#FF9439',
    minHeight: '100vh',
  },
  typography: {
    textAlign: 'center',
  },
});

const SubmitQuestionnaire: React.FC<{}> = () => {
  const classes = styles();
  const history = useHistory();
  const quizResponses = useResponsesData();
  const { setSessionId } = useSession();
  // To do handle button click

  const handleSubmit = async () => {
    // Submit my scores
    const SetOne = quizResponses.SetOne;
    const response = await submitScores(SetOne);
    // Set the Session id
    if (response && response.sessionId && setSessionId) {
      const sessionId = response.sessionId;
      setSessionId(sessionId);
    }
    // Navigate to the climate personality page
    history.push(ROUTES.ROUTE_VALUES);
  };

  return (
    <PageWrapper bgColor="#FF9439">
      <Grid
        item
        sm={12}
        lg={4}
        container
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3}>
            <Logo width="76" data-testid="climate-mind-logo" />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h4">Woohoo! Good Job!</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item sm={12} lg={4}>
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

      <Grid item sm={12} lg={4}>
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
