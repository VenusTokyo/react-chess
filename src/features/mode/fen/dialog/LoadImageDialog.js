'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch, useSelector } from 'react-redux';
import * as fenMode from 'features/mode/fenModeSlice';
import styles from 'styles/dialog';

export default function LoadImageDialog() {
  const state = useSelector(state => state.fenMode);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(fenMode.loadImageDialog({ open: false }))
  };

  return (
    <div>
      <Dialog
        sx={styles.dialog}
        open={state.dialogs.loadImage.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText sx={{ pb: 1 }} id="alert-dialog-description">
            Soon available, please be patient!
          </DialogContentText>
          <input accept=".jpeg,.jpg,.png,.gif" type="file" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
