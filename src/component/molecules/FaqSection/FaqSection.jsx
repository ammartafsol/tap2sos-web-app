import React from "react";
import PropTypes from "prop-types";
import classes from "./FaqSection.module.css";
import { Container } from "react-bootstrap";
import CustomAccordion from "@/component/organisms/CustomAccordion/CustomAccordion";
import { mergeClass } from "@/resources/utils/helper";

export default function FaqSection({ data, title, faqDiv, faqMainClass }) {
  return (
    <div className={mergeClass(faqDiv, classes.faqDiv)}>
      {title && (
        <div className={classes.faqHead}>
          <h2>{title}</h2>
        </div>
      )}
      <Container>
      <CustomAccordion data={data} mainClass={faqMainClass} />
      </Container>
    </div>
  );
}

FaqSection.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  faqDiv: PropTypes.string,
  faqMainClass: PropTypes.string,
};

FaqSection.defaultProps = {
  title: "",
  faqDiv: "",
  faqMainClass: "",
};
