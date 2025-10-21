import React from "react";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import classes from "./TextImage.module.css";
import Button from "../Button";
import { FaCheck } from "react-icons/fa6";
import { MediaUrl } from "@/resources/utils/helper";

const TextImage = ({ rowReverse, data, classTop }) => {
  return (
    <Row className={`${classes.row} ${classTop} ${rowReverse && classes?.rowReverse} `}>
      <div className={classes.imageCol}>
        <div className={classes.imageWrapper}>
          <Image
            src={data?.image}
            alt="about image"
            layout="fill"
            objectFit="cover"
            priority
            className={classes?.mainImage}
          />
        </div>
      </div>
      <div className={classes?.text}>
        <h5>{data?.title}</h5>
        <p>
          {data?.description}
        </p>
        <ol className={classes?.listStyle}  >
          {
            data?.listText?.map((item, index) => {
              return (
                <li key={index} >
                  {/* <FaCheck /> */}
                  <p className={classes.textTitle}>{item?.title}</p>
                  <p className={classes?.description}>{item?.description}</p>
                </li>
              )
            })
          }
        </ol>
        <Button label={"Get Started"} className={classes?.btn} />
      </div>
    </Row>
  );
};

export default TextImage;
