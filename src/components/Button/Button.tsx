import React from 'react';
import { Button, ButtonProps, withStyles } from '@material-ui/core';
import { COLORS } from '../../common/styles/CMTheme';

export const CMButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: COLORS.SUCCESS_LIGHT2,
    },
    '&:FOCUS': {
      backgroundColor: COLORS.SECONDARY,
    },
    '&:ACTIVE': {
      backgroundColor: COLORS.PRIMARY,
    },
    '& .MuiTouchRipple-ripple': {
      // TODO - MuiTouchRipple API - give the button ripple the correct color
    },
    '&.Mui-disabled': {
      backgroundColor: COLORS.PRIMARY,
      color: COLORS.ICON_LIGHT,
      border: `1px solid ${COLORS.ICON_LIGHT}`,
    },
  },
})((props: ButtonProps) => <Button {...props} />);

export default CMButton;
