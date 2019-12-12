import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

const InfoDialog = ({ dialog, onDialogClose }) => {
  return (
    <Dialog
      dir="rtl"
      open={dialog.isOpen}
      onClose={onDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"خطأ"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialog.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose} color="primary">
          حسنا
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
