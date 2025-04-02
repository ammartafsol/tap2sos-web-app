"use client";
import React from "react";
import ReactSelect, { components } from "react-select";
import classes from "./DropDown.module.css";
import PropTypes from "prop-types";
import {
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowDropUpLine, RiArrowUpSLine } from "react-icons/ri";
import { mergeClass } from "../../../resources/utils/helper";

const CustomOption = (props) => {
  const { data, isSelected, imageClass, optionClass, isCheckbox } = props;

  return (
    <components.Option {...props}>
      <div className={mergeClass(classes.optionContainer, optionClass)}>
        {/* {isCheckbox ? (
          <input
            type="checkbox"
            checked={isSelected}
            readOnly
            className={classes.checkbox}
          />
        ) : data?.image ? (
          <div className={mergeClass(classes.imageDiv, imageClass)}>
            <Image
              src={data.image}
              alt={data.label}
              fill
              className={classes.image}
            />
          </div>
        ) : null} */}
        {data?.image ? (
          <div className={mergeClass(classes.imageDiv, imageClass)}>
            <img
              src={data.image}
              alt={data.label}
              fill
              className={classes.image}
            />
          </div>
        ) : (
          // <input
          //   type="checkbox"
          //   checked={isSelected}
          //   readOnly
          //   className={classes.checkbox}
          // />
          <></>
        )}
        <label className={classes.optionLabel}>{data.label}</label>
      </div>
    </components.Option>
  );
};
const DropDown = ({
  menuPlacement = "auto",
  options,
  label,
  customStyle,
  disabled,
  value,
  setValue,
  isCheckbox = true,
  placeholder,
  isMulti,
  style,
  leftIcon,
  Components,
  labelClassName,
  indicatorColor = "var(--secondary-clr)",
  optionLabel,
  optionValue,
  selectRef,
  isSearchable = true,
  borderRadius = "5px",
  classNamePrefix,
  customContainerClass,
  variant = "",
  customContainerStyle,
  inputClass,
  iconClass,
  errorText,
  imageClass,
  optionClass,
  isShadow = false,
  ...props
}) => {
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {props.isFocused ? (
          isShadow ? (
            <MdOutlineKeyboardArrowUp
              style={{
                border: "1px solid #E5E9EB",

                borderRadius: "5px",
                boxShadow: "0px 0px 8px 0px rgba(140, 189, 140, 0.48)",
              }}
              size={30}
              color={"black"}
            />
          ) : (
            <MdOutlineArrowDropUp size={30} color={indicatorColor} />
          )
        ) : isShadow ? (
          <IoIosArrowDown
            style={{
              border: "1px solid #E5E9EB",
              borderRadius: "5px",
              boxShadow: "0px 0px 8px 0px rgba(140, 189, 140, 0.48)",
            }}
            size={25}
            color={"black"}
          />
        ) : (
          <MdOutlineArrowDropDown size={30} color={indicatorColor} />
        )}
      </components.DropdownIndicator>
    );
  };

  const dropDownStyle = {
    control: (base, { isDisabled }) => ({
      ...base,
      backgroundColor: isDisabled
        ? "var(--disabled-input-clr)"
        : variant === "dashboard"
        ? "var(--dashboard-input-bg-clr)"
        : "var(--white-clr)",
      borderRadius,
      color: "var(--input-border-color)",
      boxShadow: "none",
      fontFamily: "var(--poppins)",
      fontSize: 16,
      cursor: "pointer",
      border: `1px solid ${errorText ? "red" : "#D1D5DB"}`,
      ...customStyle,
      ":hover": {
        ...base[":hover"],
        borderColor: errorText ? "red" : "var(--border-color)",
      },
    }),

    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--heading-sub-gray)",
      fontFamily: "var(--plusJakartaSans)",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "24px",
      opacity: 0.5,
    }),

    option: (base, { isSelected }) => ({
      ...base,
      padding: "8px 12px",
      backgroundColor: isSelected ? "var(--white-color)" : null,
      color: isSelected ? "var(--black-color)" : "var(--black-color)",
      ":hover": {
        ...base[":hover"],
        backgroundColor: "var(--light-gray-v5)",
        cursor: "pointer",
      },
    }),
  };

  return (
    <div className={`${classes.Container}`} data-variant={variant}>
      {label && (
        <label
          htmlFor={`dropdown${label}`}
          className={`${[
            classes.label,
            labelClassName,
            disabled && classes.disabled,
          ].join(" ")}`}
        >
          {label}
        </label>
      )}

      <div
        className={`${classes.dropdownContainer} ${customContainerClass}`}
        style={{ ...customContainerStyle }}
      >
        <ReactSelect
          // menuIsOpen={true}
          menuPlacement={menuPlacement}
          inputId={`dropdown${label}`}
          value={value}
          onChange={(e) => setValue(e)}
          className={`${classes.reactSelect} ${inputClass}`}
          isMulti={isMulti}
          isDisabled={disabled}
          placeholder={placeholder}
          options={options}
          styles={{ ...dropDownStyle, ...style }}
          isClearable={false}
          isSearchable={isSearchable}
          classNamePrefix={`DropdownOptionContainer ${classNamePrefix}`}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
            Option: (props) => (
              <CustomOption
                {...props}
                imageClass={imageClass}
                isCheckbox={isCheckbox}
              />
            ),
            ...Components,
          }}
          getOptionLabel={(option) =>
            optionLabel ? option[optionLabel] : option.label
          }
          getOptionValue={(option) =>
            optionValue ? option[optionValue] : option.value
          }
          ref={selectRef}
          {...props}
        />
        {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}
      </div>
      {errorText && <p className={`mt-2 ${classes.errorText}`}>*{errorText}</p>}
    </div>
  );
};

DropDown.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.object.isRequired,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  customStyle: PropTypes.object,
  style: PropTypes.object,
  Components: PropTypes.object,
  labelClassName: PropTypes.string,
  imageClass: PropTypes.string,
};

DropDown.defaultProps = {
  placeholder: "Please Select",
  value: "",
  disabled: false,
  isMulti: false,
  options: [],
  Components: {},
  imageClass: "", // Default value for imageClass
};

export default DropDown;
