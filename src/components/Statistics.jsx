import React from "react";
import { Grid } from "@material-ui/core";
import {
  Assignment,
  AssignmentTurnedIn,
  AssignmentLate,
  Email
} from "@material-ui/icons";
import StatisticsCard from "./StatisticsCard";

const Statistics = () => {
  return (
    <React.Fragment>
      <Grid item xs={12} md={8} lg={3}>
        <StatisticsCard title="مجموع المهام" count={12} icon={<Assignment />} />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <StatisticsCard
          title="المهام النشطة"
          count={12}
          icon={<AssignmentTurnedIn />}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <StatisticsCard
          title="المهام المحذوفة"
          count={12}
          icon={<AssignmentLate />}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <StatisticsCard title="مجموع الدعوات" count={12} icon={<Email />} />
      </Grid>
    </React.Fragment>
  );
};

export default Statistics;
