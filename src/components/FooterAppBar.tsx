import { AppBar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

export interface FooterAppBarProps {
  bgColor?: string;
  children?: React.ReactNode;
}

const FooterAppBar: React.FC<FooterAppBarProps> = ({
  bgColor,
  children,
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
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      {children}
    </AppBar>
  );
};

export default FooterAppBar;
