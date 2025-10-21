"use client";
import React from "react";
import classes from "./TermsAndConditionTemplate.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import TopHeader from "@/component/atoms/TopHeader";
import Quill from "@/component/atoms/Quill";
import { Container } from "react-bootstrap";
import { useState } from "react";

const TermsAndConditionTemplate = ({ _data }) => {

  const [data, setData] = useState(_data)

  return (
    <>
      <LayoutWrapper>
        <TopHeader />
        <Container>
          <div className={classes.termsContainer}>
            {data?.htmlDescription ? (
              <Quill
                htmlContent={data?.htmlDescription}
                className={classes.quillContent}
              />
            ) : (
              <div className={classes.noContent}>
                <p>No terms and conditions content available.</p>
              </div>
            )}
          </div>
        </Container>
      </LayoutWrapper>
    </>
  );
};

export default TermsAndConditionTemplate;
