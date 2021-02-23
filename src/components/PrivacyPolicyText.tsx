import React from 'react';
import { makeStyles } from '@material-ui/core';
import { COLORS } from '../common/styles/CMTheme';
import ReactMarkdown from 'react-markdown';
import markdown from './markdown';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    maxWidth: '100%',
    '& h3': {
      color: COLORS.DK_TEXT,
      margin: '0.6em 0',
    },
    '& h4': {
      color: COLORS.DK_TEXT,
      margin: '1em 0 0.4em',
    },
    '& li': {
      color: COLORS.DK_TEXT,
      paddingBottom: '.5em',
    },
  },
});

const PrivacyPolicyText = () => {
  const classes = styles();

  return (
    <div className={classes.root} data-testid="PrivacyPolicyText">
      {/* Add Policy here */}
      <ReactMarkdown children={markdown} />
    </div>
  );
};

export default PrivacyPolicyText;
