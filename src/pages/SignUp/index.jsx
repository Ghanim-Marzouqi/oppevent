import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useStyles } from "./signup.style";
import "./signup.css";
import {
  Grid,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Box,
  Paper
} from "@material-ui/core";
import Copyright from "../../components/Copyright";
import Logo from "../../resources/images/logo.png";
import InfoDialog from "../../components/InfoDialog";

import { createUser } from "../../services/API";

const SignUpPage = () => {
  // load page styles
  const classes = useStyles();

  // initail form data
  let initialForm = {
    username: "",
    password: "",
    name: "",
    email: "",
    department: "",
    isFormSubmitted: false
  };

  const [form, setForm] = useState(initialForm);
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: ""
  });

  const handleSubmit = async e => {
    e.preventDefault();

    setForm({
      ...form,
      isFormSubmitted: true
    });

    if (
      form.username !== "" &&
      form.password !== "" &&
      form.name !== "" &&
      form.email !== "" &&
      form.department !== ""
    ) {
      // create user
      const user = await createUser(
        form.username,
        form.password,
        form.name,
        form.email,
        form.department
      );

      console.log(user);

      // check if user created
      if (user !== null) {
        setDialog({
          isOpen: true,
          title: "ملاحظة",
          message: "تم تسجيل المستخدم بنجاح"
        });
      } else {
        setDialog({
          isOpen: true,
          title: "حدث خطأ",
          message: "حدث خطأ اثناء تسجيل مستخدم جديد"
        });
      }
    }
  };

  const handleDialogClose = e => {
    e.preventDefault();
    setDialog({
      ...dialog,
      isOpen: false
    });
  };

  return (
    <div>
      <Grid dir="rtl" container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <img src={Logo} alt="OPP Logo" height={100} />
            <Typography
              className={classes.textField}
              component="h1"
              variant="h5"
            >
              مهامي
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="name"
                label="الأسم"
                name="name"
                autoComplete="name"
                autoFocus
                value={form.name || ""}
                error={form.name === "" && form.isFormSubmitted}
                helperText={form.name === "" ? "الرجاء ادخال الأسم" : " "}
                onChange={e => {
                  setForm({ ...form, name: e.target.value });
                }}
              />
              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="username"
                label="اسم المستخدم"
                name="username"
                autoComplete="username"
                value={form.username || ""}
                error={form.username === "" && form.isFormSubmitted}
                helperText={
                  form.username === "" ? "الرجاء ادخال اسم المستخدم" : " "
                }
                onChange={e => {
                  setForm({ ...form, username: e.target.value });
                }}
              />
              <TextField
                classes={classes.textfield}
                variant="standard"
                margin="normal"
                fullWidth
                name="password"
                label="كلمة المرور"
                type="password"
                id="password"
                autoComplete="current-password"
                value={form.password || ""}
                error={form.password === "" && form.isFormSubmitted}
                helperText={
                  form.password === "" ? "الرجاء ادخال كلمة المرور" : " "
                }
                onChange={e => {
                  setForm({ ...form, password: e.target.value });
                }}
              />
              <TextField
                classes={classes.textfield}
                variant="standard"
                margin="normal"
                fullWidth
                name="email"
                label="الأيميل"
                type="email"
                id="email"
                autoComplete="email"
                value={form.email || ""}
                error={form.email === "" && form.isFormSubmitted}
                helperText={form.email === "" ? "الرجاء ادخال الأيميل" : " "}
                onChange={e => {
                  setForm({ ...form, email: e.target.value });
                }}
              />
              <TextField
                classes={classes.textfield}
                variant="standard"
                margin="normal"
                fullWidth
                name="department"
                label="الفرع"
                id="department"
                autoComplete="department"
                value={form.department || ""}
                error={form.department === "" && form.isFormSubmitted}
                helperText={form.department === "" ? "الرجاء ادخال الفرع" : " "}
                onChange={e => {
                  setForm({ ...form, department: e.target.value });
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={
                  form.username === "" ||
                  form.password === "" ||
                  form.name === "" ||
                  form.email === "" ||
                  form.department === ""
                }
              >
                تسجيل مستخدم جديد
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Link className={classes.textField} to="/">
                    الرجوع إلى القائمة الرئيسية
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Grid>
      <InfoDialog dialog={dialog} onDialogClose={handleDialogClose} />
    </div>
  );
};

export default withRouter(SignUpPage);
