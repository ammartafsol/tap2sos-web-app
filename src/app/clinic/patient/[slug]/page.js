import PropTypes from "prop-types";
import PatientDetailTemplate from "@/component/templates/Clinics/PatientDetailTemplate";
import React from "react";

const PatientDetail = ({ params }) => {
  const { slug } = params;
  return <PatientDetailTemplate slug={slug} />;
};

PatientDetail.propTypes = {
  params: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default PatientDetail;
