import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CMLogo } from '../assets/cm-logo-mint.svg';
import { ReactComponent as UpArrowIcon } from '../assets/icon-arrow-up.svg';
import { COLORS } from '../common/styles/CMTheme';
import { Button } from '../components/Button';
import ROUTES from '../components/Router/RouteConfig';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { useBreakpoint } from '../hooks/useBreakpoint';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
    },
    section: {
      height: '50vh',
      minHeight: '450px',
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
      color: '#fff',
    },
    container: {
      textAlign: 'center',
      maxWidth: '640px',
      margin: '0 auto',
      padding: '0 1em',
    },
    explainerParagraph: {
      fontFamily: 'atten-round-new',
      fontWeight: 900,
    },
    typography: {
      textAlign: 'center',
    },
    bottomText: {
      color: 'white',
    },
    pageHeader: {
      marginTop: '1.3em',
    },
    logo: {
      paddingRight: '0.5em',
    },
    upArrow: {
      marginLeft: '-14px',
    },
  })
);

const StartQuiz: React.FC<{}> = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isXs } = useBreakpoint();

  return (
    <div className={classes.root}>
      <ScrollToTopOnMount />
      <section className={`${classes.section} ${classes.topSection}`}>
        <div className={classes.container}>
          <Box mb={2} mt={5}>
            <Typography
              component="h1"
              variant="h4"
              className={classes.typography}
            >
              First, what are your core values?
            </Typography>
          </Box>

          <Box>
            <Typography variant="body1">
              The Theory of Basic Human Values recognizes ten universal values.
              Respond to 10 statements based on these to find out your core
              values. Then view your results, learn how climate change affects
              you now and explore exciting solutions.
            </Typography>
          </Box>

          <Box mt={5}>
            <Typography variant="body1" className={classes.explainerParagraph}>
              Read each statement and decide how much you are like or not like
              that. Don’t worry! There’s no right or wrong answers!
            </Typography>
          </Box>

          <Box mt={5}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => history.push(ROUTES.ROUTE_QUIZ)}
            >
              Take the quiz
            </Button>
          </Box>
        </div>
      </section>

      <section className={`${classes.section} ${classes.bottomSection}`}>
        <div className={classes.container}>
          <Box mt={isXs ? -3 : -12} mb={4}>
            <Typography
              variant="h4"
              align="center"
              className={classes.bottomText}
            >
              We make personalized understanding of climate change easier.
            </Typography>
          </Box>
          <Box mt={4} mb={4}>
            <CMLogo data-testid="climate-mind-logo" />
          </Box>
          <Box>
            <UpArrowIcon className={classes.upArrow} />
          </Box>
        </div>
      </section>
    </div>
  );
};

export default StartQuiz;
