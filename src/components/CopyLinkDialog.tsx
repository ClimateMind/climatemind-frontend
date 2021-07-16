import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export type CopyLinkDialogProps = {
  friend: string;
  open: boolean;
  onClose: () => void;
};

type StyleProps = {
  type?: string;
  message?: string;
  isXS?: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
   
    },
  paper: { maxWidth: "300px" },
}));

const CopyLinkDialog: React.FC<CopyLinkDialogProps> = ({friend, onClose, open}) => {
  const classes = useStyles({  });

  const handleClick = () => {
    console.log('sholud close modal');
    onClose();
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-accept-privacy-policy"
      aria-describedby="alert-accept-privacy-description"
      maxWidth={'xs'}
    >
      <DialogContent>
        <DialogContentText data-testid="copy-link-description">
          <Typography variant="body1">
            Copy Link
          </Typography>
          <Typography variant="body1">
            Unique for {friend}
          </Typography>
          <Typography variant="body1">
            https://app.climatemind.org/share 
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick}>Copy</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CopyLinkDialog;
