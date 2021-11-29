import { AppBar, Toolbar, Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

export interface FooterAppBarProps {
  bgColor?: string;
  children?: React.ReactNode;
  align?: 'space-between' | 'center';
}

export const FooterAppBar: React.FC<FooterAppBarProps> = ({
  bgColor,
  children,
  align = 'space-between',
}: FooterAppBarProps) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      appBar: {
        backgroundColor: bgColor || 'inherit',
        top: 'auto',
        bottom: 0,
        padding: '0 8px',
        alignItems: align,
        justify: 'center',
      },
      wrapper: {
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        justifyContent: align,
      },
    })
  );

  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar disableGutters={true} className={classes.wrapper}>
        {children}
      </Toolbar>
    </AppBar>
  );
};
