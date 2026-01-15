import React from "react";
import PropTypes from "prop-types";
import classes from "./Quill.module.css";

const Quill = ({ htmlContent, className = "" }) => {
  return (
    <div 
      className={`${classes.quillContainer} ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

Quill.propTypes = {
  htmlContent: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Quill.defaultProps = {
  className: "",
};

export default Quill;
