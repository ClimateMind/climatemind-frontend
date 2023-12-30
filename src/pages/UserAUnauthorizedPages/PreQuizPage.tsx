import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { ReactComponent as CMLogo } from '../../assets/cm-logo-mint.svg';
import { ReactComponent as UpArrowIcon } from '../../assets/icon-arrow-up.svg';
import { COLORS } from '../../common/styles/CMTheme';
import ROUTES from '../../router/RouteConfig';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { CmButton, CmTypography } from 'shared/components';

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
      backgroundColor: 'rgba(138, 213, 204, 0.6)',
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

function PreQuizPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isXs } = useBreakpoint();

  return (
    <div className={classes.root}>
      <section className={`${classes.section} ${classes.topSection}`}>
        <div className={classes.container}>
          <Box mb={2} mt={5}>
            <CmTypography variant='h2'>
              First, what do you care about?
            </CmTypography>
          </Box>

          <Box>
            <CmTypography variant="body">
              Take this short quiz about personal values so we can help you find
              common ground and topics for your conversations.
            </CmTypography>
          </Box>

          <Box mt={5}>
            <CmTypography variant="body" className={classes.explainerParagraph}>
              Read each statement and decide how much like it you are or not.
              Don't worry! There's no right or wrong answers!
            </CmTypography>
          </Box>

          <Box mt={5}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CmButton
                text='Take the quiz'
                onClick={() => navigate(ROUTES.QUIZ_PAGE)}
              />
            </div>
          </Box>
        </div>
      </section>

      <section className={`${classes.section} ${classes.bottomSection}`}>
        <div className={classes.container}>
          <Box mt={isXs ? -3 : -12} mb={4}>
            <CmTypography variant="h2" className={classes.bottomText}>
              Personal values are key for effective climate conversations.
            </CmTypography>
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
}

export default PreQuizPage;
