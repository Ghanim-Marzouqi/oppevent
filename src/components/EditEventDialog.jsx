import React from "react";
import moment from "moment";
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  Grid,
  FormGroup,
  FormControlLabel
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "@material-ui/pickers";
import { useTheme } from "@material-ui/core/styles";
import { FaEdit } from "react-icons/fa";
import "./components.css";

const EditEventDialog = props => {
  // theme direction for arabic time picker support
  const theme = useTheme();
  const rtl = theme.direction === "rtl";

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div dir="rtl">
        <DialogTitle id="form-dialog-title">
          <Grid container justify="space-around" spacing={2}>
            <Grid item xs={10}>
              مهمة مسجلة
            </Grid>
            <Grid item xs={2}>
              <Button color="default" onClick={props.onEditToggle}>
                <FaEdit style={{ color: "#ff0000", fontSize: 20 }} />
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="title"
            name="title"
            label="عنوان المهمة"
            type="text"
            fullWidth
            autoFocus
            margin="dense"
            value={props.event.title || ""}
            disabled={!props.event.isFormEditted}
            onChange={e => props.onInputChange(e)}
            error={props.event.desc === "" && props.event.isFormSubmitted}
            helperText={
              props.event.title === "" ? "الرجاء ادخال عنوان المهمة" : " "
            }
          />
        </DialogContent>
        <DialogContent>
          <TextField
            id="desc"
            name="desc"
            label="تفاصيل المهمة"
            multiline
            rows="4"
            fullWidth
            value={props.event.desc || ""}
            disabled={!props.event.isFormEditted}
            onChange={e => props.onInputChange(e)}
            error={props.event.desc === "" && props.event.isFormSubmitted}
            helperText={
              props.event.desc === "" ? "الرجاء ادخال تفاصيل المهمة" : " "
            }
          />
        </DialogContent>
        {!props.event.isFormEditted ? (
          <DialogContent>
            <Grid container justify="space-around" spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="startDate"
                  name="startDate"
                  label="من"
                  value={moment(props.event.start).format("DD/MM/YYYY")}
                  InputProps={{
                    readOnly: true
                  }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="endDate"
                  name="endDate"
                  label="إلى"
                  value={moment(props.event.end).format("DD/MM/YYYY")}
                  InputProps={{
                    readOnly: true
                  }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
        ) : (
          <DialogContent>
            <Grid container justify="space-around" spacing={2}>
              <Grid item xs={6}>
                <DatePicker
                  disablePast
                  openTo="year"
                  format="dd/MM/yyyy"
                  label="Date of birth"
                  views={["year", "month", "date"]}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  disablePast
                  openTo="year"
                  format="dd/MM/yyyy"
                  label="Date of birth"
                  views={["year", "month", "date"]}
                />
              </Grid>
            </Grid>
          </DialogContent>
        )}
        {props.event.isFormEditted ? (
          <DialogContent>
            <label htmlFor="file">إرفاق ملف:</label>{" "}
            <input
              type="file"
              name="file"
              onChange={e => props.onInputChange(e)}
            />
          </DialogContent>
        ) : (
          <></>
        )}
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                id="checkbox"
                name="allDay"
                checked={props.event.allDay === 1 ? true : false}
                disabled={!props.event.isFormEditted}
                onChange={e => props.onInputChange(e)}
              />
            }
            label="اليوم بأكمله"
          />
        </DialogContent>
        {props.event.allDay === 0 ? (
          <DialogContent>
            <Grid container justify="space-around" spacing={2}>
              <Grid
                item
                container
                xs={6}
                justify="center"
                alignItems="flex-end"
                direction={rtl ? "row-reverse" : "row"}
              >
                <TimePicker
                  label="من"
                  okLabel="حفظ"
                  cancelLabel="إلغاء"
                  minutesStep={1}
                  value={props.event.start}
                  disabled={!props.event.isFormEditted}
                  onChange={props.onStartTimePickerChange}
                />
              </Grid>
              <Grid
                item
                container
                xs={6}
                justify="center"
                alignItems="flex-end"
                direction={rtl ? "row-reverse" : "rtl"}
              >
                <TimePicker
                  label="إلى"
                  okLabel="حفظ"
                  cancelLabel="إلغاء"
                  minutesStep={1}
                  value={props.event.end}
                  disabled={!props.event.isFormEditted}
                  onChange={props.onEndTimePickerChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
        ) : (
          <></>
        )}
        <DialogContent>
          صلاحيات المهمة
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  id="view"
                  name="canView"
                  checked={props.event.canView === 1 ? true : false}
                  disabled={!props.event.isFormEditted}
                  onChange={e => props.onInputChange(e)}
                />
              }
              label="عرض"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="delete"
                  name="canDelete"
                  checked={props.event.canDelete === 1 ? true : false}
                  disabled={!props.event.isFormEditted}
                  onChange={e => props.onInputChange(e)}
                />
              }
              label="حذف"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="update"
                  name="canUpdate"
                  checked={props.event.canUpdate === 1 ? true : false}
                  disabled={!props.event.isFormEditted}
                  onChange={e => props.onInputChange(e)}
                />
              }
              label="تعديل"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!props.event.isFormEditted}
            color="primary"
            onClick={props.onSubmit}
          >
            حفظ
          </Button>
          <Button onClick={props.onDialogClose} color="primary">
            {props.event.isFormEditted ? "إلغاء" : "إغلاق"}
          </Button>
        </DialogActions>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default EditEventDialog;
