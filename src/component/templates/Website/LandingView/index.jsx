"use client";

import GuideCard from "@/component/atoms/GuideCard";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import HeroSection from "@/component/molecules/HeroSection";
import { LANDING_PAGE_DATA } from "@/developmentContent/landingPage";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./LandingView.module.css";
import Newsletter from "@/component/molecules/Newsletter";
import GuideSection from "@/component/atoms/GuideSection";
import TextImage from "@/component/atoms/TextImage";
import { aboutUsPageData } from "@/developmentContent/aboutUsPageData";

export default function LandingView({ landingPageData }) {
  const [data, setData] = useState(landingPageData);

  return (
    <>
      <LayoutWrapper>
        <HeroSection data={data?.heroSection} />
      </LayoutWrapper>
      <GuideSection data={data?.guideSection} />
      <div className={classes.chooseUsSec}>
        <Container className="">
          <Row>
            <Col md={12} className="">
              <TextImage rowReverse={true} data={data?.chooseUsData} />
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="">
        <Row>
          <Col md={12} className="">
            <div className={classes.benefitsSection}>
              <TextImage data={data?.benefitsData} />
            </div>
          </Col>
          <Col md={12} className="">
            <div className={classes.newsletterSection}>
              <Newsletter />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
