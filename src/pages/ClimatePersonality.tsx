import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import PageWrapper from '../components/PageWrapper';
import ROUTES from '../components/Router/RouteConfig';
import Button from '../components/Button';

const useStyles = makeStyles(() =>
  createStyles({
    typography: {
      textAlign: 'center',
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

  return (
    <PageWrapper bgColor="#EFE282">
      <Grid item container direction="row" alignItems="center">
        <Grid item container className={classes.pageHeader}>
          <Grid item xs={4} className={classes.logo}>
            <Logo width="75" height="75" data-testid="climate-mind-logo" />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5">
              Let's find out your core values!
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Box ml={1} mr={1} mb={1}>
          <Typography
            variant="h6"
            align="center"
            className={classes.typography}
          >
            By answering 10 research-backed questions, I can show you your top
            values. Then we'll look at how climate change is personally
            affecting you and the values most important to you.
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Box px={5} mt={3} mb={1}>
          <Typography className={classes.typography}>
            Read each statement and decide how much you are like or not like
            that.
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
    </PageWrapper>
  );
};

export default ClimatePersonality;
