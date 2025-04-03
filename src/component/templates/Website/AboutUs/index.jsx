import React from "react";
import classes from "./AboutUs.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import TopHeader from "@/component/atoms/TopHeader";
import { Container } from "react-bootstrap";

const AboutUs = () => {
  return (
    <LayoutWrapper>
      <Container>
        <TopHeader />
        <div className={classes.header}>
            <div className={classes?.headerChild}>
          <h4>Empowering Businesses Digitally</h4>
          <p>
            At our core, we believe in collaboration and creativity. Our mission
            is to simplify complex processes, ensuring that our users can
            navigate their challenges effortlessly. Join us on this journey to
            transform the way you work!
          </p>
          </div>
        </div>
      </Container>
    </LayoutWrapper>
  );
};

export default AboutUs;
