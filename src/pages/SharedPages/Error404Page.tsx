import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Grid, Box, makeStyles } from '@material-ui/core';

import { useErrorLogging } from '../../hooks/useErrorLogging';
import { COLORS } from '../../common/styles/CMTheme';
import Wrapper from 'components/Wrapper';
import { CmButton, CmTypography } from 'shared/components';

const styles = makeStyles(() => {
  return {
    root: {},
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
    textButton: {
      color: COLORS.DK_TEXT,
      marginTop: '1em',
    },
    links: {
      textDecoration: 'none',
      color: COLORS.SECONDARY,
    },
  };
});

function Error404Page() {
  const classes = styles();
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
          <CmTypography variant="h1" className={classes.emoji}>
            :(
          </CmTypography>
          <CmTypography variant="h1" className={classes.title}>
            Well this is awkward…
          </CmTypography>
          <CmTypography
            variant="h4"
            className={classes.message}
          >
            the page that was requested can't be found, but you could visit our{' '}
            <Link className={classes.links} to="/">
              Homepage
            </Link>
          </CmTypography>
        </Box>
      </Grid>

      <Grid item className={classes.buttonDiv}>
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

export default Error404Page;
