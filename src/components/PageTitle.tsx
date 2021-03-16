import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const PageTitle: React.FC = ({ children }) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        textAlign: 'center',
      },
    })
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1">{children};</Typography>
    </div>
  );
};

export default PageTitle;
