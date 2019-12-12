import React from "react";
import { Switch, Route } from "react-router-dom";

// pages
import LoginPage from "../pages/Login";
import EventPage from "../pages/Event";
import ForgetPasswordPage from "../pages/ForgetPassword";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path="/event" exact component={EventPage} />
      <Route path="/forget-password" exact component={ForgetPasswordPage} />
    </Switch>
  );
};

export default Routes;
