"use client";
import React from "react";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import { Col, Container } from "react-bootstrap";
import TopHeader from "@/component/atoms/TopHeader";
import Image from "next/image";
import { Input } from "@/component/atoms/Input";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import Button from "@/component/atoms/Button";
import classes from "./SecurityKey.module.css";
import { MdOutlineSecurity } from "react-icons/md";
import { TbLockAccess } from "react-icons/tb";

export default function SecurityKey() {
  return (
    <LayoutWrapper>
      <Container>
        <TopHeader />
        <div className={classes.contactUsCard}>
          <Col md={6}>
            <div className={classes.headingDiv}>
              <h2>View Documents With Your Security Key</h2>
              <p>To view your documents, just fill the form!</p>
            </div>
            <div className={classes.contactUsDetails}>
              <div className={classes.contactInfoDiv}>
                <div className={classes.imageDiv}>
                  <MdOutlineSecurity size={32} className={classes.iconColor} />
                </div>
                <p>Secured data</p>
              </div>
              <div className={classes.contactInfoDiv}>
                <div className={classes.imageDiv}>
                  <TbLockAccess size={32} className={classes.iconColor} />
                </div>
                <p>Access with you security key</p>
              </div>
            </div>
          </Col>
          <Col md={6} className={classes.contactUsFormDiv}>
            <div className={classes.inputDivs}>
            <Input placeholder={"Username"} mainContClassName={"mb-0"} />
            <Input placeholder={"Security key"} mainContClassName={"mb-0"} />
            </div>
            <div className={classes.button}>
            <Button label={"Submit"} variant={"gradient"} />
            </div>
          </Col>
        </div>
      </Container>
    </LayoutWrapper>
  );
}
