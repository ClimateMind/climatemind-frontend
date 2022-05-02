import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Div100vh from 'react-div-100vh';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

type WrapperProps = {
  bgColor?: string;
  scroll?: boolean;
  children?: React.ReactNode;
};

const PageWrapper: React.FC<WrapperProps> = ({
  children,
  bgColor,
  scroll = false,
}) => {
  const styles = makeStyles({
    root: {
      backgroundColor: bgColor ? bgColor : 'inherit',
      overflow: scroll ? 'auto' : 'hidden',
      minWidth: '320px',
    },
    outerGrid: {
      padding: '3em 1em 1.8em',
      height: '100%',
    },
  });

  const classes = styles();

  useLockBodyScroll();

  return (
    // The Div100Vh element ensures that the outer grid takes up full screen height but avoids content behind the top and bottom bars on iphone by finding the innerHeight of the viewport
    <>
      <Div100vh className={classes.root}>
        <Grid container direction="row" className={classes.outerGrid}>
          <Grid item sm={false} lg={3}>
            {/* left gutter */}
          </Grid>
          <Grid
            xs={12}
            lg={6}
            item
            container
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
          >
            {children}
          </Grid>
          <Grid item sm={false} lg={3}>
            {/* right gutter */}
          </Grid>
        </Grid>
      </Div100vh>
    </>
  );
};

export default PageWrapper;
