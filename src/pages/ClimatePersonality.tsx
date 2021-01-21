import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import ExpandableCard from '../components/ExpandableCard';
import PageWrapper from '../components/PageWrapper';
import ROUTES from '../components/Router/RouteConfig';
import Button from '../components/Button';

const useStyles = makeStyles(() =>
  createStyles({
    typography: {
      textAlign: 'center',
    },
    button: {
      margin: '1em 0',
    },
    cardContent: {
      fontFamily: 'Bilo',
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: '1.4',
    },
    spacing: {
      marginTop: '-20px',
      marginBottom: '20px',
    },
  })
);

const ClimatePersonality: React.FC<{}> = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <PageWrapper bgColor="#EFE282">
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={8}
        spacing={1}
        container
        direction="row"
        alignItems="center"
      >
        <Grid item xs={3}>
          <Logo width="75" height="75" data-testid="climate-mind-logo" />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h5">Let's find out your core values!</Typography>
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
        <Box pr={5} pl={5}>
          <Typography className={classes.typography}>
            Read each statement and decide how much you are like or not like
            that.
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Box>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => history.push(ROUTES.ROUTE_QUIZ)}
          >
            Take the quiz
          </Button>
        </Box>
      </Grid>
    </PageWrapper>
  );
};

export default ClimatePersonality;
