"use client";
import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.css";

// Variants
const Button = ({
  label,
  customStyle,
  onClick,
  disabled = false,
  children,
  leftIcon,
  rightIcon,
  className = "",
  variant,
  type,
  ...props
}) => {
  return (
    <button
      type={type}
      style={{ ...customStyle, border: "none" }}
      onClick={onClick}
      disabled={disabled}
      data-color-variant={variant}
      className={` ${classes.btn} ${className} `}
      {...props}
    >
      {leftIcon}
      {label && <label>{label}</label>}

      {children}
      {rightIcon}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  customStyle: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

Button.defaultProps = {
  label: "",
  customStyle: {},
  onClick: undefined,
  disabled: false,
  children: null,
  leftIcon: null,
  rightIcon: null,
  className: "",
  variant: undefined,
  type: "button",
};

export default Button;
