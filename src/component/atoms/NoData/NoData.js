import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";
import classes from "./noData.module.css";

function NoData({ text = "No Data Found", className }) {
  return (
    <div
      className={[classes.noDataContainer, className || ""].join(" ")}
    >
      <ImSearch size={60} color={"var(--secondary-color)"} />
      <p>{text}</p>
    </div>
  );
}

NoData.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

NoData.defaultProps = {
  text: "No Data Found",
  className: "",
};

export default NoData;
