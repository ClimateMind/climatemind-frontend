import React from 'react';
import { Grid, makeStyles, CircularProgress } from '@material-ui/core';

import Container from '../components/Container';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    'min-height': '100vh',
    padding: '15vh 0',
  },
  typography: {
    letterSpacing: 1,
    fontWeight: 600,
    textAlign: 'center',
    wordSpacing: '100vw',
  },
});

const Home: React.FC<{}> = () => {
  const classes = styles();

  return (
    <Container bgColor="#FFF">
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        className={classes.root}
      >
        <CircularProgress />
      </Grid>
    </Container>
  );
};

export default Home;
