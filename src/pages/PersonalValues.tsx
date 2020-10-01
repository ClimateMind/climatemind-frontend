import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Grid, makeStyles, Box } from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import ROUTES from '../components/Router/RouteConfig';

import CMCard from '../components/CMCard';
import { useClimatePersonality } from '../hooks/useClimatePersonality';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#B8F4FC',
    minHeight: '100vh',
  },
  typography: {
    textAlign: 'center',
  },
});

const PersonalValues: React.FC = () => {
  const classes = styles();
  const history = useHistory();
  const climatePersonality = useClimatePersonality();

  //TODO: fix loading spinner and maybe condition for showing it...
  if (Object.keys(climatePersonality).length < 1) {
    return <p>loading...</p>;
  }
  return (
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
          {climatePersonality.map((value, i) => (
            <CMCard
              key={`value-${i}`}
              index={i}
              title={value.valueName}
              bodyText={value.valueDesc}
            />
          ))}
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
              onClick={() => history.push(ROUTES.ROUTE_VALUES)}
            >
              Yes I’m ready!
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid item sm={false} lg={4}>
        {/* right gutter */}
      </Grid>
    </Grid>
  );
};

export default PersonalValues;
