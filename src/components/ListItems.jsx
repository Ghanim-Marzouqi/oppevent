import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Home, ListAlt, ExitToApp } from "@material-ui/icons";
import history from "../services/history";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="الصفحة الرئيسية" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ListAlt />
      </ListItemIcon>
      <ListItemText primary="التقارير" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button onClick={() => history.goBack()}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="تسجيل الخروج" />
    </ListItem>
  </div>
);
