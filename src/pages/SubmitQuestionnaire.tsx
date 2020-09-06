import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Grid, makeStyles, Box } from '@material-ui/core';
import { ReactComponent as RewardsIcon } from '../assets/reward-personalities.svg';
import ROUTES from '../components/Router/RouteConfig';

// To do - consolidate styles
// To do - unit test navigation

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

  // To do handle button click

  return (
    <Grid
      container
      className={classes.root}
      data-testid="MeetGuy"
      justify="space-around"
    >
      <Grid item sm={false} lg={4}>
        {/* left gutter */}
      </Grid>

      <Grid item sm={12} lg={4}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Box mt={2} mb={4}>
              <Typography variant="h4">Woohoo! Good Job!</Typography>
            </Box>
          </Grid>

          <Grid item sm={12} lg={4}>
            <Box mt={2} mb={3} mx={2} textAlign="center">
              <Typography variant="h6">
                With the questions you just answered I can predict your Climate
                Personality.
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} lg={4}>
            <Box mt={2} mb={3} mx={2} textAlign="center">
              <Typography variant="body1">
                This is a ranking of the top three personal values that you
                deploy when making decisions.
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box mt={4} mb={8}>
              <RewardsIcon />
            </Box>
          </Grid>
          <Grid item>
            <Box mt={4} mb={8}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disableElevation
                onClick={() => history.push(ROUTES.ROUTE_HOME)}
              >
                Find out my Climate Personality
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid item sm={false} lg={4}>
        {/* right gutter */}
      </Grid>
    </Grid>
  );
};

export default SubmitQuestionnaire;
