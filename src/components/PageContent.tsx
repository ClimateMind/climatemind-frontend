import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import theme from '../common/styles/CMTheme';

const PageContent: React.FC = ({ children }) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        maxWidth: '640px',
      },
      spacer: theme.mixins.toolbar,
    })
  );

  const classes = useStyles(theme);

  return (
    <main className={classes.root}>
      {/* Space for app bar */}
      <div className={classes.spacer} />
      {children}
    </main>
  );
};

export default PageContent;
