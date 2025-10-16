"use client";
import React from "react";
import classes from "./PrivacyPolicyTemplate.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import TopHeader from "@/component/atoms/TopHeader";
import Quill from "@/component/atoms/Quill";
import { Container } from "react-bootstrap";
import { useState } from "react";

const PrivacyPolicyTemplate = ({ _data }) => {

  const [data, setData] = useState(_data)
  return (
    <>
      <LayoutWrapper>
        <TopHeader />
        <Container>
          <div className={classes.privacyContainer}>
            <Quill htmlContent={data?.htmlDescription} className={classes.quillContent} />
          </div>
        </Container>
      </LayoutWrapper>
    </>
  );
};

export default PrivacyPolicyTemplate;