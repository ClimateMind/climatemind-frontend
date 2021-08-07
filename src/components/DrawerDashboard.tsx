import React, { useState } from 'react';
import { ReactComponent as ArrowDown } from '../assets/icon-arrow-down.svg';
import {
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Theme,
  Collapse,
  Button,
  ButtonProps,
  SwipeableDrawer,
  Box
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { boolean } from 'yup/lib/locale';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Button from '@material-ui/core/Button';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

export interface DrawerDashboardProps {
  drawerTitle?: string;
  children?: React.ReactNode;
  bgColor?: string;
  offsetAnchorY?: number;
  spaceToTop?: number;
}

const DrawerDashboard: React.FC<DrawerDashboardProps> = ({
  drawerTitle = 'conversations',
  children,
  bgColor,
  offsetAnchorY = 0,
  spaceToTop = 0,
}: DrawerDashboardProps) => {
  const useStyles = makeStyles<Theme, DrawerDashboardProps>((theme: Theme) =>
    createStyles({
      root: {
        padding: `0 8px`,
      },
      paper: (props: DrawerDashboardProps) => ({
        // maxWidth: '640px',
        // height: '100%',
        // backgroundColor: bgColor ? bgColor : '#FFF',
        // marginTop: '-16px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        // height: '99%',
        height: `calc(100% - ${props.spaceToTop}px)`,
        backgroundColor: bgColor ? bgColor : '#FFF',
      }),
      dashContainer: {
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      },
      titleText: {
        textTransform: 'capitalize',
        margin: '0.3em 0 0',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      },
      media: {
        margin: 0,
        paddingTop: '56.25%',
      },
      closeArea: {
        '& p': {
          fonstSize: '12px',
        },
      },
      arrow: {
        width: '32px',
        height: '32px',
        padding: 0,
        marginTop: '50px',
      },
      buttonDrawer: (props: DrawerDashboardProps) => ({
        position:'absolute',
        // bottom:56,
        bottom: props.offsetAnchorY,
        left:0,
        // border:'1px solid ',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        // borderRadius:0,
        backgroundColor: bgColor ? bgColor : '#FFF',
      }),
      closeDrawer: {
        // borderTopLeftRadius: '15px',
      },
      buttonText: {
        textTransform: 'uppercase',
        letterSpacing: '1pt',
        fontSize: '10px',
        // color: preTitleColor,
      },
    })
  );

  const props = {
    drawerTitle,
    children,
    bgColor,
    offsetAnchorY,
    spaceToTop,
  }

  const classes = useStyles(props);

  const [showDash, setShowDash] = useState(false);

  const handleShowClick = () => {
    console.log('wut');
    setShowDash(!showDash);
    // if (sessionId) addCardOpenToDataLayer(iri, sessionId);
  };

  return (
    <>
      <Button fullWidth className={classes.buttonDrawer} onClick={handleShowClick}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <KeyboardArrowUpIcon/>
          <Typography 
            className={classes.buttonText}
            gutterBottom
            variant="h3"
            component="h3">
              {drawerTitle}
          </Typography>
        </Box>
      </Button>
      <SwipeableDrawer
        classes={{
          paper: classes.paper,
        }}
        anchor="bottom"
        open={showDash}
        onClose={handleShowClick}
        onOpen={handleShowClick}
      >
        <Button fullWidth className={classes.closeDrawer} onClick={handleShowClick}><KeyboardArrowDownIcon/></Button>
          <div className={classes.dashContainer}>
          {children}
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default DrawerDashboard;
