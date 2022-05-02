import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

export type WrapperProps = {
  bgColor?: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = ({
  children,
  bgColor,
  fullHeight = false,
}) => {
  const styles = makeStyles({
    root: {
      backgroundColor: bgColor ? bgColor : 'inherit',
      minHeight: fullHeight ? 'calc(100vh - 48px)' : 'auto',
      minWidth: '304px',
      width: '100%',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    outerGrid: {
      padding: '0 1em',
      minHeight: fullHeight ? '100vh' : 'auto',
    },
  });

  const classes = styles();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        className={classes.outerGrid}
      >
        <Grid item>{children}</Grid>
      </Grid>
    </div>
  );
};

export default Wrapper;
