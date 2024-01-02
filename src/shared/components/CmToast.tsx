import { FC } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { useMediaQuery } from '@mui/material';

interface Props {
  open: boolean;
  message: string;
  type: string;
  onClose: () => void;
}

const Alert: FC<AlertProps> = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

function CmToast({ open, message, type, onClose }: Props) {
  const isSmall = useMediaQuery('sm');

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{
        vertical: isSmall ? 'bottom' : 'top',
        horizontal: isSmall ? 'center' : 'right',
      }}
      style={{
        width: isSmall ? '100%' : 'auto',
        maxWidth: isSmall ? '100%' : '400px',
        marginBottom: isSmall ? '60px' : 'auto',
      }}
    >
      <div>
        <Alert
          onClose={onClose}
          severity={type as AlertColor}
          style={{
            backgroundColor: type === 'success' ? '#BDFADC' : '#ED7878',
            color: '#07373B',
          }}
        >
          {message}
        </Alert>
      </div>
    </Snackbar>
  );
}

export default CmToast;