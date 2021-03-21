import { Grid, useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import theme from '../common/styles/CMTheme';

type Props = {
  hasBottomMenu?: boolean;
};

const PageContent: React.FC<Props> = ({ children, hasBottomMenu = false }) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        width: '100%',
        maxWidth: '640px',
        height: `calc(100vh - 75px )`,
      },
      spacer: theme.mixins.toolbar,
      grid: {
        height: hasBottomMenu ? 'calc(100% - 56px)' : '100%',
        paddingTop: theme.spacing(2),
        marginBottom: hasBottomMenu ? 70 : theme.spacing(2),
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
      {/* Spacer for app bar */}
      <div className={classes.spacer} />
      <main className={classes.root}>
        <Grid
          container
          className={classes.grid}
          direction="column"
          justify={isXS ? 'space-between' : 'flex-start'}
          alignItems="center"
        >
          {children}
        </Grid>
      </main>
    </>
  );
};

export default PageContent;
