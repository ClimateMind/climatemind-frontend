import React from 'react';
import { Radio, RadioProps, withStyles } from '@material-ui/core';
import { COLORS } from '../common/styles/CMTheme';

const GreenRadio = withStyles({
  root: {
    color: COLORS.DK_TEXT,
    '&$checked': {
      color: COLORS.SECONDARY,
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

export default GreenRadio;
