import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, CardMedia } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    height: 100
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto",
    width: 160
  },
  cover: {
    width: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const StatisticsCard = ({ title, count, icon }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="h6" color="textSecondary">
            {count}
          </Typography>
        </CardContent>
      </div>
      {/* <div className={classes.cover}>{icon}</div> */}
      <CardMedia className={classes.cover} image={icon} />
    </Card>
  );
};

export default StatisticsCard;
