import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Link from '@material-ui/core/Link';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useSession } from '../hooks/useSession';
import ROUTES from '../components/Router/RouteConfig';

type CookiesDialogProps = {
  onDecline: () => void;
  onAccept: () => void;
};

const CookiesDialog: React.FC<CookiesDialogProps> = ({
  onDecline,
  onAccept,
}) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const notPrivacyPage = pathname !== ROUTES.PRIVACY_PAGE;

  const { hasAcceptedCookies, setHasAcceptedCookies } = useSession();

  const handleAccept = () => {
    setOpen(false);
    setHasAcceptedCookies(true);
    onAccept();
  };

  const handleRejectAll = () => {
    setOpen(false);
    onDecline();
  };

  return (
    <>
      {!hasAcceptedCookies && notPrivacyPage && (
        <Dialog
          open={open}
          disableEscapeKeyDown
          aria-labelledby="alert-accept-privacy-policy"
          aria-describedby="alert-accept-privacy-description"
        >
          <DialogTitle id="alert-accept-privacy-policy">
            Climate Mind Uses Cookies
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-accept-privacy-description">
              This site requires cookies. To find out how we use cookies please
              view our{' '}
              <Link
                color="secondary"
                onClick={() => navigate(ROUTES.PRIVACY_PAGE)}
              >
                {' '}
                Privacy Policy
              </Link>
              .
            </DialogContentText>
            <Button style={{ float: 'left' }} onClick={handleRejectAll}>
              Decline
            </Button>
            <Button style={{ float: 'right' }} onClick={handleAccept}>
              Accept
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CookiesDialog;
