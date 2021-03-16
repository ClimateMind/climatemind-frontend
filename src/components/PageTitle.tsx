import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const PageTitle: React.FC = ({ children }) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        textAlign: 'center',
        width: '100%',
      },
    })
  );

  const classes = useStyles();

  return (
    <Box py={3} className={classes.root}>
      <Typography variant="h1">{children}</Typography>
    </Box>
  );
};

export default PageTitle;
