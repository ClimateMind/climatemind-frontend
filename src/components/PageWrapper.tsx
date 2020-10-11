import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
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
      padding: '3.2em 1em',
    },
  });

  const classes = styles();

  return (
    <Div100vh>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
        wrap="nowrap"
        className={classes.root}
      >
        {children}
      </Grid>
    </Div100vh>
  );
};

export default PageWrapper;
