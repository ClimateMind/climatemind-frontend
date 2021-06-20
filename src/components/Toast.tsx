import { makeStyles, Snackbar, Theme, useMediaQuery } from '@material-ui/core';
import { Alert, AlertProps } from '@material-ui/lab';
import React, { useState } from 'react';
import { TAlert } from '../types/Alert';
import { COLORS } from '../common/styles/CMTheme';
import theme from '../common/styles/CMTheme';

function CMAlert(props: AlertProps) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

function chooseAlertColor(type: string) {
  switch (type) {
    case 'success':
      return COLORS.SUCCESS_LIGHT2;
    case 'error':
      return COLORS.WARNING;
    case 'info':
      return COLORS.INFO;
    default:
      return COLORS.INFO;
  }
}

type StyleProps = {
  type: string;
  message: string;
  isXS: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // Different alert styling for XS and larger screens
    width: (props: StyleProps) => (props.isXS ? '100%' : 'auto'),
    maxWidth: (props: StyleProps) => (props.isXS ? '100%' : '400px'),
    marginBottom: (props: StyleProps) => (props.isXS ? '60px' : 'auto'),
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    '& .MuiAlert-root': {
      backgroundColor: (props: StyleProps) => chooseAlertColor(props.type),
      color: COLORS.DK_TEXT,
      width: '80%',
      margin: '0 auto',
    },
  },
}));

const Toast: React.FC<TAlert> = ({ type, message }) => {
  const isXS = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles({ type, message, isXS });
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      className={classes.root}
      anchorOrigin={{
        // Alert is anchored differently depending on screen size
        vertical: isXS ? 'bottom' : 'top',
        horizontal: isXS ? 'center' : 'right',
      }}
      open={open}
      autoHideDuration={1800}
      onClose={handleClose}
    >
      <CMAlert onClose={handleClose} severity={type}>
        {message}
      </CMAlert>
    </Snackbar>
  );
};

export default Toast;
