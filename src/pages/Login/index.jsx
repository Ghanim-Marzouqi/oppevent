import React, { useState, useEffect, useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { useStyles } from "./login.style";
import "./login.css";
import {
  Grid,
  CssBaseline,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Box,
  Paper
} from "@material-ui/core";
import Copyright from "../../components/Copyright";
import Logo from "../../resources/images/logo.png";
import InfoDialog from "../../components/InfoDialog";

import history from "../../services/history";

import { authenticateUser, getUpdatedEvents } from "../../services/API";

// contexts
import UserContext from "../../context/UserContext";
import EventContext from "../../context/EventContext";

const LoginPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { setEvents } = useContext(EventContext);
  const classes = useStyles();

  // initail form data
  let initialForm = {
    username: "",
    password: "",
    authType: "db",
    isFormSubmitted: false
  };

  const [form, setForm] = useState(initialForm);
  const [dialog, setDialog] = useState({
    isOpen: false,
    message: ""
  });

  useEffect(() => {
    // check if user available
    if (user !== null) {
      console.log(user);
      console.log("Navigate into Events Page");
    } else {
      console.log("User is not logged in");
    }
  }, [user]);

  const handleSubmit = async e => {
    e.preventDefault();

    setForm({
      ...form,
      isFormSubmitted: true
    });

    if (form.username === "" && form.password === "") {
      try {
        const user = await authenticateUser(
          form.username,
          form.password,
          form.authType
        );

        if (user !== null) {
          setUser(user);
          setEvents(getUpdatedEvents(user.username));

          console.log("user authenticated");
        } else {
          setDialog({
            isOpen: true,
            message: "اسم المستخدم او كلمة المرور غير صحيحة"
          });
        }
      } catch (error) {
        setDialog({
          isOpen: true,
          message: error
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

  return user !== null ? (
    <Redirect to={{ pathname: "/event" }} />
  ) : (
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
                id="username"
                label="اسم المستخدم"
                name="username"
                autoComplete="username"
                autoFocus
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
              <FormControlLabel
                classes={classes.textfield}
                control={<Checkbox value="remember" color="primary" />}
                label="تذكرني"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={form.username === "" || form.password === ""}
              >
                تسجيل الدخول
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    className={classes.textfield}
                    href="/forget-password"
                    variant="body2"
                  >
                    هل نسيت كلمة المرور؟
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

export default withRouter(LoginPage);
