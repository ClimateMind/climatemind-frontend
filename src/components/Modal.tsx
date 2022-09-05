import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Modal, useMediaQuery } from '@material-ui/core';
import theme from '../common/styles/CMTheme';

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
  const [modalStyle] = React.useState(getModalStyle);

  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: isSm ? 250 : 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modalButton: {
      border: 'none',
      backgroundColor: 'transparent',
      margin: theme.spacing(1),
      cursor: 'pointer',
    },
  }));

  const classes = useStyles();

  return (
    <div style={{ zIndex: 9999999 }}>
      <Modal
        id="CMModal"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
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
                className={classes.modalButton}
                onClick={handleClose}
              >
                CANCEL
              </button>
            </Grid>
            <Grid item>
              <button
                id="ConfirmButton"
                type="button"
                className={classes.modalButton}
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
