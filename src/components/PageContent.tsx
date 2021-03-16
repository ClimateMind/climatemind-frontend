import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const PageContent: React.FC = ({ children }) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {},
    })
  );

  const classes = useStyles();

  return <main className={classes.root}>{children}</main>;
};

export default PageContent;
