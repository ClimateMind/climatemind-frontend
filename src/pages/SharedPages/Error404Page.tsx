import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

import { useErrorLogging } from '../../hooks/useErrorLogging';
import { COLORS } from '../../common/styles/CMTheme';
import Wrapper from 'components/Wrapper';
import { CmButton, CmTypography } from 'shared/components';

function Error404Page() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logMessage } = useErrorLogging();

  useEffect(() => {
    logMessage(`Err404: ${pathname}`);
    // eslint-disable-next-line
  }, []);

  const sendEmail = () => {
    window.open('mailto:hello@climatemind.org');
  };

  return (
    <Wrapper bgColor={COLORS.PRIMARY}>
      <Grid item>
        <Box px={5}>
          <CmTypography variant="h1" style={styles.emoji}>
            :(
          </CmTypography>
          <CmTypography variant="h1" style={styles.title}>
            Well this is awkward…
          </CmTypography>
          <CmTypography
            variant="h4"
            style={styles.message}
          >
            the page that was requested can't be found, but you could visit our{' '}
            <Link style={styles.links} to="/">
              Homepage
            </Link>
          </CmTypography>
        </Box>
      </Grid>

      <Grid item style={styles.buttonDiv}>
        <Grid item container justifyContent="center" direction="column">
          <CmButton
            text='Go to homepage'
            onClick={() => navigate('/')}
            style={{ marginBottom: 10 }}
          />

          <CmButton
            variant="text"
            text='Get Help / Contact Us'
            onClick={() => sendEmail()}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  emoji: {
    fontSize: '60px',
    fontWeight: 900,
    marginTop: '15vh',
  },
  title: {
    fontSize: '36px',
    fontWeight: 900,
    margin: '1em 0',
  },
  message: { fontSize: '20px', fontWeight: 100 },
  buttonDiv: {
    textAlign: 'center',
  },
  links: {
    textDecoration: 'none',
    color: COLORS.SECONDARY,
  },
};

export default Error404Page;
