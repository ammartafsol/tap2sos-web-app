import React from "react";
import classes from "./PrivacyPolicyTemplate.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import TopHeader from "@/component/atoms/TopHeader";
import Quill from "@/component/atoms/Quill";
import { Container } from "react-bootstrap";

const PrivacyPolicyTemplate = ({ cmsData }) => {  
  return (
    <>
      <LayoutWrapper>
        <TopHeader />
        <Container>
          <div className={classes.privacyContainer}>
            {cmsData?.htmlDescription ? (
              <Quill 
                htmlContent={cmsData.htmlDescription} 
                className={classes.quillContent}
              />
            ) : (
              <div className={classes.noContent}>
                <p>No privacy policy content available.</p>
              </div>
            )}
          </div>
        </Container>
      </LayoutWrapper>
    </>
  );
};

export default PrivacyPolicyTemplate;