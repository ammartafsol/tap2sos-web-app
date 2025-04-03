"use client";
import React from "react";
import classes from "./ContactUs.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import { Col, Container } from "react-bootstrap";
import TopHeader from "@/component/atoms/TopHeader";
import Image from "next/image";
import { Input } from "@/component/atoms/Input";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import Button from "@/component/atoms/Button";

export default function ContactUs() {
  return (
    <LayoutWrapper>
      <Container>
        <TopHeader />
        <div className={classes.contactUsCard}>
            <Col md={6}>
                <div className={classes.headingDiv}>
                    <h2>Stay Tuned</h2>
                    <p>Whether you’re looking to start a new project or simply want to chat, feel free to reach out to us!</p>
                </div>
                <div className={classes.contactUsDetails}>
                    <div className={classes.contactInfoDiv}>
                        <div className={classes.imageDiv}>
                            <Image src={"/Images/app-images/phone.png"} width={32} height={32} alt=""/>
                        </div>
                        <p>+1 890 473 5102</p>
                    </div>
                    <div className={classes.contactInfoDiv}>
                        <div className={classes.imageDiv}>
                            <Image src={"/Images/app-images/email.png"} width={32} height={32} alt=""/>
                        </div>
                        <p>hello@yourmail.com</p>
                    </div>
                    <div className={classes.contactInfoDiv}>
                        <div className={classes.imageDiv}>
                            <Image src={"/Images/app-images/location.png"} width={32} height={32} alt=""/>
                        </div>
                        <p>912 Park Ave, Ketchikan, Alaska 99901, USA</p>
                    </div>
                </div>
            </Col>
            <Col md={6} className={classes.contactUsFormDiv}>
            <Input placeholder={"Name"} mainContClassName={'mb-0'}/>
            <Input placeholder={"Email address"} mainContClassName={'mb-0'}/>
            <Input placeholder={"Subject"} mainContClassName={'mb-0'}/>
            <TextArea placeholder={"Medical Conditions"}/>
            <Button label={"Submit Message"} variant={"gradient"} />
            </Col>

        </div>
      </Container>
    </LayoutWrapper>
  );
}
