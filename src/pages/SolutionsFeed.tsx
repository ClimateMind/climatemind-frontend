import React from 'react';
import { useQuery } from 'react-query';
import { getSolutions } from '../api/getSolutions';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import { COLORS } from '../common/styles/CMTheme';
import { Typography, Grid, makeStyles, Box } from '@material-ui/core';
import Loader from '../components/Loader';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import Error500 from './Error500';
import PageWrapper from '../components/PageWrapper';
import Wrapper from '../components/Wrapper';
import BottomMenu from '../components/BottomMenu';
import SolutionOverlay from '../components/SolutionOverlay';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    paddingBottom: 16,
  },
  feedContainer: {
    padding: 0,
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
    return (
      <PageWrapper bgColor={COLORS.ACCENT2} scroll={true}>

      {data?.solutions && (
        <Grid
          container
          className={classes.root}
          data-testid="ClimateFeed"
          justify="space-around"
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

          <Grid item sm={12} lg={12} className={classes.feedContainer}>
            {data.solutions.map((solution, i) => {
              return (
                <Card
                  header={<CardHeader title={solution.solutionTitle} preTitle={`${solution.solutionType} solution`}/>}
                  key={`value-${i}`}
                  index={i}
                  imageUrl={solution.imageUrl}
                  footer={<SolutionOverlay solution={solution} />}
                >
                  <Typography variant="body1">
                    {solution.shortDescription}
                  </Typography>
                </Card>
              );
            })}
          </Grid>

        </Grid>
      )}
      <BottomMenu />
    </PageWrapper>
    );
  }
  // All else fails return an error
  return <Error500 />;
};

export default SolutionsFeed;
