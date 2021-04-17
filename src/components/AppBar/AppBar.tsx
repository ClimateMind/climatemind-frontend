import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import MenuPaper from './MenuPaper';
import theme from '../../common/styles/CMTheme';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';


import {
  useScrollTrigger,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Slide,
  useMediaQuery,
} from '@material-ui/core';

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
    }
  })
);

const CmAppBar: React.FC = () => {
  const [isMenuShowing, setMenu] = useState(false);
  const classes = useStyles({ isMenuShowing });
  const trigger = useScrollTrigger();
  const isXS = useMediaQuery(theme.breakpoints.down('xs'));
  const iconStyle = { height: '20px' };

  const handleMenu = () => {
    setMenu(!isMenuShowing);
  };
  return (
    <>
      <div className={classes.root}>
        <Slide in={!trigger}>
          <AppBar
            position="fixed"
            color="default"
            data-testid="AppBar"
            id="AppBar"
            aria-label="Climate Mind"
          >
            <Toolbar variant="dense" disableGutters={true}>
              <Typography variant="h6" className={classes.title}>
                Climate Mind
              </Typography>
              {/* {!isXS && <>
                <Typography variant="h6" className={classes.title}>
                  jool
                </Typography>
                <IconButton
                  className={classes.menuButton}
                  id="TopMenuToggle1"
                  color="inherit"
                  aria-label="menu"
                  aria-expanded={isMenuShowing}
                  onClick={handleMenu}
                >
                  <EmojiObjectsIcon style={iconStyle} data-testid="BottomMenuIconsSolutions"/>
                </IconButton>
                <IconButton
                  className={classes.menuButton}
                  id="TopMenuToggle2"
                  color="inherit"
                  aria-label="menu"
                  aria-expanded={isMenuShowing}
                  onClick={handleMenu}
                >
                  <EmojiObjectsIcon style={iconStyle} data-testid="BottomMenuIconsSolutions"/>
                </IconButton>
              </>
              } */}

              <IconButton
                edge="start"
                id="TopMenuToggle"
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
