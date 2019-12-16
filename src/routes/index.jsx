import React from "react";
import { Switch, Route } from "react-router-dom";

// pages
import LoginPage from "../pages/Login";
import EventPage from "../pages/Event";
import ForgetPasswordPage from "../pages/ForgetPassword";
import Page404 from "../pages/404";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path="/event" exact component={EventPage} />
      <Route path="/forget-password" exact component={ForgetPasswordPage} />
      <Route component={Page404} />
    </Switch>
  );
};

export default Routes;
