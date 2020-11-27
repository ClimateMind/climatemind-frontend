import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

type WrapperProps = {
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
      height: fullHeight ? '100vh' : 'auto',
      minWidth: '375px',
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
          justify="space-between"
          wrap="nowrap"
        >
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default Wrapper;
