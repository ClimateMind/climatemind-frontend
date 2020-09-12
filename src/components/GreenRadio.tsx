import React from 'react';
import { Radio, RadioProps, withStyles } from '@material-ui/core';

const GreenRadio = withStyles({
  root: {
    color: '#39F5AD',
    '&$checked': {
      color: '#39F5AD',
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

export default GreenRadio;
