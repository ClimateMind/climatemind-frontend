import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CmTypography from 'shared/components/CmTypography';

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
        <CmTypography variant="h4" style={{ textAlign: 'left' }}>Copy Link</CmTypography>
        <CmTypography variant="body">Unique for {friend}</CmTypography>
        <CmTypography variant="body" style={{ fontWeight: 'bold', marginTop: 10 }}>{link}</CmTypography>
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
