import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ROUTES from 'components/Router/RouteConfig';

import { ReactComponent as ConnectTheDots } from 'assets/ConnectTheDots.svg';
import { ReactComponent as ArrowUpIcon } from 'assets/icon-arrow-up.svg';
import classes from './Home.module.css';

import { useSession } from 'hooks/useSession';
import { loginButtonToDataLayer, getStartedButtonToDataLayer } from 'analytics';

import { COLORS } from 'common/styles/CMTheme';
import CookiesDialog from 'components/CookiesDialog';
import { Box, Typography } from '@material-ui/core';
import { Button } from 'components/Button';

const Home = () => {
  const history = useHistory();
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

  return (
    <>
      {showCookiesDialog ?? (
        <CookiesDialog
          onDecline={() => setShowCookiesDialog(false)}
          onAccept={() => {
            setShowCookiesDialog(false);
            history.push(ROUTES.ROUTE_PERSONALITY);
          }}
        />
      )}

      <div
        className={classes.root}
        style={{ backgroundColor: COLORS.SECONDARY }}
      >
        {/* Upper Section */}
        <div className={classes.upperSection}>
          <Typography variant="h3">Inspire others to take action!</Typography>

          <Button
            style={{
              marginTop: '3rem',
              backgroundColor: buttonHovered ? '#eee' : 'white',
              padding: '6px 20px',
            }}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            onClick={handleGettingStarted}
          >
            Get Started
          </Button>
          <Box mt={1} mb={4}>
            <Button onClick={handleLoginClick}>
              Already a member? Login here
            </Button>
          </Box>

          <Typography
            style={{
              fontFamily: 'atten-round-new',
              fontWeight: 900,
              marginBottom: '1rem',
            }}
          >
            Climate change affects us all. And to inspire sufficient action, we
            must talk about it much more.
          </Typography>

          <Typography>
            Climate Mind makes it easy to have effective conversations with your
            friends and family.
          </Typography>
        </div>

        {/* Lower Section */}
        <div
          className={classes.expand}
          style={{ backgroundColor: COLORS.DK_BG, height: '100%' }}
        >
          <div className={classes.lowerSection}>
            <Typography style={{ color: '#ffffff' }}>
              We use proven social science to connect climate change to what
              people care about and help find solutions they like.
            </Typography>

            <Box mt={6}>
              <ConnectTheDots />
            </Box>

            <Box mt={4} style={{ marginLeft: '-12px' }}>
              <ArrowUpIcon data-testid="connect-dots-logo" />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
