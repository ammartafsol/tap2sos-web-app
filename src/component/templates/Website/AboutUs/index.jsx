import React from "react";
import classes from "./AboutUs.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import TopHeader from "@/component/atoms/TopHeader";
import { Col, Container, Row } from "react-bootstrap";
import NavigateButton from "@/component/atoms/NavigateButton";
import Image from "next/image";
import TextImage from "@/component/atoms/TextImage";
import Button from "@/component/atoms/Button";

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
                src={"/Images/app-images/aboutTextImage.svg"}
                alt="image"
                fill
              />
            </div>
          </Col>
          <Col md="5" className={classes?.Text}>
            <h4>Lorem ipsum dolor sit amet</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Facilisi magna mattis id
              aliquet. Magna adipiscing egestas gravida adipiscing volutpat nibh
              vulputate in. Et senectus venenatis enim purus elit. Non venenatis
              quam risus nec in. Morbi neque nisl aenean facilisis viverra purus
              suspendisse sit. Sit felis adipiscing quis dolor euismod
              sollicitudin leo faucibus laoreet. At facilisi ridiculus donec
              platea laoreet.
            </p>
            <Button className={classes.btn} label={"Learn More"} />
          </Col>
        </Row>
      </Container>
    </LayoutWrapper>
  );
};

export default AboutUs;
