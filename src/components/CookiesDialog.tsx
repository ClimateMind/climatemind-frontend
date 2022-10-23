import React, { useState } from 'react';
import { useSession } from '../hooks/useSession';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Link from '@material-ui/core/Link';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useHistory, useLocation } from 'react-router';
import DialogTitle from '@material-ui/core/DialogTitle';
import ROUTES from '../components/Router/RouteConfig';

export type CookiesDialogProps = {
  bgColor?: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
};

const CookiesDialog: React.FC = ({ children }) => {
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
          disableEscapeKeyDown
          aria-labelledby="alert-accept-privacy-policy"
          aria-describedby="alert-accept-privacy-description"
        >
          <DialogTitle id="alert-accept-privacy-policy">
            Climate Mind Uses Cookies
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-accept-privacy-description">
              This site uses cookies. To find out how we use cookies please view
              our{' '}
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
