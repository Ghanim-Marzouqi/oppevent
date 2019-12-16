import React from "react";
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input
} from "@material-ui/core";

const NewEventDialog = props => {
  return (
    <div dir="rtl">
      <DialogTitle id="form-dialog-title">مهمة جديدة</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="عنوان المهمة"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogContent>
        <TextField
          id="standard-multiline-static"
          label="تفاصيل المهمة"
          multiline
          rows="4"
          fullWidth
        />
      </DialogContent>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <TextField
          style={{ width: "45%" }}
          id="standard-read-only-input"
          label="من"
          defaultValue="16/12/2019"
          InputProps={{
            readOnly: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          style={{ width: "45%" }}
          id="standard-read-only-input"
          label="إلى"
          defaultValue="16/12/2019"
          InputProps={{
            readOnly: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </DialogContent>
      <DialogContent>
        <Input type="file" />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onDialogClose} color="primary">
          إلغاء
        </Button>
        <Button color="primary">حفظ</Button>
      </DialogActions>
    </div>
  );
};

export default NewEventDialog;
