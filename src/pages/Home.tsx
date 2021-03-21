import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Box, Typography, makeStyles } from '@material-ui/core';
import { ReactComponent as CirclesIcon } from '../assets/circles-icon.svg';
import { ReactComponent as Arrow } from '../assets/icon-arrow-down2.svg';
import ROUTES from '../components/Router/RouteConfig';
import Wrapper from '../components/Wrapper';
import Button from '../components/Button';
import IconButton from '@material-ui/core/IconButton';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

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
    margin: {
      margin: 0,
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
        <Grid
          item
          sm={12}
          lg={4}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Box mb={2} mt={5}>
              <Typography
                variant="h4"
                align="center"
              >
                Personalize your understanding of climate change
              </Typography>
            </Box>
          </Grid>
          
          <Grid item>
            <Box mb={1}>
              <Typography
                variant="subtitle2"
                align="center"
              >
                Climate change personally affects each of us, but we often don’t know how or what to do about it.
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box ml={1} mr={1} mb={1}>
              <Typography align="center">
                Climate Mind helps you explore how your values and personal interests are being affected by climate change and shows you attractive solutions exist that you may not be aware of.
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
        </Grid>
      </Wrapper>

      <Wrapper bgColor="#07373B" justify="center">
        <Grid
          item
          sm={12}
          lg={4}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Box ml={1} mr={1} mb={1} mt={2}>
              <Typography
                variant="subtitle2"
                align="center"
                className={classes.bottomText}
              >
                We'll help connect the dots between you, a changing climate and actions you can take.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item className={classes.logo}>
            <Box mb={2}>
              <CirclesIcon data-testid="climate-mind-logo" />
            </Box>
          </Grid>

          <Grid item className={classes.logo}>
            <Box mb={2}>
              <IconButton
                onClick={() =>window.scrollTo(0, 0)} 
              >
                <Arrow data-testid="climate-mind-logo" />
              </IconButton>
            </Box>
          </Grid>

        </Grid>
      </Wrapper>
    </Grid>
  );
};

export default Home;
