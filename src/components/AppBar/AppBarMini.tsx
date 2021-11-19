import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import AccountIcon from '../AccountIcon';

interface StyleProps {
  isMenuShowing: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(2),
      textAlign: 'center',
    },
  })
);

export const AppBarMini: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div data-testid="app-bar" key="app-bar">
        <AppBar
          position="fixed"
          color="default"
          data-testid="AppBar"
          id="AppBar"
          aria-label="Climate Mind"
        >
          <Toolbar variant="dense" disableGutters={true}>
            <Grid
              container
              alignItems="center"
              justify="space-between"
              direction="row"
            >
              <AccountIcon />

              <Typography variant="h6" className={classes.title}>
                Climate Mind
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};
