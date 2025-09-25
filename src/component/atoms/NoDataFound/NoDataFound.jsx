import React from "react";
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
