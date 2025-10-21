import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import React from "react";
import classes from "./Newsletter.module.css";

const Newsletter = ({ data }) => {
  return (
    <div className={classes.newsletterMain}>
      <div className={classes.topHead}>
        <h2>{data?.title}</h2>
        <p>{data?.description}</p>
      </div>
      {/* <div className={classes.fieldOption}>
        <div className={classes.newsField}>
          <Input
            mainContClassName={classes.inputClass}
            placeholder={"Email Address"}
            inputStyle={{
              height: "48px",
            }}
          />
          <Button label={"Submit"} variant={"gradient"} />
        </div>
        <p>
          We care about your data in our <span>Privacy policy</span>
        </p>
      </div> */}
    </div>
  );
};

export default Newsletter;
