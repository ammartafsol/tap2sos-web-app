import React from "react";
import PropTypes from "prop-types";
import classes from "./ShowDocuments.module.css";
import { FaFileContract } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import { LuLoaderCircle } from "react-icons/lu";

const ShowDocuments = ({ downloadDocumens, loading, item, selectedKey }) => {
  return (
    <div className={classes.filePreview}>
      <span className={classes.previewIcon}>
        <FaFileContract
          title="View File"
          size={35}
          color="var(--royal-navy-blue)"
        />
      </span>
      <button
        type="button"
        onClick={() => downloadDocumens(item?.key)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            downloadDocumens(item?.key);
          }
        }}
        className={classes?.download}
        aria-label="Download document"
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
      >
        {selectedKey === item?.key ? (
          <LuLoaderCircle
            cursor={"pointer"}
            fontSize={25}
            color="var(--royal-navy-blue)"
          />
        ) : (
          <MdFileDownload
            cursor={"pointer"}
            fontSize={25}
            color="var(--royal-navy-blue)"
          />
        )}
      </button>
    </div>
  );
};

ShowDocuments.propTypes = {
  downloadDocumens: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  item: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
  selectedKey: PropTypes.string,
};

ShowDocuments.defaultProps = {
  loading: false,
  selectedKey: undefined,
};

export default ShowDocuments;
