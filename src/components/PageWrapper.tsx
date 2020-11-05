import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Div100vh from 'react-div-100vh';
import { Toolbar } from '@material-ui/core';

type PageWrapperProps = {
  bgColor: string;
  children?: React.ReactNode;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children, bgColor }) => {
  const styles = makeStyles({
    root: {
      backgroundColor: bgColor,
      overflow: 'hidden',
    },
    outerGrid: {
      padding: '3em 1em',
      height: '100%',
    },
  });

  const classes = styles();

  return (
    // The Div100Vh element ensures that the outer grid takes up full screen height but avoids content behind the top and bottom bars on iphone by finding the innerHeight of the viewport
    <Div100vh className={classes.root}>
      <Grid container direction="row" className={classes.outerGrid}>
        <Toolbar variant="dense" />
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
    </Div100vh>
  );
};

export default PageWrapper;
