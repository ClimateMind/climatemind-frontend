import React from 'react';
import { Grid, makeStyles, CircularProgress } from '@material-ui/core';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    'min-height': '100vh',
    height: '100%',
    padding: '15vh 0',
  },
});

const Home: React.FC<{}> = () => {
  const classes = styles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      className={classes.root}
    >
      <CircularProgress color="secondary" />
    </Grid>
  );
};

export default Home;
