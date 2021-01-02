import React from 'react';
import { Button, ButtonProps, withStyles } from '@material-ui/core';

const CMButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: '#39F5AD',
    },
    '&:active': {
      backgroundColor: 'red',
    },
  },
})((props: ButtonProps) => <Button {...props} />);

export default CMButton;
