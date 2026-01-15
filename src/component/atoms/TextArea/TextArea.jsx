import React from "react";
import classes from "./TextArea.module.css";
import PropTypes from "prop-types";

export function TextArea({
  value,
  setter,
  label,
  placeholder,
  customStyle,
  labelStyle,
  rows = 3,
  className = "",
  containerClass = "",
  disabled,
  labelClass,
  errorText,
}) {
  return (
    <div className={[classes.textAreaBox, containerClass,classes?.error].join(" ")}>
      {label && (
        <label
          style={{ ...labelStyle }}
          className={`${[
            disabled && classes.labelDisabled,
            classes.label,
            labelClass,
          ].join(" ")}`}
        >
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        style={{ ...customStyle }}
        onChange={(e) => {
          setter(e.target.value);
        }}
        // onBlur={() => {
        //   setter(value?.trim());
        // }}
        className={`${className} ${errorText && classes.borderError}`}
        rows={rows}
        disabled={disabled}
      />
      {errorText && (
        <p
          className={`mt-1 ${[classes.errorText].join(" ")}`}
        >{`*${errorText}`}</p>
      )}
    </div>
  );
}
TextArea.propTypes = {
  value: PropTypes.string,
  setter: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  customStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  rows: PropTypes.number,
  className: PropTypes.string,
  containerClass: PropTypes.string,
  disabled: PropTypes.bool,
  labelClass: PropTypes.string,
  errorText: PropTypes.string,
};

TextArea.defaultProps = {
  rows: 3,
  className: "",
  containerClass: "",
  disabled: false,
  labelClass: "",
  errorText: "",
};
