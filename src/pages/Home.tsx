import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import Button from '../components/Button';
import PageSection from '../components/PageContent';
import ROUTES from '../components/Router/RouteConfig';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Wrapper from '../components/Wrapper';
import PageTitle from '../components/PageTitle';

const styles = makeStyles(() => {
  return {
    root: {
      minHeight: '100vh',
    },
    typography: {
      textAlign: 'center',
    },
    bottomText: {
      color: '#ffffff',
    },
    logo: {
      margin: '2vh 0 0',
    },
  };
});

const Home: React.FC<{}> = () => {
  const classes = styles();
  const history = useHistory();

  return (
    <Grid container className={classes.root}>
      <ScrollToTopOnMount />
      <Wrapper bgColor="#82EFC5" justify="center">
        <PageSection>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <PageTitle variant="h1" align="center">
                Powering climate conversations
              </PageTitle>
            </Grid>

            <Grid item className={classes.logo}>
              <Box mb={4}>
                <Logo data-testid="climate-mind-logo" />
              </Box>
            </Grid>

            <Grid item>
              <Box ml={1} mr={1} mb={1}>
                <Typography align="center">
                  I'll help you uncover your personal values to understand what
                  you care about most. Then we'll explore how climate change is
                  affecting your core values and the attractive solutions
                  available to address it.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </PageSection>
      </Wrapper>

      <Wrapper bgColor="#07373B" justify="center">
        <PageSection>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Box mb={3}>
                <Typography
                  variant="h4"
                  align="center"
                  className={classes.bottomText}
                >
                  What is Climate Mind?
                </Typography>
              </Box>
            </Grid>

            <Grid item>
              <Box ml={1} mr={1} mb={3}>
                <Typography align="center" className={classes.bottomText}>
                  Climate Mind is a web app that helps you explore how your
                  values and personal interests are affected by climate change.
                </Typography>
              </Box>
            </Grid>

            <Grid item>
              <Box ml={1} mr={1} mb={3}>
                <Typography align="center" className={classes.bottomText}>
                  We hope to inspire you to take action with a range of
                  attractive solutions consistent with your values that you can
                  get excited about.
                </Typography>
              </Box>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => history.push(ROUTES.ROUTE_PERSONALITY)}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item>
              <Box my={2}>
                <Button
                  color="primary"
                  disableElevation
                  onClick={() => history.push(ROUTES.ROUTE_LOGIN)}
                >
                  Already a member? Login here
                </Button>
              </Box>
            </Grid>
          </Grid>
        </PageSection>
      </Wrapper>
    </Grid>
  );
};

export default Home;
