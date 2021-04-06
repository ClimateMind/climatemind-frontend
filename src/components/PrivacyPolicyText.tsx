import React from 'react';
import { makeStyles } from '@material-ui/core';
import { COLORS } from '../common/styles/CMTheme';
import ReactMarkdown from 'react-markdown';
import markdown from '../PrivacyPolicy';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    maxWidth: '100%',
    color: COLORS.DK_TEXT,
    fontFamily: 'Bilo',
    '& h1': {
      fontFamily: 'atten-round-new',
      fontSize: '48px',
      fontWeight: 900,
    },
    '& h2': {
      fontSize: '32px',
      fontWeight: 900,
    },
    '& h3': {
      fontFamily: 'atten-round-new',
      fontSize: '32px',
      fontWeight: 900,
    },
    '& h4': {
      fontSize: '24px',
      fontWeight: 900,
      letterSpacing: '1.6pt',
    },
    '& a, a:active, a:visited': {
      color: COLORS.SUCCESS,
    },
  },
});

const PrivacyPolicyText = () => {
  const classes = styles();

  return (
    <div className={classes.root} data-testid="PrivacyPolicyText">
      {/* Add Policy here */}
      <ReactMarkdown className={classes.root} children={markdown} />
    </div>
  );
};

export default PrivacyPolicyText;
