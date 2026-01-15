import PropTypes from "prop-types";
import moment from "moment";
import classes from "./CommonCells.module.css";
import { capitalizeFirstLetter, mergeClass } from "@/resources/utils/helper";

export const RenderTextCell = ({ cellValue: item }) => {
  return (
    <span className={mergeClass("maxLine2 t-t-c")}>
      {item ? capitalizeFirstLetter(item) : "-"}
    </span>
  );
};

export const RenderCategoryCell = ({ cellValue: { item } }) => {
  return (
    <span title={item} className={mergeClass("maxLine2 t-t-c")}>
      {item ? capitalizeFirstLetter(item) : "-"}
    </span>
  );
};

export const RenderDateCell = ({ cellValue: item }) => {
  return (
    <span className={mergeClass(classes?.date, "text-dark")}>
      {moment(item).format("ll")}
    </span>
  );
};

export const IconButton = ({ icon, onClick }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <button
      type="button"
      className={classes?.iconButton}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label="Action button"
      style={{  border: "none", padding: 0, cursor: "pointer" }}
    >
      {icon}
    </button>
  );
};

RenderTextCell.propTypes = {
  cellValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

RenderCategoryCell.propTypes = {
  cellValue: PropTypes.shape({
    item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

RenderDateCell.propTypes = {
  cellValue: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
