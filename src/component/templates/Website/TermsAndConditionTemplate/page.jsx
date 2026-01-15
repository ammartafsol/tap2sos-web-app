"use client";
import classes from "./TermsAndConditionTemplate.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import TopHeader from "@/component/atoms/TopHeader";
import { Container } from "react-bootstrap";
import Parser from "html-react-parser";
import { termsAndConditionsData } from "@/developmentContent/termsAndConditionsData";

const TermsAndConditionTemplate = () => {
  const data = termsAndConditionsData;

  return (
    <LayoutWrapper>
      <TopHeader />
      <Container>
        <div className={classes.termsAndConditionsContainer}>
          <div className={classes.quillContent}> 
            {data?.htmlDescription && Parser(data?.htmlDescription)}
          </div>
        </div>
      </Container>
    </LayoutWrapper>
  );
};

export default TermsAndConditionTemplate;
