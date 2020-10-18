import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Box, Typography, Button, makeStyles } from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/cm-logo-home.svg';
import ROUTES from '../components/Router/RouteConfig';
import PageWrapper from '../components/PageWrapper';

const styles = makeStyles({
  typography: {
    wordSpacing: '100vw',
  },
  logo: {
    padding: '10vh 0 0',
  },
});

const Home: React.FC<{}> = () => {
  const classes = styles();
  const history = useHistory();

  return (
    <PageWrapper bgColor="#82EFC5">
      <Grid item className={classes.logo}>
        <Box>
          <Logo data-testid="climate-mind-logo" />
        </Box>
      </Grid>

      <Grid item>
        <Box>
          <Typography
            variant="h4"
            align="center"
            className={classes.typography}
          >
            Powering climate conversations
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => history.push(ROUTES.ROUTE_QUIZHOME)}
        >
          Get Started
        </Button>
      </Grid>
    </PageWrapper>
  );
};

export default Home;
