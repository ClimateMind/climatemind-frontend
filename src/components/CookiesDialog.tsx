import React, { useState } from 'react';
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

export type CookiesDialogProps = {
  bgColor?: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
};

const CookiesDialog: React.FC = ({ children }) => {
  const [open, setOpen] = useState(true);

  const { hasAcceptedCookies, setHasAcceptedCookies } = useSession();

  const handleAccept = () => {
    setOpen(false);
    setHasAcceptedCookies(true);
  };

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <>
      {!hasAcceptedCookies && (
        <Dialog
          open={open}
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby="alert-accept-privacy-policy"
          aria-describedby="alert-accept-privacy-description"
        >
          <DialogTitle id="alert-accept-privacy-policy">
            Climate Mind Uses Cookies
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-accept-privacy-description">
              This site uses cookies. The to find out how we use cookies please
              view our <Link color="secondary"> Privacy Policy</Link>.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAccept}>Accept</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CookiesDialog;
