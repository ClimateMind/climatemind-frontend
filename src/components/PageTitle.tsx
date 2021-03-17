import React from 'react';
import { Typography, Box, useMediaQuery } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import theme from '../common/styles/CMTheme';

const PageTitle: React.FC = ({ children }) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        textAlign: 'center',
        width: '100%',
      },
      heading: {
        fontSize: '40px',
        [theme.breakpoints.up('sm')]: {
          fontSize: '50px',
        },
        [theme.breakpoints.up('lg')]: {
          fontSize: '60px',
        },
      },
    })
  );

  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  return (
    <Box py={isXSmall ? 4 : 8} className={classes.root}>
      <Typography className={classes.heading} variant="h1" component="h1">
        {children}
      </Typography>
    </Box>
  );
};

export default PageTitle;
