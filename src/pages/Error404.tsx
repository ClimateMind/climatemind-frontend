import React, { useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useErrorLogging } from '../hooks/useErrorLogging';
import { Grid, Box, Typography, makeStyles } from '@material-ui/core';
import PageWrapper from '../components/PageWrapper';
import { COLORS } from '../common/styles/CMTheme';
import { Button } from '../components/Button';

const styles = makeStyles((theme) => {
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

const Error404: React.FC<{}> = () => {
  const classes = styles();
  const { push } = useHistory();
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
    <PageWrapper bgColor={COLORS.PRIMARY}>
      <Grid item>
        <Box px={5}>
          <Typography variant="h3" align="center" className={classes.emoji}>
            :(
          </Typography>
          <Typography variant="h3" align="center" className={classes.title}>
            Well this is awkward…
          </Typography>
          <Typography
            variant="body1"
            align="center"
            className={classes.message}
          >
            the page that was requested can't be found, but you could visit our{' '}
            <Link className={classes.links} to="/">
              Homepage
            </Link>
          </Typography>
        </Box>
      </Grid>

      <Grid item className={classes.buttonDiv}>
        <Grid item container justifyContent="center" direction="column">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => push('/')}
          >
            Go to homepage
          </Button>

          <Button
            variant="text"
            color="secondary"
            disableElevation
            className={classes.textButton}
            onClick={() => sendEmail()}
          >
            Get Help / Contact Us
          </Button>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Error404;
