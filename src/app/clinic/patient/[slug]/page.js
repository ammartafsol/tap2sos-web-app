import PatientDetailTemplate from "@/component/templates/Clinics/PatientDetailTemplate";
import React from "react";

const PatientDetail = ({ params }) => {
  const { slug } = params;
  return <PatientDetailTemplate slug={slug} />;
};

export default PatientDetail;
