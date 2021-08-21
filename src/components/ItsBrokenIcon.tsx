import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Box, Typography, makeStyles } from '@material-ui/core';

const styles = makeStyles(() => {
  return {
    emoji: {
      fontSize: '60px',
      fontWeight: 900,
      marginTop: '15vh',
    },
    title: {
      fontSize: '32px',
      fontWeight: 900,
      margin: '1em 0',
    },
    message: { fontSize: '20px' },
    buttonDiv: {
      textAlign: 'center',
    },
  };
});

export const ItsBrokenIcon: React.FC<{}> = () => {
  const classes = styles();
  const { goBack } = useHistory();

  const sendEmail = () => {
    window.open('mailto:hello@climatemind.org');
  };

  return (
    <Grid item>
      <Box>
        <Typography variant="h3" align="center" className={classes.emoji}>
          :(
        </Typography>
        <Typography variant="h3" align="center" className={classes.title}>
          It’s broken…
        </Typography>
        <Typography variant="body1" align="center" className={classes.message}>
          the page that is, not the Earth
        </Typography>
        <Typography variant="body1" align="center" className={classes.message}>
          – there’s still hope for it!
        </Typography>
      </Box>
    </Grid>
  );
};
