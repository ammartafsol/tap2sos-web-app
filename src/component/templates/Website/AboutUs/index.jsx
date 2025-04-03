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

const AboutUs = () => {
  return (
    <LayoutWrapper>
      <Container>
        <TopHeader />
        <div className={classes.header}>
          <div className={classes?.headerChild}>
            <h4>Empowering Businesses Digitally</h4>
            <p>
              At our core, we believe in collaboration and creativity. Our
              mission is to simplify complex processes, ensuring that our users
              can navigate their challenges effortlessly. Join us on this
              journey to transform the way you work!
            </p>
            <NavigateButton color="white" />
          </div>
        </div>
        <Row className={classes?.main}>
          <Col md="7" className={classes?.image}>
            <div className={classes?.textImage}>
              <Image
                src={aboutUsPageData?.learnMoreData?.image}
                alt="image"
                fill
              />
            </div>
          </Col>
          <Col md="5" className={classes?.Text}>
            <h4>{aboutUsPageData?.learnMoreData.title}</h4>
            <p>
             {aboutUsPageData?.learnMoreData?.description}
            </p>
            <Button className={classes.btn} label={"Learn More"} />
          </Col>
        </Row>
          <Row className={classes?.imagesTop}>
            {aboutUsPageData?.imagesSection?.map((item, index) => (
              <Col className={classes?.imagesSection} key={index}>
                <Image src={item} fill alt="logo" />
              </Col>
            ))}
          </Row>
          <TextImage data={aboutUsPageData?.chooseUsData} />
      </Container>
    </LayoutWrapper>
  );
};

export default AboutUs;
