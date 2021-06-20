import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import theme from '../common/styles/CMTheme';

const PageSection: React.FC = ({ children }) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        maxWidth: '640px',
        paddingBottom: '60px',
      },
      spacer: theme.mixins.toolbar,
    })
  );

  const classes = useStyles(theme);

  return (
    <main className={classes.root}>
      {/* Spacer for app bar */}
      <div className={classes.spacer} />
      {children}
    </main>
  );
};

export default PageSection;
