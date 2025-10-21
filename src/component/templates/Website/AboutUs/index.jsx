"use client";
import React from "react";
import classes from "./AboutUs.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import TopHeader from "@/component/atoms/TopHeader";
import { Col, Container, Row } from "react-bootstrap";
import NavigateButton from "@/component/atoms/NavigateButton";
import Image from "next/image";
import TextImage from "@/component/atoms/TextImage";
import Button from "@/component/atoms/Button";
import { imagesSection } from "@/developmentContent/appData";
import { aboutUsPageData } from "@/developmentContent/aboutUsPageData";
import GuideSection from "@/component/atoms/GuideSection";
import { useState } from "react";
import { MediaUrl } from "@/resources/utils/helper";
import Parser from "html-react-parser";

const AboutUs = ({ data }) => {
 
  // const [aboutUsData, setAboutUsData] = useState(data)
  const aboutUsData = aboutUsPageData;
  return (
    <>
      <LayoutWrapper>
        <TopHeader />
        <Container>
          {/* <div className={classes.header} style={{ backgroundImage: `url(${MediaUrl(aboutUsData?.heroSection?.image)})` }}> */}
          <div className={classes.header}>
            <div className={classes?.headerChild}>
              <h4>{aboutUsData?.heroSection?.subTitle}</h4>
              <p>
                {aboutUsData?.heroSection?.description}
              </p>
              <NavigateButton color="white" />
            </div>
          </div>
        </Container>
      </LayoutWrapper>
      <Container>
        <Row className={classes?.main}>
          <Col lg="7" className={classes?.image}>
            <div className={classes?.textImage}>
              <Image
                src={"/Images/app-images/aboutTextImage.svg"}
                alt="image"
                fill
              />
            </div>
          </Col>
          <Col lg="5" className={classes?.Text}>
            <h4>{aboutUsData?.learnMoreData?.title}</h4>
            <p>{aboutUsData?.learnMoreData?.description}</p>
            <div>{aboutUsData?.learnMoreData?.htmlDescription && Parser(aboutUsData?.learnMoreData?.htmlDescription)}</div>
            <div>{aboutUsData?.learnMoreData?.htmlDescription2 && Parser(aboutUsData?.learnMoreData?.htmlDescription2)}</div>
            <Button className={classes.btn} label={"Learn More"} />
          </Col>
        </Row>
        <Row className={classes?.imagesTop}>
          {aboutUsData?.partnersSection?.map((item, index) => (
            <Col className={classes?.imagesSection} key={index}>
              <Image src={item} fill alt="logo" />
            </Col>
          ))}
        </Row>
        <div className={classes?.guideSection}>
          <GuideSection removeBorder={true} data={aboutUsData?.guideSection} />
        </div>
        <TextImage
          rowReverse={true}
          classTop={classes?.ImageBottom}
          data={aboutUsData?.chooseUsData}
        />
        <TextImage data={aboutUsData?.chooseUsData} />
      </Container>
    </>
  );
};

export default AboutUs;
