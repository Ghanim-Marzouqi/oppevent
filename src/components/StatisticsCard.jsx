import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, CardMedia } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    height: 100,
    width: "100%"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "70%"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdcb6e"
  }
}));

const StatisticsCard = ({ title, count, icon, bgColor }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary">
            {title}
          </Typography>
          <Typography variant="h6">{count}</Typography>
        </CardContent>
      </div>
      {/* <div className={classes.cover}>{icon}</div> */}
      <div className={classes.cover} style={{ backgroundColor: bgColor }}>
        {icon}
      </div>
    </Card>
  );
};

export default StatisticsCard;
