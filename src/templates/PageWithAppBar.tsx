import { makeStyles } from '@material-ui/core';
import React from 'react';
import CmAppBar from '../components/AppBar/AppBar';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    width: '100%',
  },
  main: {
    height: 'calc(100vh - 105px)',
  },
}));

const PageWithAppBar: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <CmAppBar />
      <ScrollToTopOnMount />
      <section className={classes.main}>{children}</section>
    </main>
  );
};

export default PageWithAppBar;
