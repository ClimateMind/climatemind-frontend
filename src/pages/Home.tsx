import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Box, Typography, makeStyles } from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/cm-logo-home.svg';
import ROUTES from '../components/Router/RouteConfig';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

const styles = makeStyles((theme) => {
  return {
    root: {},
    typography: {
      wordSpacing: '100vw',
    },
    logo: {
      margin: '22vh 0 0',
    },
  };
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

      <ScrollToTopOnMount />

      <Grid item>
        <Box>
          <Typography
            variant="h4"
            align="center"
            className={classes.typography}
          >
            Catalyzing Climate Action
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
