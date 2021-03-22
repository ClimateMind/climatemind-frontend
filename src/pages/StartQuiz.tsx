import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Wrapper from '../components/Wrapper';
import ROUTES from '../components/Router/RouteConfig';
import Button from '../components/Button';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { useSessionRedirect } from '../hooks/useSessionRedirect';
import PageSection from '../components/PageSection';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
    },
    typography: {
      textAlign: 'center',
    },
    topText: {
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

const StartQuiz: React.FC<{}> = () => {
  const classes = useStyles();
  const history = useHistory();
  useSessionRedirect(); //Redirect to feed if the user has already done the quiz;

  return (
    <Grid container className={classes.root}>
      <ScrollToTopOnMount />
      <Wrapper bgColor="#006080" justify="center">
        <PageSection>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Box mb={2} mt={5} alignItems="center">
              <Typography
                variant="h4"
                align="center"
                // alignItems="center"
                className={`${classes.typography} ${classes.topText}`}
              >
                We want to make constructive conversations about climate change
                easier.
              </Typography>
            </Box>
          </Grid>
        </PageSection>
      </Wrapper>

      <Wrapper bgColor="#39F5AD" justify="center">
        <PageSection>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Box mb={4}>
                <Typography
                  variant="h4"
                  align="center"
                  className={classes.typography}
                >
                  Let's find out your core values!
                </Typography>
              </Box>
            </Grid>

            <Grid item>
              <Box ml={1} mr={1} mb={4}>
                <Typography align="center" className={classes.typography}>
                  By answering 10 research-backed questions, I can show you your
                  top values. Then we'll look at how climate change is
                  personally affecting you and the values most important to you.
                </Typography>
              </Box>
            </Grid>

            <Grid item>
              <Box ml={1} mr={1} mb={3}>
                <Typography align="center" className={classes.typography}>
                  Read each statement and decide how much you are like or not
                  like that.
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
        </PageSection>
      </Wrapper>
    </Grid>
  );
};

export default StartQuiz;
