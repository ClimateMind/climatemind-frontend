import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useSession } from '../hooks/useSession';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Link from '@material-ui/core/Link';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

export type PrivacyDialogProps = {
  bgColor?: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
};

const PrivacyDialog: React.FC = ({ children }) => {
  const styles = makeStyles({
    root: {},
  });

  const [open, setOpen] = useState(true);

  const {
    hasAcceptedPrivacyPolicy,
    setHasAcceptedPrivacyPolicy,
  } = useSession();

  const handleAccept = () => {
    setOpen(false);
    setHasAcceptedPrivacyPolicy(true);
  };

  const handleReject = () => {
    setOpen(false);
    setHasAcceptedPrivacyPolicy(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const classes = styles();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-accept-privacy-policy"
      aria-describedby="alert-accept-privacy-description"
    >
      <DialogTitle id="alert-accept-privacy-policy">
        Accept Climate Mind's Privacy Policy
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-accept-privacy-description">
          Climate mind uses location and tracking data to provide a better in
          app expreince. You're data is safe with us, we wont share it with
          anyone else. To find out more read our about how we use data read our{' '}
          <Link color="secondary">Privacy Policy</Link>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Disagree
        </Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrivacyDialog;
