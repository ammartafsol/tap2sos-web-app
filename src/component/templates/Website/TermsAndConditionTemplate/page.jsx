"use client";
import React from "react";
import classes from "./TermsAndConditionTemplate.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import TopHeader from "@/component/atoms/TopHeader";
import Quill from "@/component/atoms/Quill";
import { Container } from "react-bootstrap";
import { useState } from "react";
import Parser from "html-react-parser";
import { termsAndConditionsData } from "@/developmentContent/termsAndConditionsData";
const TermsAndConditionTemplate = ({ _data }) => {

  // const [data, setData] = useState(_data)
  const data = termsAndConditionsData;

  return (
    <>
      <LayoutWrapper>
        <TopHeader />
        <Container>
          <div className={classes.termsAndConditionsContainer}>
            <div className={classes.quillContent}> 
            {Parser(data?.htmlDescription)}
            </div>
          </div>
        </Container>
      </LayoutWrapper>
    </>
  );
};

export default TermsAndConditionTemplate;
