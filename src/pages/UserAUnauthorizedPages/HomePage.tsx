import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@material-ui/core';

import ROUTES from 'router/RouteConfig';

import { ReactComponent as ConnectTheDots } from '../../assets/ConnectTheDots.svg';
import { ReactComponent as ArrowUpIcon } from '../../assets/icon-arrow-up.svg';
import classes from './Home.module.css';

import { useSession } from 'hooks/useSession';

import { COLORS } from 'common/styles/CMTheme';
import CookiesDialog from 'components/CookiesDialog';
import { Button } from 'components/Button';
import { ReactComponent as Logo } from '../../assets/cm-logo.svg';
import { GetStartedButtonEvent, LoginButtonEvent, analyticsService } from 'services';
import CmTypography from 'shared/components/CmTypography';

function HomePage() {
  const navigate = useNavigate();
  const { sessionId, hasAcceptedCookies } = useSession();

  const [showCookiesDialog, setShowCookiesDialog] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  const handleGettingStarted = () => {
    if (sessionId && hasAcceptedCookies) {
      analyticsService.postEvent(GetStartedButtonEvent);
      navigate(ROUTES.PRE_QUIZ_PAGE);
    } else {
      setShowCookiesDialog(true);
    }
  };

  const handleLoginClick = () => {
    if (sessionId && hasAcceptedCookies) {
      analyticsService.postEvent(LoginButtonEvent);
    }
    navigate(ROUTES.LOGIN_PAGE);
  };

  return (
    <>
      {showCookiesDialog ?? (
        <CookiesDialog
          onDecline={() => setShowCookiesDialog(false)}
          onAccept={() => {
            setShowCookiesDialog(false);
            navigate(ROUTES.PERSONAL_VALUES_PAGE);
          }}
        />
      )}

      <div
        className={classes.root}
        style={{ backgroundColor: 'rgba(138, 213, 204, 0.6)' }}
      >
        {/* Upper Section */}
        <div className={classes.upperSection}>
          <Box mb={3} textAlign="center">
            <Logo style={{ maxWidth: '110px' }} />
          </Box>

          <CmTypography variant="h1">Inspire others to take action!</CmTypography>

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

          <CmTypography variant='body' style={{ marginBottom: 20 }}>
            Climate change affects us all. And to inspire sufficient action, we
            must talk about it much more.
          </CmTypography>

          <CmTypography variant='body'>
            Climate Mind makes it easy to have effective conversations with your
            friends and family.
          </CmTypography>
        </div>

        {/* Lower Section */}
        <div
          className={classes.expand}
          style={{ backgroundColor: COLORS.DK_BG, height: '100%' }}
        >
          <div className={classes.lowerSection}>
            <CmTypography variant='body' style={{ color: '#ffffff' }}>
              We use proven social science to connect climate change to what
              people care about and help find solutions they like.
            </CmTypography>

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
}

export default HomePage;
