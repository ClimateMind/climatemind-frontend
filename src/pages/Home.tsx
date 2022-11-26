import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ConnectTheDots } from '../assets/ConnectTheDots.svg';
import { ReactComponent as ArrowUpIcon } from '../assets/icon-arrow-up.svg';
import { COLORS } from '../common/styles/CMTheme';
import { Button } from '../components/Button';
import CookiesDialog from '../components/CookiesDialog';
import ROUTES from '../components/Router/RouteConfig';
import { useBreakpoint } from '../hooks/useBreakpoint';
import {
  loginButtonToDataLayer,
  getStartedButtonToDataLayer,
} from '../analytics';
import { useSession } from '../hooks/useSession';

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

  const { sessionId, hasAcceptedCookies } = useSession();

  const [showCookiesDialog, setShowCookiesDialog] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  const handleGettingStarted = () => {
    if (sessionId && hasAcceptedCookies) {
      getStartedButtonToDataLayer(sessionId);
      history.push(ROUTES.ROUTE_PERSONALITY);
    } else {
      setShowCookiesDialog(true);
    }
  };

  const handleLoginClick = () => {
    if (sessionId && hasAcceptedCookies) {
      loginButtonToDataLayer(sessionId);
    }
    history.push(ROUTES.ROUTE_LOGIN);
  };

  const onDecline = () => {
    setShowCookiesDialog(false);
  };

  const onAccept = () => {
    setShowCookiesDialog(false);
    history.push(ROUTES.ROUTE_PERSONALITY);
  };

  return (
    <div className={classes.root}>
      {showCookiesDialog ? (
        <CookiesDialog
          onDecline={() => onDecline()}
          onAccept={() => onAccept()}
        />
      ) : (
        <></>
      )}
      <section className={`${classes.section} ${classes.topSection}`}>
        <div className={classes.container}>
          <Box mt={8} mb={4}>
            <Typography
              className={classes.headline}
              variant="h3"
              component="h1"
              align="center"
            >
              Inspire others to take action!
            </Typography>
          </Box>

          <Box mt={5} mb={1}>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: buttonHovered ? '#eee' : 'white',
                border: '2px solid ' + buttonHovered ? '#eee' : 'white',
                borderRadius: '4px',
                fontWeight: 'bolder',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: buttonHovered ? 'pointer' : 'default',
              }}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              onClick={handleGettingStarted}
            >
              Get Started
            </button>
          </Box>

          <Box mt={1} mb={4}>
            <Button
              className={classes.loginButton}
              color="primary"
              disableElevation
              onClick={handleLoginClick}
            >
              Already a member? Login here
            </Button>
          </Box>

          <Box ml={1} mr={1} mb={2}>
            <Typography align="center" className={classes.introParagraph}>
              Climate change affects us all. And to inspire sufficient action,
              we must talk about it much more.
            </Typography>
          </Box>
          <Box ml={1} mr={1} mb={1}>
            <Typography align="center">
              Climate Mind makes it easy to have effective conversations with
              your friends and family.
            </Typography>
          </Box>
        </div>
      </section>

      <section className={`${classes.section} ${classes.bottomSection}`}>
        <div className={classes.container}>
          <Box mt={isXs ? -3 : -12}>
            <Typography align="center" className={classes.bottomText}>
              We use proven social science to connect climate change to what
              people care about and help find solutions they like.
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
