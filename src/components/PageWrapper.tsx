import React from 'react';
import { Grid, Box, Typography, Button, makeStyles } from '@material-ui/core';
import Div100vh from 'react-div-100vh';

type PageWrapperProps = {
  bgColor: string;
  children?: React.ReactNode;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children, bgColor }) => {
  const styles = makeStyles({
    root: {
      backgroundColor: bgColor,
      overflow: 'hidden',
      minHeight: '-webkit-fill-available',
    },
    typography: {
      // wordSpacing: '100vw',
    },
  });

  const classes = styles();

  return (
    <Div100vh>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-around"
        wrap="nowrap"
        className={classes.root}
      >
        {children}
      </Grid>
    </Div100vh>
  );
};

export default PageWrapper;
