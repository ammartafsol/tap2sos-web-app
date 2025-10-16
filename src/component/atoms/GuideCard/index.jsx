import Image from "next/image";
import React from "react";
import classes from "./GuideCard.module.css";
import { MediaUrl } from "@/resources/utils/helper";

const GuideCard = ({ data,removeBorder }) => {
  return (
    <div className={`${classes.guidCardMain} ${removeBorder && classes?.removeBorder}`}>
      <div className={classes.cardImg}>
        <Image
          src={MediaUrl(data?.image)}
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

export default GuideCard;
