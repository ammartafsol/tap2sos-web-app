"use client";

import GuideCard from "@/component/atoms/GuideCard";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import HeroSection from "@/component/molecules/HeroSection";
import { LANDING_PAGE_DATA } from "@/developmentContent/landingPage";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./LandingView.module.css";
import Newsletter from "@/component/molecules/Newsletter";
import TextImage from "@/component/atoms/TextImage";
import { aboutUsPageData } from "@/developmentContent/aboutUsPageData";

export default function LandingView() {
  const [data, setData] = useState(LANDING_PAGE_DATA);

  return (
    <>
      <LayoutWrapper>
        <HeroSection data={data.heroSection} />
      </LayoutWrapper>
      <div className={classes.guideSection}>
        <Container>
          <Row>
            <Col md={12} className="p-0">
              <div className={classes.guideHead}>
                <h2>{data?.guideSection?.title}</h2>
                <p>{data?.guideSection?.description}</p>
              </div>
              <div className={classes.guideCardWrapper}>
                <Row>
                  {data?.guideSection?.guideCards.map((data, index) => {
                    return (
                      <Col md={3} key={index}>
                        <GuideCard data={data} />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={classes.chooseUsSec}>
        <Container className="p-0">
          <Row>
            <Col md={12} className="p-0">
              <TextImage rowReverse={true} data={data?.chooseUsData} />
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="p-0">
        <Row>
          <Col md={12} className="p-0">
            <div className={classes.benefitsSection}>
              <TextImage data={data?.benefitsData} />
            </div>
          </Col>
          <Col md={12} className="p-0">
            <div className={classes.newsletterSection}>
              <Newsletter />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
