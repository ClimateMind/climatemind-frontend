import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import theme from '../common/styles/CMTheme';

export type PageSectionProps = {
  bgColor?: string;
};

const PageSection: React.FC<PageSectionProps> = ({ children, bgColor }) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        backgroundColor: bgColor ? bgColor : 'inherit',
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
