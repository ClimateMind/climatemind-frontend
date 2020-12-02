import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Loader from '../components/Loader';
import CMCard from '../components/CMCard';
import PageWrapper from '../components/PageWrapper';
import CMCardOverlay from '../components/CMCardOverlay';

import { useClimateFeed } from '../hooks/useClimateFeed';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#70D7CC',
    minHeight: '100vh',
    padding: 0,
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
  const climateFeed = useClimateFeed();

  if (!climateFeed || !climateFeed.length) {
    return <Loader />;
  }
  return (
    <PageWrapper bgColor="#70D7CC" scroll={true}>
      <Grid
        container
        className={classes.root}
        data-testid="ClimateFeed"
        justify="space-around"
      >
        <Grid item sm={12} lg={12} container className={classes.feedContainer}>
          {climateFeed.map((effect, i) => (
            <CMCard
              key={`value-${i}`}
              index={i}
              title={effect.effectTitle}
              shortDescription={effect.effectShortDescription}
              numberedCards={false}
              imageUrl={effect.imageUrl}
              actionHeadline={effect.actionHeadline}
              footer={
                <CMCardOverlay
                  title={effect.effectTitle}
                  imageUrl={effect.imageUrl}
                  shortDescription={effect.effectShortDescription}
                  description={effect.effectDescription}
                />
              }
            />
          ))}
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default ClimateFeed;
