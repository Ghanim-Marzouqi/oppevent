import React from "react";
import { Grid } from "@material-ui/core";
import { FaTasks, FaCogs, FaTrash, FaMailBulk } from "react-icons/fa";
import StatisticsCard from "./StatisticsCard";

const Statistics = ({ total, active, deleted, invitations }) => {
  const styles = {
    iconStyle: { fontSize: 45, color: "#fff" }
  };
  return (
    <React.Fragment>
      <Grid item xs={12} md={6} lg={3}>
        <StatisticsCard
          title="مجموع المهام"
          count={total}
          icon={<FaTasks style={styles.iconStyle} />}
          bgColor="#ff7675"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatisticsCard
          title="المهام النشطة"
          count={active}
          icon={<FaCogs style={styles.iconStyle} />}
          bgColor="#81ecec"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatisticsCard
          title="المهام المحذوفة"
          count={deleted}
          icon={<FaTrash style={styles.iconStyle} />}
          bgColor="#b2bec3"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatisticsCard
          title="مجموع الدعوات"
          count={invitations}
          icon={<FaMailBulk style={styles.iconStyle} />}
          bgColor="#fdcb6e"
        />
      </Grid>
    </React.Fragment>
  );
};

export default Statistics;
