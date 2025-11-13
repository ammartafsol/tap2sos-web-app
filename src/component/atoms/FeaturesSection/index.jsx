import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./FeaturesSection.module.css";

const FeaturesSection = ({ data }) => {
  return (
    <div className={classes.featuresSection}>
      <Container>
        <Row>
          <Col md={12} className="">
            <div className={classes.featuresHead}>
              <h2>{data?.title}</h2>
            </div>
            <div className={classes.featuresList}>
              <Row className="gy-4">
                {data?.features?.map((feature, index) => {
                  return (
                    <Col md={6} lg={3} key={index}>
                      <div className={classes.featureItem}>
                        <div className={`${classes.featureItemTitle} `}>
                          <h3 className="maxLine2" title={feature?.title}>{feature?.title}</h3>
                        </div>
                        <p>{feature?.description}</p>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FeaturesSection;
