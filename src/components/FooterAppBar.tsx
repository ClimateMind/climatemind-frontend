import { Typography, Grid, Theme, Box, AppBar, Toolbar } from '@material-ui/core';
import CardIcon from './CardIcon';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { COLORS } from '../common/styles/CMTheme';
import RoomIcon from '@material-ui/icons/Room';

import React from 'react';

export interface FooterAppBarProps {
  bgColor?: string;
  children?: React.ReactNode;
}

const FooterAppBar: React.FC<FooterAppBarProps> = ({
  bgColor,
  children
}: FooterAppBarProps) => {
 
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      appBar: {
        backgroundColor: bgColor ? bgColor : 'inherit',
        top: 'auto',
        bottom: 0,
        alignItems: 'center',
        justify: 'space-between',
      },
    })
  );

  const classes = useStyles();

  return (
    // <div className={classes.root} data-testid="FooterAppBar">
      <AppBar position="fixed" color="primary" className={classes.appBar}>  
        {children}
      </AppBar>
    // </div>
  );
};

export default FooterAppBar;
