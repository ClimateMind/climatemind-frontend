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
  SwipeableDrawer
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { boolean } from 'yup/lib/locale';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Button from '@material-ui/core/Button';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

export interface DrawerDashboardProps {
  title?: string;
  children?: React.ReactNode;
  bgColor?: string;
}

const DrawerDashboard: React.FC<DrawerDashboardProps> = ({
  title,
  children,
  bgColor,
}: DrawerDashboardProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        padding: `0 8px`,
      },
      paper: {
        maxWidth: '640px',
        height: '100%',
        backgroundColor: bgColor ? bgColor : '#FFF',
        marginTop: '-16px',
      },
      dashContainer: {
        minHeight: '80vh',
        maxHeight: '80vh',
        backgroundColor: bgColor ? bgColor : '#FFF',
      },
      dialogHeader: {
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        left: 0,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        zIndex: 1200,
        backgroundColor: bgColor ? bgColor : '#FFF',
      },
      dialogContent: {
        padding: 0,
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
      buttonDrawer: {
        position:"absolute",
        bottom:0,
        left:0,
        border:"1px solid ",
        borderRadius:0
      }
    })
  );

  const classes = useStyles();

  const [showDash, setShowDash] = useState(true);
  type TState = {
    top: boolean;
    left: boolean;
    bottom: boolean;
    right: boolean;
  };
  const [state, setState] = useState<TState>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // interface IToggleDrawerType = {
  //   anchor: String;
  //   open: boolean;
  // }
  type TAnchor = 'top' | 'bottom' | 'left' | 'right' | undefined;

  const toggleDrawer = (anchor: TAnchor, open: boolean) => (event: { type: string; key: string; }) => {
    console.log('toggle...');
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [String(anchor)]: open });
  };
  
  type TDirection = 'up' | 'down';
  const [slideDirection, setSlideDirection] = useState<TDirection>('up');

  const handleShowClick = () => {
    console.log('wut');
    setShowDash(!showDash);
    // if (sessionId) addCardOpenToDataLayer(iri, sessionId);
  };


  const arr: Array<TAnchor> = ['bottom']; 
  return (
    <>
     {arr.map((anchor: TAnchor) => (
      <React.Fragment key={anchor}>
        <Button fullWidth className={classes.buttonDrawer} onClick={handleShowClick}>
          <KeyboardArrowUpIcon/>
        </Button>
        {/* <SwipeableDrawer
          anchor={anchor}
          
        >
            <Button fullWidth onClick={toggleDrawer(anchor, false)}>
              <KeyboardArrowDownIcon/>
            </Button>
            <p>content of drawer</p>
          
        </SwipeableDrawer> */}
      </React.Fragment>
      ))}
    </>
  );
};

export default DrawerDashboard;
