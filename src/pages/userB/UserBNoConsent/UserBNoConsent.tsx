import React from 'react';
import PageTitle from '../../../components/PageTitle';
import { useHistory, Link } from 'react-router-dom';
import { Grid, Box, Typography, makeStyles } from '@material-ui/core';
import PageWrapper from '../../../components/PageWrapper';
import { COLORS } from '../../../common/styles/CMTheme';
import { Button } from '../../../components/Button';

const styles = makeStyles((theme) => {
  return {
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

export const NoConsent: React.FC<{}> = () => {
  const classes = styles();
  const { push } = useHistory();

  const sendEmail = () => {
    window.open('mailto:hello@climatemind.org');
  };

  return (
    <PageWrapper bgColor={COLORS.PRIMARY}>
      <Grid item>
        <Box px={4}>
          <PageTitle>No Problem</PageTitle>
          <Box pt={5} pb={3}>
            <Typography
              variant="body1"
              align="center"
              className={classes.message}
            >
              Your link from Stevie won't expire so you can return any time.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              align="center"
              className={classes.message}
            >
              We'll be here if you do!
            </Typography>
          </Box>
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
