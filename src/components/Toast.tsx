import { useState } from 'react';
import { Alert, AlertProps, Snackbar } from '@mui/material';
import { TAlert } from '../types/Alert';

function CMAlert(props: AlertProps) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

// function chooseAlertColor(type: string) {
//   switch (type) {
//     case 'success':
//       return COLORS.SUCCESS_LIGHT2;
//     case 'error':
//       return COLORS.WARNING;
//     case 'info':
//       return COLORS.INFO;
//     default:
//       return COLORS.INFO;
//   }
// }

const Toast: React.FC<TAlert> = ({ type, message }) => {
  const isXS = false;
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      style={{
        width: isXS ? '100%' : 'auto',
        maxWidth: isXS ? '100%' : '400px',
        marginBottom: isXS ? '60px' : 'auto',
      }}
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
