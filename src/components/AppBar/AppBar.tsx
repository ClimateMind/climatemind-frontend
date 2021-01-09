import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import MenuPaper from './MenuPaper';

import {
  useScrollTrigger,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Slide,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      zIndex: 99999,
      position: 'relative',
    },
    title: {
      flexGrow: 1,
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(2),
      textAlign: 'center',
    },
  })
);

const CmAppBar: React.FC = () => {
  const classes = useStyles();
  const trigger = useScrollTrigger();

  const [isMenuShowing, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!isMenuShowing);
  };
  return (
    <>
      <div className={classes.root}>
        <Slide in={!trigger}>
          <AppBar position="fixed" color="default" data-testid="AppBar">
            <Toolbar variant="dense" disableGutters={true}>
              <Typography variant="h6" className={classes.title}>
                Climate Mind
              </Typography>

              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                aria-expanded={isMenuShowing}
                onClick={handleMenu}
              >
                {isMenuShowing ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Toolbar>
          </AppBar>
        </Slide>
      </div>

      <MenuPaper isShowing={isMenuShowing} setIsShowing={setMenu} />
    </>
  );
};

export default CmAppBar;
