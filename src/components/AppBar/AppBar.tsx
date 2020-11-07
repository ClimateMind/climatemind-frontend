import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import MenuPaper from './MenuPaper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      zIndex: 99,
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

  const [isMenuShowing, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!isMenuShowing);
  };

  return (
    <>
      <div className={classes.root}>
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
      </div>
      <MenuPaper isShowing={isMenuShowing} />
    </>
  );
};

export default CmAppBar;
