import React from "react";
import classes from "./Quill.module.css";

const Quill = ({ htmlContent, className = "" }) => {
  return (
    <div 
      className={`${classes.quillContainer} ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default Quill;
