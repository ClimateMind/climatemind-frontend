import { useState } from 'react';
import { Grid, Modal } from '@mui/material';

function getModalStyle() {
  return {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

export default function CMModal({
  onConfirm,
  handleClose,
  isOpen,
  disabled = false,
  children,
  confirmText = 'CONFIRM',
}: any) {
  const [modalStyle] = useState(getModalStyle);

  const isSm = false;

  return (
    <div style={{ zIndex: 9999999 }}>
      <Modal
        id="CMModal"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={{...modalStyle,
      position: 'absolute',
      width: isSm ? 250 : 400,
    }}>
          <div>{children}</div>

          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            spacing={2}
          >
            <Grid item>
              <button
                id="CancelButton"
                type="button"
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                }}
                onClick={handleClose}
              >
                CANCEL
              </button>
            </Grid>
            <Grid item>
              <button
                id="ConfirmButton"
                type="button"
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                }}
                onClick={onConfirm}
                disabled={disabled}
              >
                {confirmText}
              </button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
