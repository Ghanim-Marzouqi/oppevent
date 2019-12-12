import React from "react";
import { Typography } from "@material-ui/core";

const Copyright = () => {
  return (
    <Typography dir="ltr" variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <label>كل الحقوق محفوظة لدى الأدعاء العام</label>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
};

export default Copyright;
