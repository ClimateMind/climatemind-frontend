import { Box, createStyles, Grid, makeStyles, Typography, Theme } from '@material-ui/core';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import React, { useEffect } from 'react';
import { COLORS } from '../../common/styles/CMTheme';
// import { useHistory } from 'react-router-dom';
// import ROUTES from '../../components/Router/RouteConfig';
import PageTitle from '../../components/PageTitle';
import FooterAppBar from '../../components/FooterAppBar';
import { useAlignment } from '../../hooks/useAlignment';
import PageSection from '../../components/PageSection';
import Wrapper from '../../components/Wrapper';
import { ReactComponent as ArrowDownPurple } from '../../assets/icon-arrow-down-purple.svg';
import { ReactComponent as StepOneIcon } from '../../assets/step-one-icon.svg';
import { ReactComponent as StepTwoIcon } from '../../assets/step-two-icon.svg';
import { ReactComponent as StepThreeIcon } from '../../assets/step-three-icon.svg';
import { ReactComponent as StepFourIcon } from '../../assets/step-four-icon.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
    },
    typography: {
      textAlign: 'center',
    },
    upper: {
      textTransform: 'uppercase',
      letterSpacing: '1pt',
      fontSize: '10px',
      fontWeight: 500,
    },
  })
);

// const styles = makeStyles(() => {
//   return {
//     root: {
//       minHeight: '100vh',
//     },
//     typography: {
//       textAlign: 'center',
//     },
//   };
// });

const HowCMWorks: React.FC = () => {
  // const classes = styles();
  const classes = useStyles();
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
    <main>
    <Grid
      container
      className={classes.root}
      data-testid="PersonalValues"
      justify="space-around"
    >
      {/* --- */}

      <Wrapper bgColor={COLORS.SECTION1}>
        <PageSection>
          <PageTitle>How does Climate Mind work?</PageTitle>

          <Box textAlign="center">
            <Typography variant="subtitle2">
              Step 1
            </Typography>
            <Typography variant="subtitle2">
              Take a quiz
            </Typography>
          </Box>
          <Box textAlign="center" pt={2} pb={1}>
            <StepOneIcon data-testid="step-one-icon" />
          </Box>
          <Box textAlign="center" pb={4}>
            <Typography variant="body2">
              Discover your core values and see which values make you tick.
            </Typography>
          </Box>

          <Box textAlign="center" pt={4}>
            <Typography variant="subtitle2">
              Step 2
            </Typography>
            <Typography variant="subtitle2">
              See how you and your friends align
            </Typography>
          </Box>
          <Box textAlign="center" pt={2} pb={1}>
            <StepTwoIcon data-testid="step-two-icon" />
          </Box>
          <Box textAlign="center" pb={4}>
            <Typography variant="body2">
              Understand how your shared values can help frame conversations and climate change action.
            </Typography>
          </Box>

          <Box textAlign="center" pt={4}>
            <Typography variant="subtitle2">
              Step 3
            </Typography>
            <Typography variant="subtitle2">
              Connect, learn, and act on common interests together
            </Typography>
          </Box>
          <Box textAlign="center" pt={2} pb={1}>
            <StepThreeIcon data-testid="step-three-icon" />
          </Box>
          <Box textAlign="center" pb={4}>
            <Typography variant="body2">
              Share climate conversation topics and solutions that align with you and your friend’s 
              shared values to make collective action easier and more comfortable.
            </Typography>
          </Box>

          <Box textAlign="center" pt={4}>
            <Typography variant="subtitle2">
              Step 4
            </Typography>
            <Typography variant="subtitle2">
              Join Climate Mind & get rewards
            </Typography>
          </Box>
          <Box textAlign="center" pt={2} pb={1}>
            <StepFourIcon data-testid="step-four-icon" />
          </Box>
          <Box textAlign="center" mb={-3}>
            <Typography variant="body2">
              Create an account, invite others, and track your progress to get perks.
            </Typography>
          </Box>

        </PageSection>
      </Wrapper>

      {/* --- */}
      <Wrapper bgColor={COLORS.SECTION2} fullHeight={true}>
      <PageSection>

          <Box textAlign="center">
            <ArrowDownPurple data-testid="arrow-down-purple-logo" />
          </Box>

          <Box textAlign="center" pt={2}>
            <Typography className={classes.upper}>
              Further reading
            </Typography>
            {/* <Typography variant="subtitle2">
              Join Climate Mind & get rewards
            </Typography> */}
          </Box>

        </PageSection>
      </Wrapper>

      
    </Grid>
  </main>
    // <div className={classes.root}>
    //   <div className={classes.container}>
    //     <Box textAlign="center">
    //       <PageTitle variant="h1">Climate Mind</PageTitle>
    //     </Box>
      
    //     <Box textAlign="center"  pb={4}>
    //       <Typography variant="h6">
    //         Placeholder for: 'How Climate Mind work?' page.
    //       </Typography>
    //     </Box>

    //     <Wrapper  bgColor='red'>
    //       <PageSection>
    //         <Box textAlign="center">
    //           <PageTitle variant="h1">Climate Mind</PageTitle>
    //         </Box>
    //       </PageSection>
    //     </Wrapper>
  
    //     <FooterAppBar bgColor={COLORS.ACCENT10} >
    //       <Toolbar>
    //         <Button 
    //           style={{ border: '1px solid #a347ff' }}
    //           variant='contained' 
    //           color='primary' 
    //           disableElevation 
    //           onClick={handleUserBTakesQuiz}
    //         >
    //           TODO...
    //         </Button>
    //       </Toolbar>
    //     </FooterAppBar>
    //   </div>
    // </div>
  );
}

export default HowCMWorks;
