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

// TODO - Replace with values from the api
//const climatePersonality = useClimatePersonality();
const climatePersonality = useClimatePersonality();

const PersonalValues: React.FC = () => {
  const classes = styles();
  const history = useHistory();

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
        <Grid
          container
          direction="column"
          justify="space-between"
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

          <Grid item sm={12} lg={4}>
            {climatePersonality.map((value, i) => (
              <CMCard
                key={`value-${i}`}
                title={value.valueName}
                bodyText={value.valueDesc}
              />
            ))}

            {/* {<CMCard />} */}
          </Grid>

          <Grid item sm={12} lg={4}>
            <Box mt={2} mb={3} mx={2} textAlign="center">
              <Typography variant="h6">
                Ready to see how you can take action against climate change?
              </Typography>
            </Box>
          </Grid>

          <Grid item>
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
      </Grid>

      <Grid item sm={false} lg={4}>
        {/* right gutter */}
      </Grid>
    </Grid>
  );
};

export default PersonalValues;
