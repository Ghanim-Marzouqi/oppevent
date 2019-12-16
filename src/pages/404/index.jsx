import React from "react";
import { useStyles } from "./404.style";
import { Link, withRouter } from "react-router-dom";
import Image404 from "../../resources/images/not_found.jpg";

const Page404 = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h2>لم يتم العثور على الصفحة المطلوبة</h2>
      <Link className={classes.link} to="/">
        الرجوع إلى القائمة الرئيسية
      </Link>
      <img src={Image404} alt="404" className={classes.bg} />
    </div>
  );
};

export default withRouter(Page404);
