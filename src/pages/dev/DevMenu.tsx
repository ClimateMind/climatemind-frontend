import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { ReactComponent as CMLogoDark } from '../../assets/cm-logo-dark.svg';
import { COLORS } from '../../common/styles/CMTheme';
import PageTitle from '../../components/PageTitle';

const styles = makeStyles(() => {
  return {
    root: {
      minHeight: '100vh',
      backgroundColor: COLORS.ACCENT9,
    },
    typography: {
      textAlign: 'center',
    },
    container: {
      textAlign: 'center',
      maxWidth: '640px',
      margin: '0 auto',
      padding: '0 1em',
    },
  };
});

export const DevMenu: React.FC = () => {
  const classes = styles();

  // Dev menu and mocking can be enabled in a production like environment by adding ALLOW_MSW = true as a item in localStorage
  if (
    localStorage.getItem('ALLOW_MSW') === 'true' ||
    process.env.NODE_ENV === 'development'
  ) {
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Box py={3}>
            <CMLogoDark data-testid="climate-mind-logo" />
          </Box>
          <Box textAlign="center">
            <PageTitle variant="h1">Climate Mind - Developer Menu</PageTitle>
          </Box>
        </div>
      </div>
    );
  }
  return <div>Access Denied</div>;
};
