import React from 'react';
import { Grid, makeStyles, Toolbar } from '@material-ui/core';
import Loader from '../components/Loader';
import CMCard from '../components/CMCard';
import CMCardOverlay from '../components/CMCardOverlay'; 

import { useClimateFeed } from '../hooks/useClimateFeed';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#70D7CC',
    minHeight: '100vh',
  },
  typography: {
    textAlign: 'center',
  },
});

const ClimateFeed: React.FC = () => {
  const classes = styles();
  const climateFeed = useClimateFeed();

  if (!climateFeed || !climateFeed.length) {
    return <Loader />;
  }
  return (
    <>
      {/* Toolbar required to prevent content disap behind the app bar*/}
      <Toolbar variant="dense" />
      <Grid
        container
        className={classes.root}
        data-testid="ClimateFeed"
        justify="space-around"
      >
        <Grid item sm={12} lg={12} container>
          {climateFeed.map((effect, i) => (
            <CMCard
              key={`value-${i}`}
              index={i}
              title={effect.effectTitle}
              shortDescription={effect.effectDescription}
              numberedCards={false}
              imageUrl={effect.imageUrl}
              footer={<CMCardOverlay title={effect.effectTitle} imageUrl={effect.imageUrl} shortDescription={effect.effectDescription}/>} 
            />
          ))}
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
          <Grid item sm={12} lg={12} container>
            {climateFeed.map((effect, i) => (
              <CMCard
                key={`value-${i}`}
                index={i}
                title={effect.effectTitle}
                shortDescription={effect.effectDescription}
                numberedCards={false}
                imageUrl={effect.imageUrl}
              />
            ))}
          </Grid>
        </Grid>

        <Grid item sm={false} lg={4}>
          {/* right gutter */}
        </Grid>
      </Grid>
    </>
  );
};

export default ClimateFeed;
