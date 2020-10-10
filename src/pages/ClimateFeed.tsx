import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Loader from '../components/Loader';
import CMCard from '../components/CMCard';
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


  if (Object.keys(climateFeed).length < 1) {
    return <Loader />;
  }
  return (
    <Grid
      container
      className={classes.root}
      data-testid="PersonalValues"
      justify="space-around"
    >
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
        

        <Grid item sm={12} lg={12} container>
          {climateFeed.map((effect, i) => (
            <CMCard
              key={`value-${i}`}
              index={i}
              title={effect.effectTitle}
              bodyText={effect.effectShortDesc}
              numberedCards={false}
            />
          ))}
        </Grid>



      </Grid>

      <Grid item sm={false} lg={4}>
        {/* right gutter */}
      </Grid>
    </Grid>
  );
};

export default ClimateFeed;
