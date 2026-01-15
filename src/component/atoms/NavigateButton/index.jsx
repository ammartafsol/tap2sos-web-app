import React from "react";
import PropTypes from "prop-types";
import classes from "./NavigateButton.module.css";
import { BsArrowDown } from "react-icons/bs";

const NavigateButton = ({ color }) => {
  return (
    <div className={classes.downBtn}>
      <span>
        <BsArrowDown color={color} size={30} />
      </span>
    </div>
  );
};

NavigateButton.propTypes = {
  color: PropTypes.string,
};

NavigateButton.defaultProps = {
  color: undefined,
};

export default NavigateButton;
