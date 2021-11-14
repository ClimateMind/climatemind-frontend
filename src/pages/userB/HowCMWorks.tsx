import { Box, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { COLORS } from '../../common/styles/CMTheme';
import { useHistory } from 'react-router-dom';
// import ROUTES from '../../components/Router/RouteConfig';
import PageTitle from '../../components/PageTitle';
import FooterAppBar from '../../components/FooterAppBar';
import { useAlignment } from '../../hooks/useAlignment';

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

const HowCMWorks: React.FC = () => {
  const classes = styles();
  // TODO: will be used later
  //const { push } = useHistory();

  const { conversationId } = useAlignment();

  useEffect(() => {
    console.log('HowCMWorks...', conversationId)
  }, [conversationId]);
  
  const handleUserBTakesQuiz = () => {
    console.log('handleUserBTakesQuiz')
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Box textAlign="center">
          <PageTitle variant="h1">Climate Mind</PageTitle>
        </Box>
      
        <Box textAlign="center"  pb={4}>
          <Typography variant="h6">
            Placeholder for: 'How Climate Mind work?' page.
          </Typography>
        </Box>
  
        <FooterAppBar bgColor={COLORS.ACCENT10} >
          <Toolbar>
            <Button 
              style={{ border: '1px solid #a347ff' }}
              variant='contained' 
              color='primary' 
              disableElevation 
              onClick={handleUserBTakesQuiz}
            >
              TODO...
            </Button>
          </Toolbar>
        </FooterAppBar>
      </div>
    </div>
  );
}

export default HowCMWorks;
