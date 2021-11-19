import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Grid, useMediaQuery } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MenuPaper from './MenuPaper';
import MenuDrawer from './MenuDrawer';
import AccountIcon from '../AccountIcon';
import {
  useScrollTrigger,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Slide,
} from '@material-ui/core';
import theme from '../../common/styles/CMTheme';

interface StyleProps {
  isMenuShowing: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      zIndex: (props: StyleProps) => (props.isMenuShowing ? 10100 : 1000),
      position: 'relative',
    },
    title: {
      flexGrow: 1,
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(2),
      textAlign: 'center',
    },
    menuButton: {
      flexGrow: 1,
    },
  })
);

export const AppBarMini: React.FC = () => {
  const [isMenuShowing, setMenu] = useState(false);
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({ isMenuShowing });
  const trigger = useScrollTrigger();

  const handleMenu = () => {
    setMenu(!isMenuShowing);
  };

  return (
    <>
      <div className={classes.root} key="app-bar">
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
