import React from "react";
import classes from "./TermsAndConditionTemplate.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import TopHeader from "@/component/atoms/TopHeader";
import Quill from "@/component/atoms/Quill";
import { Container } from "react-bootstrap";

const TermsAndConditionTemplate = ({ cmsData }) => {
  console.log("cmsData", cmsData);
  
  return (
    <>
      <LayoutWrapper>
        <TopHeader />
        <Container>
          <div className={classes.termsContainer}>
            {cmsData?.htmlDescription ? (
              <Quill 
                htmlContent={cmsData.htmlDescription} 
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
