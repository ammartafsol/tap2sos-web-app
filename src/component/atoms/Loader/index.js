import PropTypes from "prop-types";
import classes from "./Loader.module.css";
import Spinner from "react-bootstrap/Spinner";

export const Loader = ({ className }) => {
  return (
    <div className={`${classes.loaderContainer} ${className || ""}`}>
      <div className={classes.loaderBox}>
        <Spinner animation="grow" className={classes.loader} />
        <Spinner animation="grow" className={classes.loader} />
        <Spinner animation="grow" className={classes.loader} />
      </div>
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
};

Loader.defaultProps = {
  className: "",
};
