import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { AccountIcon } from '../AccountIcon/AccountIcon';
import { ReactComponent as CMLogo } from '../../assets/cm-logo-bright.svg';
import { useAlignment } from '../../hooks/useAlignment';

interface StyleProps {
  isMenuShowing: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      color: theme.palette.primary.main,
      textAlign: 'center',
      marginLeft: '-29px',
    },
    logo: {
      height: '22px',
      width: '24px',
      paddingLeft: '9px',
    },
  })
);

export const AppBarMini: React.FC = () => {
  const classes = useStyles();

  const { isUserB } = useAlignment();

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
              justifyContent="space-between"
              direction="row"
            >
              <CMLogo className={classes.logo} />
              {!isUserB ? <AccountIcon /> : null}

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
