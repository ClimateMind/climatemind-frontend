import React from 'react';
import { useQuery } from 'react-query';
import { getSolutions } from '../api/getSolutions';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import { COLORS } from '../common/styles/CMTheme';
import { Typography, Grid, makeStyles, Box } from '@material-ui/core';
import Loader from '../components/Loader';
import Error500 from './Error500';
import ExpandableCard from '../components/ExpandableCard';
import MythCard from '../components/MythCard';
import Wrapper from '../components/Wrapper';
import BottomMenu from '../components/BottomMenu';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    paddingBottom: 16,
  },
  callToActionSection: {
    minHeight: '100vh',
  },
  typography: {
    textAlign: 'center',
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
  },
});

const SolutionsFeed: React.FC = () => {
  const classes = styles();

  const { data, status } = useQuery('solutions', getSolutions);

  if (status === 'loading') {
    return (
      <Wrapper bgColor={COLORS.ACCENT2}>
        <Loader />
      </Wrapper>
    );
  }

  if (data) {
    const { solutions } = data;

    return (
      <Grid
        container
        className={classes.root}
        data-testid="Myths Feed"
        justify="space-around"
      >
        <Wrapper bgColor={COLORS.ACCENT2}>
          <Grid item sm={false} lg={4}>
            {/* left gutter */}
          </Grid>

          <Grid
            item
            sm={12}
            lg={4}
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Box mt={2} mb={4} mx={2}>
                <Grid container direction="row" alignItems="center" spacing={5}>
                  <Grid item xs={3}>
                    <Logo width="76" data-testid="climate-mind-logo" />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h4">
                      Ready to take action?
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item>
              <ExpandableCard title="About climate solutions">
                <Typography className={`${classes.cardContent} ${classes.spacing}`}>
                  About climate solutions...
                </Typography>
                <Typography className={classes.cardContent}>
                  These values can be linked to climate concepts and Climate Mind
                  works by giving you a personal view of how climate change is
                  affecting you now.
                </Typography>
              </ExpandableCard>
            </Grid>

            <Grid item>
              <ExpandableCard title="About climate solutions">
                <Typography className={`${classes.cardContent} ${classes.spacing}`}>
                  About climate solutions...
                </Typography>
                <Typography className={classes.cardContent}>
                  These values can be linked to climate concepts and Climate Mind
                  works by giving you a personal view of how climate change is
                  affecting you now.
                </Typography>
              </ExpandableCard>
            </Grid>
            <Grid item>
              <ExpandableCard title="About climate solutions">
                <Typography className={`${classes.cardContent} ${classes.spacing}`}>
                  About climate solutions...
                </Typography>
                <Typography className={classes.cardContent}>
                  These values can be linked to climate concepts and Climate Mind
                  works by giving you a personal view of how climate change is
                  affecting you now.
                </Typography>
              </ExpandableCard>
            </Grid>
            <Grid item>
              <ExpandableCard title="About climate solutions">
                <Typography className={`${classes.cardContent} ${classes.spacing}`}>
                  About climate solutions...
                </Typography>
                <Typography className={classes.cardContent}>
                  These values can be linked to climate concepts and Climate Mind
                  works by giving you a personal view of how climate change is
                  affecting you now.
                </Typography>
              </ExpandableCard>
            </Grid>

            {/* <Grid item sm={12} lg={12} container>
              {myths.map((myth, i) => (
                <MythCard myth={myth} key={i} />
              ))}
            </Grid>*/}
          </Grid> 

          <Grid item sm={false} lg={4}>
            {/* right gutter */}
          </Grid>
        </Wrapper>
        <BottomMenu />
      </Grid>
    );
  }
  // All else fails return an error
  return <Error500 />;
};

export default SolutionsFeed;
