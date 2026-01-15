import React from 'react';
import PropTypes from 'prop-types';
import classes from "./LoadingComponent.module.css";
import { ThreeDot } from 'react-loading-indicators';

const LoadingComponent = ({ size = 'large' }) => {
  return (
    <div className={classes.loading}>
      <ThreeDot color="var(--royal-navy-blue)" size={size} text="" textColor="" />
    </div>
  );
};

LoadingComponent.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

LoadingComponent.defaultProps = {
  size: 'large',
};

export default LoadingComponent;