import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import ROUTES from '../components/Router/RouteConfig';
import { useSession } from '../hooks/useSession';

export type CookiesDialogProps = {
  bgColor?: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
};

const CookiesDialog: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { push } = useHistory();
  const { pathname } = useLocation();

  const notPrivacyPage = pathname !== ROUTES.ROUTE_PRIVACY;

  const { hasAcceptedCookies, setHasAcceptedCookies } = useSession();

  const handleAccept = () => {
    setOpen(false);
    setHasAcceptedCookies(true);
  };

  return (
    <>
      {!hasAcceptedCookies && notPrivacyPage && (
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
              This site uses cookies. To find out how we use cookies
              please view our{' '}
              <Link
                color="secondary"
                onClick={() => push(ROUTES.ROUTE_PRIVACY)}
              >
                {' '}
                Privacy Policy
              </Link>
              .
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
