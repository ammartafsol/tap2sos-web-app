import PropTypes from "prop-types";
import React from "react";
import classes from "./Newsletter.module.css";

const Newsletter = ({ data }) => {
  return (
    <div className={classes.newsletterMain}>
      <div className={classes.topHead}>
        <h2>{data?.title}</h2>
        <p>{data?.description}</p>
      </div>
    </div>
  );
};

Newsletter.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Newsletter;
