import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ConnectTheDots } from '../assets/ConnectTheDots.svg';
import { ReactComponent as ArrowUpIcon } from '../assets/icon-arrow-up.svg';
import { COLORS } from '../common/styles/CMTheme';
import { Button } from '../components/Button';
import ROUTES from '../components/Router/RouteConfig';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { useBreakpoint } from '../hooks/useBreakpoint';

const styles = makeStyles(() => {
  return {
    root: {
      minHeight: '100vh',
      textAlign: 'center',
      backgroundColor: 'red',
    },
    section: {
      minHeight: '50vh',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: '2em',
      paddingTop: '2em',
    },
    topSection: {
      backgroundColor: COLORS.SECONDARY,
    },
    bottomSection: {
      backgroundColor: COLORS.DK_BG,
    },
    container: {
      textAlign: 'center',
      maxWidth: '640px',
      margin: '0 auto',
      padding: '0 1em',
    },
    headline: {
      maxWidth: '443px',
      margin: '0 auto',
    },
    introParagraph: {
      fontFamily: 'atten-round-new',
      fontWeight: 900,
    },
    loginButton: {
      color: COLORS.DK_TEXT,
    },
    typography: {
      textAlign: 'center',
    },
    bottomText: {
      color: '#ffffff',
      maxWidth: '449px',
      fontFamily: 'atten-round-new',
      fontWeight: 900,
    },
    logo: {
      color: COLORS.ICON_LIGHT,
    },
    arrow: {
      marginLeft: '-12px',
    },
  };
});

const Home: React.FC<{}> = () => {
  const classes = styles();
  const history = useHistory();
  const { isXs } = useBreakpoint();

  return (
    <div className={classes.root}>
      <ScrollToTopOnMount />
      <section className={`${classes.section} ${classes.topSection}`}>
        <div className={classes.container}>
          <Box mt={8} mb={4}>
            <Typography
              className={classes.headline}
              variant="h3"
              component="h1"
              align="center"
            >
              Personalize your understanding of climate change.
            </Typography>
          </Box>

          <Box mt={5} mb={1}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => history.push(ROUTES.ROUTE_PERSONALITY)}
            >
              Get Started
            </Button>
          </Box>

          <Box mt={1} mb={4}>
            <Button
              className={classes.loginButton}
              color="primary"
              disableElevation
              onClick={() => history.push(ROUTES.ROUTE_LOGIN)}
            >
              Already a member? Login here
            </Button>
          </Box>

          <Box ml={1} mr={1} mb={2}>
            <Typography align="center" className={classes.introParagraph}>
              Climate change personally affects each of us, but we often don’t
              know how or what to do about it.
            </Typography>
          </Box>
          <Box ml={1} mr={1} mb={1}>
            <Typography align="center">
              Climate Mind helps you explore how your values and personal
              interests are being affected by climate change and shows you
              attractive solutions exist that you may not be aware of.
            </Typography>
          </Box>
        </div>
      </section>

      <section className={`${classes.section} ${classes.bottomSection}`}>
        <div className={classes.container}>
          <Box mt={isXs ? -3 : -12}>
            <Typography align="center" className={classes.bottomText}>
              We’ll help connect the dots between you, a changing climate and
              action you can take!
            </Typography>
          </Box>

          <Box mt={6}>
            <ConnectTheDots />
          </Box>
          <Box mt={4} textAlign="center" className={classes.arrow}>
            <ArrowUpIcon data-testid="connect-dots-logo" />
          </Box>
        </div>
      </section>
    </div>
  );
};

export default Home;
