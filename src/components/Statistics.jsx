import React from "react";
import { Grid } from "@material-ui/core";
import StatisticsCard from "./StatisticsCard";

const Statistics = () => {
  const icons = [
    "/image/total_events.png",
    "/image/active_events.png",
    "/image/deleted_events.jpg",
    "/image/invitations.jpg"
  ];
  return (
    <React.Fragment>
      <Grid item xs={12} md={6} lg={3}>
        <StatisticsCard
          title="مجموع المهام"
          count={12}
          icon="/images/total_events.jpg"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatisticsCard
          title="المهام النشطة"
          count={12}
          icon="/images/active_events.jpg"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatisticsCard
          title="المهام المحذوفة"
          count={12}
          icon="/images/deleted_events.jpg"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatisticsCard
          title="مجموع الدعوات"
          count={12}
          icon="/images/invitations.jpg"
        />
      </Grid>
    </React.Fragment>
  );
};

export default Statistics;
