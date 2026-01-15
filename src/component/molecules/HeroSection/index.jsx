import NavigateButton from "@/component/atoms/NavigateButton";
import Image from "next/image";
import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./HeroSection.module.css";

const HeroSection = ({ data }) => {
  return (
    <Container>
      <Row className="align-items-center">
        <Col lg={6}>
          <div className={classes.heroLeft}>
            <Image
              src={"/Images/app-images/tap2sos.png"}
              fill
              className={classes.tap2Image}
              alt="app img"
            />
            <h1>
              {data?.title}
              <span>{data?.spanText}</span>
            </h1>
            <p>{data?.description}</p>
            <div className={classes.storeImages}>
              <Image
                src={"/Images/app-images/appStore.png"}
                fill
                className={classes.appImage}
                alt="app img"
              />
              <Image
                src={"/Images/app-images/googleStore.png"}
                fill
                className={classes.storeImage}
                alt="app img"
              />
            </div>
          </div>
        </Col>
        <Col lg={6}>
          <div className={classes.heroRightDiv}>
            <div className={classes.rightImg}>
              <Image src={"/Images/app-images/hero.png"} fill alt="hero img" />
            </div>
          </div>
        </Col>
        <Col md={12}>
          <div className={classes.navigate}>
            <NavigateButton />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

HeroSection.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    spanText: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default HeroSection;
