import { Dialog, DialogActions, DialogContent } from '@mui/material';

import { CmButton, CmTypography } from 'shared/components';

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
        <CmButton text='Copy' variant='text' onClick={handleClick}/>
      </DialogActions>
    </Dialog>
  );
};

export default CopyLinkDialog;
