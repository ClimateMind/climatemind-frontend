import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import theme from '../common/styles/CMTheme';

type Props = {
  children?: React.ReactNode;
};

const PageContent: React.FC<Props> = ({ children }) => {
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
    <section className={classes.root}>
      {/* Spacer for app bar */}
      <div className={classes.spacer} />
      {children}
    </section>
  );
};

export default PageContent;
