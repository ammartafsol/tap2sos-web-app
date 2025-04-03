import Image from "next/image";
import React from "react";
import classes from "./GuideCard.module.css";

const GuideCard = () => {
  return (
    <div className={classes.guidCardMain}>
      <div className={classes.cardImg}>
        <Image
          src={"/Images/svg/loginReg.svg"}
          fill
          className={classes.tap2Image}
          alt="app img"
        />
      </div>
      <div className={classes.cardContent}>
        <h2>Register & Login</h2>
        <p>Secure access with SSO (Gmail)</p>
      </div>
    </div>
  );
};

export default GuideCard;
