import React from "react";
import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";
import classes from "./NoDataFound.module.css";

export default function NoDataFound({ 
  text = "No Data Found", 
  className,
  icon = true,
  iconSize = 60,
  showSubText = false,
  subText = "Please check back later or contact support if the issue persists."
}) {
  return (
    <div className={`${classes.noDataFoundContainer} ${className || ""}`}>
      {icon && <ImSearch size={iconSize} color={"var(--secondary-color)"} />}
      <h3 className={classes.mainText}>{text}</h3>
      {showSubText && (
        <p className={classes.subText}>{subText}</p>
      )}
    </div>
  );
}

NoDataFound.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.bool,
  iconSize: PropTypes.number,
  showSubText: PropTypes.bool,
  subText: PropTypes.string,
};

NoDataFound.defaultProps = {
  text: "No Data Found",
  className: "",
  icon: true,
  iconSize: 60,
  showSubText: false,
  subText: "Please check back later or contact support if the issue persists.",
};
