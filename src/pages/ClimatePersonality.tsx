import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactComponent as LogoLight } from '../assets/cm-logo-light.svg';
import { ReactComponent as Arrow } from '../assets/icon-arrow-down2.svg';
import Wrapper from '../components/Wrapper';
import ROUTES from '../components/Router/RouteConfig';
import Button from '../components/Button';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { useSessionRedirect } from '../hooks/useSessionRedirect';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
    },
    typography: {
      textAlign: 'center',
    },
    bottomText: {
      color: '#ffffff',
    },
    pageHeader: {
      marginTop: '1.3em',
    },
    logo: {
      paddingRight: '0.5em',
    },
  })
);

const ClimatePersonality: React.FC<{}> = () => {
  const classes = useStyles();
  const history = useHistory();
  useSessionRedirect(); //Redirect to feed if the user has already done the quiz;

  return (
    <Grid container className={classes.root}>
      <ScrollToTopOnMount />
      <Wrapper bgColor="#39F5AD" justify="center">
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
            <Box mb={2} mt={5} alignItems="center">
              <Typography
                variant="h4"
                align="center"
                // alignItems="center"
                className={classes.typography}
              >
                First, what are your core values?
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box ml={1} mr={1} mb={4}>
              <Typography align="center" className={classes.typography}>
                The Theory of Basic Human Values recognizes ten universal values. Respond to 10 statements based on these to find out your core values. Then view your results, learn how climate change affects you now and explore exciting solutions.
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box ml={1} mr={1} mb={1}>
              <Typography 
                align="center" 
                variant="subtitle2"
                className={classes.typography}
              >
                Read each statement and decide how much you are like or not like that. Don’t worry! There’s no right or wrong answers!
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => history.push(ROUTES.ROUTE_QUIZ)}
            >
              Take the quiz
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
            <Box ml={1} mr={1} mb={5} mt={2}>
              <Typography 
                align="center"
                variant="subtitle2" 
                className={`${classes.typography} ${classes.bottomText}`}
              >
                We make personalized understanding of climate change easier.
              </Typography>
            </Box>
          </Grid>

          <Grid item className={classes.logo}>
            <Box mb={6}>
              <LogoLight data-testid="climate-mind-logo" />
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

export default ClimatePersonality;
