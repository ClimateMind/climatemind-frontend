import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import Button from '../components/Button';
import Container from '../components/Container';
import { ReactComponent as Logo } from '../assets/CM_logo_MASTER_cm_icon_full-darkteal.svg';
import Text from '../components/Text';
import ROUTES from '../components/Router/RouteConfig';

// To do - consolidate styles
// To do - unit test navigation

const styles = makeStyles({
  root: {
    flexGrow: 1,
    'min-height': '100vh',
    padding: '15vh 0',
    maxWidth: 320,
    justifyContent: 'space-between',
    alignContent: 'center',
    margin: '0 auto',
  },
  typography: {
    letterSpacing: 1,
    textAlign: 'center',
    fontWeight: 200,
  },
  h4: {
    fontWeight: 600,
    fontSize: 32,
    characterSpacing: 50,
    LineSpacing: 36,
    letterSpacing: 1,
    color: '#07373B',
  },
  h6: {
    fontWeight: 400,
    fontSize: 20,
    color: '#07373B',
    characterSpacing: 0,
    lineSpacing: 24,
  },
});

const QuizWelcome: React.FC<{}> = () => {
  const classes = styles();
  const history = useHistory();

  // To do handle button click

  return (
    <Container bgColor="#FF9439">
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        className={classes.root}
      >
        <Typography variant="h4" className={classes.h4}>
          Hello there!
        </Typography>
        <Typography variant="h6" className={classes.h6}>
          Welcome to Climate Mind.
        </Typography>
        <Logo data-testid="climate-mind-logo" />

        <Text
          size={16}
          fontFamily="Bilo"
          color="#07373B"
          textAlign="center"
          fontWeight={200}
          padding={'0 50px'}
        >
          I’ll help you find out your Climate Personality to give you
          personalised solutions to climate change.
        </Text>

        <Button
          displayText="Let's Go"
          onClick={() => history.push(ROUTES.ROUTE_QUIZ)}
        />
      </Grid>
    </Container>
  );
};

export default QuizWelcome;
