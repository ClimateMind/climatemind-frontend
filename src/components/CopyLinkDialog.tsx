import React, { useState } from 'react';
import { makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
      <DialogTitle id="alert-accept-privacy-policy">
        Climate Mind 
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-accept-privacy-description">
          This site uses cookies. To find out how we use cookies please view
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick}>Copy</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CopyLinkDialog;
