import React from 'react';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import Button from '../components/Button';
import Container from '../components/Container';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import Text from '../components/Text';

// Need to think about how reusable this is. If we wanted to adjust he font weight globaly for example
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
    // wordSpacing: '100vw',
  },
});

const Home: React.FC<{}> = () => {
  const classes = styles();

  return (
    <Container bgColor="#FF9439">
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        className={classes.root}
      >
        <Typography variant="h4" className={classes.typography}>
          Hello there!
        </Typography>
        <Typography variant="h5" className={classes.typography}>
          Welcome to Climate Mind.
        </Typography>
        <Logo data-testid="climate-mind-logo" />

        <Text
          size={16}
          fontFamily="Bilo"
          color="#000000"
          textAlign="center"
          fontWeight={200}
        >
          I’ll help you find out your Climate Personality to give you
          personalised solutions to climate change.
        </Text>

        <Button
          displayText="Let's Go"
          onClick={() => console.log('take me to meet guy')}
        />
      </Grid>
    </Container>
  );
};

export default Home;
