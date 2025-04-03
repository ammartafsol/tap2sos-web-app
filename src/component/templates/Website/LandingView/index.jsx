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

export default function LandingView() {
  const [data, setData] = useState(LANDING_PAGE_DATA);

  return (
    <>
      <LayoutWrapper>
        <HeroSection data={data.heroSection} />
      </LayoutWrapper>
      <GuideSection data={data?.guideSection} />
      <Container>
        <Row>
          <Col md={12} className="p-0">
            <div className={classes.newletterSection}>
              <Newsletter />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
