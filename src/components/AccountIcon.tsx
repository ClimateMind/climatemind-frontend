import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { COLORS } from '../common/styles/CMTheme';
import { useAuth } from '../hooks/useAuth';

const AccountIcon: React.FC = () => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: COLORS.SECONDARY,
        marginRight: '30px',
      },
    })
  );

  const classes = useStyles();
  const { auth } = useAuth();

  return (
    <Grid
      container
      item
      className={classes.root}
      alignItems="center"
      justify="center"
    >
      <Typography variant="h6">{auth.userIntials || 'CM'}</Typography>
    </Grid>
  );
};

export default AccountIcon;
