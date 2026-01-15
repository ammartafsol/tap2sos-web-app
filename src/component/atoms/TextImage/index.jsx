import React from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import Image from "next/image";
import classes from "./TextImage.module.css";
import Button from "../Button";

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
        <ol className={classes?.listStyle}>
          {data?.listText?.map((item) => {
            const itemKey = item?.id || item?.title || `list-item-${item?.description}`;
            return (
              <li key={itemKey}>
                <p className={classes.textTitle}>{item?.title}</p>
                <p className={classes?.description}>{item?.description}</p>
              </li>
            );
          })}
        </ol>
        <Button label={"Get Started"} className={classes?.btn} />
      </div>
    </Row>
  );
};

TextImage.propTypes = {
  rowReverse: PropTypes.bool,
  classTop: PropTypes.string,
  data: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    listText: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        description: PropTypes.string,
      })
    ),
  }).isRequired,
};

TextImage.defaultProps = {
  rowReverse: false,
  classTop: "",
};

export default TextImage;
