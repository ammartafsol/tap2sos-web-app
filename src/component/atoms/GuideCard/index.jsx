import Image from "next/image";
import React from "react";
import PropTypes from "prop-types";
import classes from "./GuideCard.module.css";

const GuideCard = ({ data, removeBorder }) => {
  return (
    <div className={`${classes.guidCardMain} ${removeBorder && classes?.removeBorder}`}>
      <div className={classes.cardImg}>
        <Image
          src={data?.image}
          fill
          className={classes.tap2Image}
          alt="app img"
        />
      </div>
      <div className={classes.cardContent}>
        <h2>{data?.title}</h2>
        <p className="maxLine2">{data?.description}</p>
      </div>
    </div>
  );
};

GuideCard.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  removeBorder: PropTypes.bool,
};

GuideCard.defaultProps = {
  removeBorder: false,
};

export default GuideCard;
