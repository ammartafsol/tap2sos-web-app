import React from "react";
import classes from "./AboutUs.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import TopHeader from "@/component/atoms/TopHeader";
import { Col, Container, Row } from "react-bootstrap";
import NavigateButton from "@/component/atoms/NavigateButton";
import Image from "next/image";
import TextImage from "@/component/atoms/TextImage";
import Button from "@/component/atoms/Button";
import GuideSection from "@/component/atoms/GuideSection";
import { aboutUsPageData } from "@/developmentContent/aboutUsPageData";

const AboutUs = () => {
  return (
    <LayoutWrapper>
      <Container>
        <TopHeader />
        
        {/* Header Section */}
        <div className={classes.header}>
          <div className={classes.headerChild}>
            <h4>Empowering Businesses Digitally</h4>
            <p>
              At our core, we believe in collaboration and creativity. Our mission is to simplify 
              complex processes, ensuring that our users can navigate their challenges effortlessly. 
              Join us on this journey to transform the way you work!
            </p>
            <NavigateButton color="white" />
          </div>
        </div>

        {/* Main Content */}
        <Row className={classes.main}>
          <Col md="7" className={classes.image}>
            <div className={classes.textImage}>
              <Image
                src={aboutUsPageData?.learnMoreData?.image}
                alt="image"
                fill
                objectFit="cover"
              />
            </div>
          </Col>
          <Col md="5" className={classes.text}>
            <h4>{aboutUsPageData?.learnMoreData?.title}</h4>
            <p>{aboutUsPageData?.learnMoreData?.description}</p>
            <Button className={classes.btn} label="Learn More" />
          </Col>
        </Row>
      </Container>

      {/* Images Section */}
      <Container>
        <Row className={classes.imagesTop}>
          {aboutUsPageData?.imagesSection?.map((item, index) => (
            <Col className={classes.imagesSection} key={index}>
              <div className={classes.imageWrapper}>
                <Image src={item} fill objectFit="contain" alt="logo" />
              </div>
            </Col>
          ))}
        </Row>

        {/* Guide Section with Opacity Fix */}
        <div className={classes.guideSection}>
          <GuideSection data={aboutUsPageData?.guideSection} />
        </div>

        {/* TextImage Sections */}
        <TextImage rowReverse={true} classTop={classes.ImageBottom} data={aboutUsPageData?.chooseUsData} />
        <TextImage data={aboutUsPageData?.chooseUsData} />
      </Container>
    </LayoutWrapper>
  );
};

export default AboutUs;
