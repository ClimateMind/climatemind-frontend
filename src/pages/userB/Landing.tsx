import { Box, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { COLORS } from '../../common/styles/CMTheme';
import { useHistory, useParams } from 'react-router-dom';
import ROUTES from '../../components/Router/RouteConfig';
import PageTitle from '../../components/PageTitle';
import { ReactComponent as CMLogoDark } from '../../assets/cm-logo-dark.svg';
import { ReactComponent as ArrowDown } from '../../assets/icon-arrow-down-white.svg';
import FooterAppBar from '../../components/FooterAppBar';
import { useAlignment } from '../../hooks/useAlignment';
import OpenInNew  from '@material-ui/icons/OpenInNew';
import { framingUrl } from '../../shareSettings';

const styles = makeStyles(() => {
  return {
    root: {
      minHeight: '100vh',
      backgroundColor: COLORS.ACCENT11,
    },
    typography: {
      textAlign: 'center',
    },
    container: {
      textAlign: 'center',
      maxWidth: '640px',
      margin: '0 auto',
      padding: '0 1em',
    },
  };
});

type UrlParamType = {
  conversationId: string;
}

// export default function Landing() {
const Landing: React.FC = () => {
  const classes = styles();

  const { push } = useHistory();
  
  const { conversationId } = useParams<UrlParamType>();
  
  const { setConversationId } = useAlignment();

  useEffect(() => {
    if(conversationId) {
      setConversationId?.(conversationId);    
    }
  },[conversationId]);
  
  const handleHowCMWorks = () => {
    push(ROUTES.ROUTE_HOW_CM_WORKS);  
  };
  
  const handleNavAway = (url: string) => {
    window.open(url);
  };  

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Box textAlign="center">
          <PageTitle variant="h1">Climate Mind</PageTitle>
        </Box>
        <Box>
          <CMLogoDark data-testid="climate-mind-logo" />
        </Box>
        <Box textAlign="center">
          <PageTitle variant="h1">Stevie invited you to take our core values quiz!</PageTitle>
        </Box>

        <Box textAlign="center"  pb={4}>
          <Typography variant="h6">
            Talking about climate change is the most effective way to take action.
          </Typography>
        </Box>
        <Box component="div"  pt={2} pb={2}>
          <Typography variant="body1" align="center">
            We’ll show you which of your core values and personalized climate 
            topics match Stevie’s to motivate you to act together
          </Typography>
        </Box>
        <Box textAlign="center" pt={3} pb={3}>
          <ArrowDown data-testid="arrow-down-landing-logo" />
        </Box>
        <Box textAlign="center"pt={2}>
          <Typography variant="h6">
            Want to learn more about framing conversations?
          </Typography>
        </Box>
        <Box component="div" pt={2} pb={8}>
          <Button
            variant="outlined"
            disableElevation
            data-testid="framing-button"
            endIcon={ <OpenInNew fontSize="small" /> }
            onClick={() => handleNavAway(framingUrl)}
          >
            Framing
          </Button>
        </Box>
        <FooterAppBar bgColor={COLORS.ACCENT10} >
          <Toolbar>
            <Button 
              style={{ border: '1px solid #a347ff' }}
              variant='contained' 
              color='primary' 
              disableElevation 
              data-testid='how-cm-works-button'
              onClick={ handleHowCMWorks }
            >
              Next: How does ClimateMind work?
            </Button>
          </Toolbar>
        </FooterAppBar>
      </div>
    </div>
  );
}

export default Landing;
