import React from "react";
import classes from "./DocumentsView.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { FaFileContract } from "react-icons/fa";
import { config } from "@/config";

const DocumentsView = ({ doc }) => {
  const handleClick = () => {
    const fullUrl = `${config.pinataURL}${doc.key}`;
    window.open(fullUrl, "_blank");
  };

  return (
    <div onClick={handleClick} className={classes?.fileItem}>
      <div className={classes.filePreview}>
        <span className={classes.previewIcon}>
          <FaFileContract
            size={35}
            color="var(--secondary-text)"
          />
        </span>
      </div>
    </div>
  );
};

export default DocumentsView;
