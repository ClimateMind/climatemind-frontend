import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Box, Typography, Button, makeStyles } from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/cm-logo-home.svg';
import ROUTES from '../components/Router/RouteConfig';

const styles = makeStyles({
  root: {
    backgroundColor: '#82EFC5',
    minHeight: '100vh',
  },
  typography: {
    wordSpacing: '100vw',
  },
});

const Home: React.FC<{}> = () => {
  const classes = styles();
  const history = useHistory();

  return (
    <Grid
      container
      data-testid="Home"
      direction="column"
      alignItems="center"
      alignContent="center"
      className={classes.root}
    >
      <Grid item>
        <Box mt={25} mb={3}>
          <Logo data-testid="climate-mind-logo" />
        </Box>
      </Grid>

      <Grid item>
        <Box mt={22}>
          <Typography
            variant="h4"
            align="center"
            className={classes.typography}
          >
            Powering climate conversations
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box mt={6} mb={6}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => history.push(ROUTES.ROUTE_QUIZHOME)}
          >
            Get Started
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
