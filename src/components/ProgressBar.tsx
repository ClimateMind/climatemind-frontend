import { withStyles, LinearProgressProps } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { COLORS } from '../common/styles/CMTheme';

const CMProgress = withStyles({
  colorPrimary: {
    backgroundColor: COLORS.DEEP_PURPLE,
  },
  bar: {
    backgroundColor: COLORS.DK_TEXT,
  },
})((props: LinearProgressProps) => <LinearProgress {...props} />);

export default CMProgress;
