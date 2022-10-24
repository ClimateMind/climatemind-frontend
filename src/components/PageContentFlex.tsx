import { Grid, useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import theme from '../common/styles/CMTheme';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

const PageContent: React.FC = ({ children }) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        width: '100%',
        overflow: 'hidden',
      },
      spacer: theme.mixins.toolbar,
      grid: {
        height: '100%',
        gap: 0,
        flexWrap: 'nowrap',
        paddingBottom: '75px',
        boxSizing: 'border-box',
        [theme.breakpoints.up('xs')]: {
          gap: theme.spacing(8),
        },
      },
    })
  );

  const classes = useStyles(theme);
  const isXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <ScrollToTopOnMount />
      {/* Spacer for app bar */}
      <div className={classes.spacer} />
      <main className={classes.root}>
        <Grid
          container
          className={classes.grid}
          direction="column"
          justifyContent={isXS ? 'space-between' : 'flex-start'}
          alignItems="center"
        >
          {children}
        </Grid>
      </main>
    </>
  );
};

export default PageContent;
