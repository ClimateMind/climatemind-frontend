import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Button,
  Grid,
  makeStyles,
  Box,
  Toolbar,
} from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import Loader from '../components/Loader';
import ROUTES from '../components/Router/RouteConfig';
import { useSession } from '../hooks/useSession';
import { useResponses } from '../hooks/useResponses';

import CMCard from '../components/CMCard';
import EmptyState from '../components/EmptyState';
import { useClimatePersonality } from '../hooks/useClimatePersonality';
import { ReactComponent as ArrowDown } from '../assets/icon-arrow-down.svg';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#B8F4FC',
    minHeight: '100vh',
  },
  section: {
    backgroundColor: '#FAFF7E',
    minHeight: '100vh',
  },
  typography: {
    textAlign: 'center',
  },
});

const PersonalValues: React.FC = () => {
  const classes = styles();
  const { push } = useHistory();
  const {
    climatePersonality,
    clearPersonality,
    personalValuesError,
    personalValuesLoading,
  } = useClimatePersonality();

  const { clearSession } = useSession();
  const { dispatch } = useResponses();

  const handleRetakeQuiz = () => {
    console.log('Retaking the quiz');

    // Clear the session id
    clearSession();
    // Clear the questionnaire responses
    dispatch({ type: 'CLEAR_RESPONSES' });
    //Clear personalValues
    clearPersonality();
    // Redirect back to Questionaire Start
    push(ROUTES.ROUTE_QUIZ);
  };

  if (personalValuesLoading) {
    return <Loader />;
  }
  if (personalValuesError) {
    return <EmptyState message="Error: Unable to load personal values" />;
  }
  return (
    <>
      <Toolbar variant="dense" />
      <Grid
        container
        className={classes.root}
        data-testid="PersonalValues"
        justify="space-around"
      >
        <Grid item sm={false} lg={4}>
          {/* left gutter */}
        </Grid>

        <Grid
          item
          sm={12}
          lg={4}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Box mt={2} mb={4} mx={2}>
              <Grid container direction="row" alignItems="center" spacing={3}>
                <Grid item xs={3}>
                  <Logo width="76" data-testid="climate-mind-logo" />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h4">
                    This is your Climate Personality
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item sm={12} lg={12} container>
            {climatePersonality.personalValues &&
              climatePersonality.personalValues.map((value, i) => (
                <CMCard
                  key={`value-${i}`}
                  index={i}
                  title={value.name}
                  shortDescription={value.shortDescription}
                  description={value.description}
                  imageUrl={
                    process.env.PUBLIC_URL + `personality/${value.id}.gif`
                  }
                />
              ))}
          </Grid>

          <Grid item sm={12} lg={6} container justify="center">
            <Box mt={6} mb={4} mx={2} textAlign="center">
              <Typography variant="h6">
                Climate Personality not quite right?
              </Typography>
              <Box mt={4}>
                <Button onClick={handleRetakeQuiz} variant="text">
                  Retake the Quiz
                </Button>
              </Box>
            </Box>
            <Box mt={5} mb={3}>
              <ArrowDown />
            </Box>
          </Grid>
        </Grid>

        <Grid item sm={false} lg={4}>
          {/* right gutter */}
        </Grid>

        <Grid item sm={false} lg={4} className={classes.section}>
          {/* left gutter */}
        </Grid>
        <Grid
          item
          sm={12}
          lg={4}
          container
          className={classes.section}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Box mt={2} mb={4} mx={2}>
              <Grid container direction="row" alignItems="center" spacing={3}>
                <Grid item xs={3}>
                  <Logo width="76" data-testid="climate-mind-logo" />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h4">
                    OK, [NAME] (Temporary Text?)
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item sm={12} lg={6}>
            <Box mt={2} mb={3} mx={2} textAlign="center">
              <Typography variant="h6">
                Ready to see how you can take action against climate change?
              </Typography>
            </Box>
          </Grid>

          <Grid item container justify="center">
            <Box mt={4} mb={8}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disableElevation
                onClick={() => push(ROUTES.ROUTE_FEED)}
              >
                Yes I’m ready!
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid item sm={false} lg={4} className={classes.section}>
          {/* right gutter */}
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalValues;
