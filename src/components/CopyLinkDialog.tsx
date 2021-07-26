import React from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

export type CopyLinkDialogProps = {
  friend: string;
  link: string;
  open: boolean;
  onClose: () => void;
};

const CopyLinkDialog: React.FC<CopyLinkDialogProps> = ({
  friend,
  link,
  onClose,
  open,
}) => {
  const handleClick = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-copy-link-label"
      aria-describedby="alert-copy-link-description"
      maxWidth={'xs'}
    >
      <DialogContent data-testid="copy-link-dialog">
        <Typography variant="body1">Copy Link</Typography>
        <Typography variant="body1">Unique for {friend}</Typography>
        <Typography variant="body1">{link}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} data-testid="copy-link-button">
          Copy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CopyLinkDialog;
