import React, { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { ReactComponent as CMLogo } from '../../assets/cm-logo-mint.svg';
import { ReactComponent as UpArrowIcon } from '../../assets/icon-arrow-up.svg';
import ROUTES from '../../router/RouteConfig';
import { CmButton, CmTypography } from 'shared/components';

function PreQuizPage() {
  const navigate = useNavigate();
  const isXs = false;

  return (
    <div style={{
      minHeight: '100vh',
    }}>
      <section style={{ ...styles.section, ...styles.topSection }}>
        <div style={styles.container}>
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
            <CmTypography variant="body" style={styles.explainerParagraph}>
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

      <section style={{...styles.section, ...styles.bottomSection}}>
        <div style={styles.container}>
          <Box mt={isXs ? -3 : -12} mb={4}>
            <CmTypography variant="h2" style={styles.bottomText}>
              Personal values are key for effective climate conversations.
            </CmTypography>
          </Box>
          <Box mt={4} mb={4}>
            <CMLogo data-testid="climate-mind-logo" />
          </Box>
          <Box>
            <UpArrowIcon style={styles.upArrow} />
          </Box>
        </div>
      </section>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
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
  container: {
    textAlign: 'center',
    maxWidth: '640px',
    margin: '0 auto',
    padding: '0 1em',
  },
  bottomText: {
    color: 'white',
  },
  upArrow: {
    marginLeft: '-14px',
  },
  explainerParagraph: {
    fontFamily: 'atten-round-new',
    fontWeight: 900,
  },
};

export default PreQuizPage;
