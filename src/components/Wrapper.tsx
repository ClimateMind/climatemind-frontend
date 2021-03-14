import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

export type WrapperProps = {
  bgColor?: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
  justify?: any;
};

const Wrapper: React.FC<WrapperProps> = ({
  children,
  bgColor,
  fullHeight = false,
  justify = "space-between",
}) => {
  const styles = makeStyles({
    root: {
      backgroundColor: bgColor ? bgColor : 'inherit',
      minHeight: fullHeight ? '100vh' : 'auto',
      minWidth: '304px',
      width: '100%',
      margin: 0,
      padding: 0,
    },
    outerGrid: {
      padding: '3em 1em',
      height: '100%',
    },
  });

  const classes = styles();

  return (
    <div className={classes.root}>
      <Grid container direction="row" className={classes.outerGrid}>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justify={justify}
          wrap="nowrap"
        >
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default Wrapper;
