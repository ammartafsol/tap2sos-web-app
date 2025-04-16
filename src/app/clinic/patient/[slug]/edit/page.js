import AddOrEditPatientTemplate from "@/component/templates/Clinics/AddOrEditPatientTemplate";
import React from "react";

const PatientEdit = ({ params }) => {
  const { slug } = params;
  return <AddOrEditPatientTemplate slug={slug} />;
};

export default PatientEdit;
