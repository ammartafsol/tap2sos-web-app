import React from "react";
import classes from "./ShowDocuments.module.css";
import { FaFileContract } from "react-icons/fa";
import { mediaUrl } from "../../../resources/utils/helper";

const ShowDocuments = ({ downloadDocumens, loading, item }) => {
  return (
    <div className={classes.filePreview}>
      {loading === "load" ? (
        <div>loading...</div>
      ) : (
        <span className={classes.previewIcon}>
          <FaFileContract
            title="View File"
            size={35}
            color="var(--royal-navy-blue)"
            onClick={() => downloadDocumens(item?.documentKey)}
          />
        </span>
      )}
    </div>
  );
};

export default ShowDocuments;
