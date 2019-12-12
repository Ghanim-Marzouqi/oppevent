import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

const EditEventDialog = props => {
  return (
    <React.Fragment>
      <DialogTitle id="form-dialog-title">تعديل مهمة مسجلة</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onDialogClose} color="primary">
          إلغاء
        </Button>
        <Button color="primary">حفظ</Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default EditEventDialog;
