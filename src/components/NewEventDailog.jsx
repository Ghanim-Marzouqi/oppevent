import React from "react";
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";

const NewEventDialog = props => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
        <DialogContent style={classes.dateContainer}>
          <TextField
            style={classes.dateField}
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
            style={classes.dateField}
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
          <input type="file" multiple />
        </DialogContent>
        <DialogContent dir="ltr" style={classes.dateContainer}>
          <KeyboardTimePicker
            style={classes.dateField}
            margin="normal"
            id="time-picker"
            label="Time picker"
            KeyboardButtonProps={{
              "aria-label": "تغيير الوقت"
            }}
          />
          <KeyboardTimePicker
            style={classes.dateField}
            margin="normal"
            id="time-picker"
            label="Time picker"
            KeyboardButtonProps={{
              "aria-label": "تغيير الوقت"
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onDialogClose} color="primary">
            إلغاء
          </Button>
          <Button color="primary">حفظ</Button>
        </DialogActions>
      </div>
    </MuiPickersUtilsProvider>
  );
};

const classes = {
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dateField: { width: "45%" }
};

export default NewEventDialog;
