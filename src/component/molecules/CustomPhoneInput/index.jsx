import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import PropTypes from "prop-types";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import classes from "./CustomPhoneInput.module.css"; // Import the CSS Module

const CustomPhoneInput = ({
  value,
  setValue,
  label,
  errorText,
  labelStyle = {},
  disabled = false,
}) => {
  const [error, setError] = useState("");
  const showError = errorText || error;
  const handlePhoneChange = (phone) => {
    const phoneNumberObj = parsePhoneNumberFromString(`+${phone}`);
    if (phoneNumberObj?.country) {
      const isValid = isValidPhoneNumber(
        phoneNumberObj.nationalNumber,
        phoneNumberObj?.country
      );
      setValue({
        callingCode: phoneNumberObj.countryCallingCode,
        phoneNumber: phoneNumberObj.nationalNumber,
      });
      if (isValid) {
        setError("");
      } else {
        setError("Invalid phone number");
      }
    } else {
      setError("");
    }
  };

  return (
    <div className={classes.container}>
      {label && (
        <label
          style={{ ...labelStyle }}
          className={`${[classes.label, disabled && classes.labelDisabled].join(
            " "
          )}`}
        >
          {label}
        </label>
      )}
      <PhoneInput
        country={"us"}
        value={value}
        onChange={handlePhoneChange}
        containerClass={classes.phoneContainer}
      />
      {showError && <p className={`${classes.errorText}`}>{showError}</p>}
    </div>
  );
};

CustomPhoneInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  label: PropTypes.string,
  errorText: PropTypes.string,
  labelStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

CustomPhoneInput.defaultProps = {
  value: "",
  label: "",
  errorText: "",
  labelStyle: {},
  disabled: false,
};

export default CustomPhoneInput;
