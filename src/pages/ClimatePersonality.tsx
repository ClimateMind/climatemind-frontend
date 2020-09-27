import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Grid, Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import ExpandableCard from '../components/ExpandableCard';
import ROUTES from '../components/Router/RouteConfig';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: '#EFE282',
      minHeight: '100vh',
    },
    typography: {
      textAlign: 'center',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      fontFamily: 'Bilo',
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: '22pt',
    },
    spacing: {
      marginTop: '-20px',
      marginBottom: '20px',
    }
  }),
);

const ClimatePersonality: React.FC<{}> = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid container className={classes.root} data-testid="ClimatePersonality">
      <Grid item sm={false} lg={4}>
        {/* left gutter */}
      </Grid>

      <Grid item sm={12} lg={4}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Box mt={2} mb={4} mx={2}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={3}>
                  <Logo width="76" data-testid="climate-mind-logo" />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h4">Good to meet you [Name]!</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <Box ml={2} mr={2} mb={1}>
              <Typography
                variant="h6"
                align="center"
                className={classes.typography}
              >
                Lets find out your climate personality
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <ExpandableCard title="What's a Climate Personality?">
              <Typography className={`${classes.cardContent} ${classes.spacing}`}>
                To make decisions we each employ three personal values.
              </Typography>
              <Typography className={classes.cardContent}>
                These values can be linked to climate concepts and Climate Mind works by giving 
                you a personal view of how climate change is affecting you now.
              </Typography>
            </ExpandableCard>
          </Grid>

          <Grid item>
            <Box pr={2} pl={2}>
              <Typography className={classes.typography}>
                Read each statement and decide how much you are like or not like that.
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box mt={4} mb={8}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => history.push(ROUTES.ROUTE_QUIZ)}
              >
                Take the quiz
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

export default ClimatePersonality;
