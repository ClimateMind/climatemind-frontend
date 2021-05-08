import { makeStyles, Snackbar, Theme } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { TAlert } from '../types/Alert';
import { COLORS } from '../common/styles/CMTheme';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    '& .MuiAlert-root': {
      backgroundColor: (props: TAlert) => chooseAlertColor(props.type),
      color: COLORS.DK_TEXT,
      width: '80%',
      margin: '0 auto',
    },
  },
}));

const Toast: React.FC<TAlert> = ({ type, message }) => {
  const classes = useStyles({ type, message });
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      className={classes.root}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
