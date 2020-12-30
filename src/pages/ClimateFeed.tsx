import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { COLORS } from '../common/styles/CMTheme';
import Loader from '../components/Loader';
import Card from '../components/Card';
import Error500 from '../pages/Error500';
import PageWrapper from '../components/PageWrapper';
import CardHeader from '../components/CardHeader';
import CardOverlay from '../components/CardOverlay';
import { useClimateFeed } from '../hooks/useClimateFeed';
import BottomMenu from '../components/BottomMenu';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#70D7CC',
    minHeight: '100vh',
    padding: 0,
    maxWidth: 527,
    paddingBottom: 56,
  },
  feedContainer: {
    padding: 0,
  },
  typography: {
    textAlign: 'center',
  },
});

const ClimateFeed: React.FC = () => {
  const classes = useStyles();

  const { data, isLoading, error } = useClimateFeed();

  if (error) {
    return <Error500 />;
  }

  return (
    <PageWrapper bgColor="#70D7CC" scroll={true}>
      {isLoading && <Loader />}

      {data?.climateEffects && (
        <Grid
          container
          className={classes.root}
          data-testid="ClimateFeed"
          justify="space-around"
        >
          <Grid item sm={12} lg={12} className={classes.feedContainer}>
            {data.climateEffects.map((effect, i) => {
              const preview = effect.effectSolutions[0];
              return (
                <Card
                  header={<CardHeader title={effect.effectTitle} />}
                  key={`value-${i}`}
                  index={i}
                  imageUrl={effect.imageUrl}
                  footer={
                    <CardOverlay
                      cardHeader={<CardHeader title={effect.effectTitle} />}
                      title={effect.effectTitle}
                      imageUrl={effect.imageUrl}
                      shortDescription={effect.effectShortDescription}
                      description={effect.effectDescription}
                      actionNodes={effect.effectSolutions}
                    />
                  }
                  preview={
                    <CardHeader
                      title={preview.solutionTitle}
                      preTitle={`${preview.solutionType} Action`}
                      bgColor={COLORS.ACCENT2}
                      index={i}
                      cardIcon={preview.solutionType}
                    />
                  }
                >
                  <Typography variant="body1">
                    {effect.effectShortDescription}
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
};

export default ClimateFeed;
