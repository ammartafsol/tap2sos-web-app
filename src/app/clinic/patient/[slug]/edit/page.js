import PropTypes from "prop-types";
import AddOrEditPatientTemplate from "@/component/templates/Clinics/AddOrEditPatientTemplate";
import React from "react";

const PatientEdit = ({ params }) => {
  const { slug } = params;
  return <AddOrEditPatientTemplate slug={slug} />;
};

PatientEdit.propTypes = {
  params: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default PatientEdit;
