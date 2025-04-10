"use client";
import React, { useEffect, useState } from "react";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import { Col, Container, Row } from "react-bootstrap";
import TopHeader from "@/component/atoms/TopHeader";
import Image from "next/image";
import { Input } from "@/component/atoms/Input";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import Button from "@/component/atoms/Button";
import classes from "./SecurityKey.module.css";
import { MdOutlineSecurity } from "react-icons/md";
import { TbLockAccess } from "react-icons/tb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Get, Post } from "@/interceptor/axiosInterceptor";
import { capitalizeFirstLetter, flattenObject } from "@/resources/utils/helper";
import moment from "moment-timezone";
import RenderToast from "@/component/atoms/RenderToast";
import ShowDocuments from "@/component/atoms/ShowDocuments";
import SubmitSecurityModal from "@/component/molecules/Modal/SubmitSecurityModal/SubmitSecurityModal";
import LoadingComponent from "@/component/molecules/LoadingComponent";
import { excludedFields } from "@/const";

export default function SecurityKey({ slug }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState("");
  const [show, setShow] = useState(false);
  const [initialData, setInitialData] = useState({});

  const PatientDataFormik = useFormik({
    initialValues: {
      patientId: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const getData = async () => {
    setLoading("loading");
    const response = await Get({ route: `users/patient/detail/${slug}` });
    const obj = response?.response?.data?.data;
    if (response) {
      const flattenedData = flattenObject(obj);
      const filteredData = Object.fromEntries(
        Object.entries(flattenedData).filter(([key]) => !excludedFields.includes(key))
      );
      setInitialData(filteredData);
    }
    setLoading("");
  };

  console.log("initialData", initialData);

  const downloadDocumens = async (key) => {
    const response = await Get({ route: `media/fetch/${key}` });
    setLoading("load");
    if (response) {
      // RenderToast({
      //   type: "success",
      //   message: "Downloaded Successfully",
      // });
    }
    setLoading("");
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading === "loading") {
    return (
      <div className="loading">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <LayoutWrapper>
      <Container>
        {data ? (
          <div>
            <TopHeader data="Patient Details" />
            <Row>
              <Col md={6}>
                <Input
                  type={"text"}
                  label={"Donor"}
                  disabled={true}
                  value={"Yes"}
                />
              </Col>
              <Col md={6}>
                <Input
                  type={"text"}
                  label={"Blood Type"}
                  disabled={true}
                  value={data?.bloodType}
                />
              </Col>
              <Col md={6}>
                <Input
                  type={"text"}
                  disabled={true}
                  label={"Gender"}
                  value={capitalizeFirstLetter(data?.gender)}
                />
              </Col>
              <Col md={6}>
                <Input
                  type={"text"}
                  disabled={true}
                  label={"Patient Name"}
                  value={`${capitalizeFirstLetter(
                    data?.firstName
                  )} ${capitalizeFirstLetter(data?.lastName)}`}
                />
              </Col>
              <Col md={6}>
                <Input
                  type={"text"}
                  disabled={true}
                  label={"Medical Condition"}
                  value={capitalizeFirstLetter(data?.medicalCondition)}
                />
              </Col>
              <Col md={6}>
                <Input
                  type={"text"}
                  disabled={true}
                  label={"Useful Information"}
                  value={capitalizeFirstLetter(data?.usefulInformation)}
                />
              </Col>
              <Col md={6}>
                <Input
                  type={"text"}
                  disabled={true}
                  label={"Date of Birth"}
                  value={moment(data?.dateOfBirth).format("YYYY/MM/DD")}
                />
              </Col>
              <Col md={6}>
                <Input
                  type={"text"}
                  label={"Doctor's Fll Name"}
                  disabled={true}
                  value={`${data?.firstName} ${data?.lastName}`}
                />
              </Col>
              <Col md={6}>
                <Input
                  type={"email"}
                  label={"Patients Email Address"}
                  disabled={true}
                  value={`${data?.email}`}
                />
              </Col>
              <Col md={6}>
                <Input
                  type={"number"}
                  label={"Emergency Contact"}
                  disabled={true}
                  value={Number(data?.phoneNumber)}
                />
              </Col>
              <ShowDocuments
                downloadDocumens={downloadDocumens}
                loading={loading}
              />
            </Row>
          </div>
        ) : (
          <>
            <TopHeader data={"security-key"} />
            <Row>
              {Object.entries(initialData || {}).map(([key, value], index) => {
                // Skip excluded fields
                if (excludedFields.includes(key)) return null;

                if (typeof value === "object" && value !== null) {
                  return Object.entries(value).map(
                    ([nestedKey, nestedValue], nestedIndex) => (
                      <Col md={6} key={`${index}-${nestedIndex}`}>
                        <Input
                          type="text"
                          disabled={true}
                          label={capitalizeFirstLetter(nestedKey)}
                          value={
                            capitalizeFirstLetter(String(nestedValue)) ||
                            "No Data"
                          }
                        />
                      </Col>
                    )
                  );
                }

                // For non-object fields, render normally
                return (
                  <Col md={6} key={index}>
                    <Input
                      type="text"
                      disabled={true}
                      label={capitalizeFirstLetter(key)}
                      value={capitalizeFirstLetter(String(value))}
                    />
                  </Col>
                );
              })}

              <div className={classes.button}>
                <Button
                  onClick={() => {
                    setShow(true);
                  }}
                  variant={"gradient"}
                  label={"View More Details"}
                />
              </div>
            </Row>
          </>
        )}
        <SubmitSecurityModal
          setData={setData}
          slug={slug}
          show={show}
          setShow={setShow}
        />
      </Container>
    </LayoutWrapper>
  );
}

// <div className={classes.inputDivs}>
//                   <Input
//                     placeholder={"Password"}
//                     type={"password"}
//                     mainContClassName={"mb-0"}
//                     setter={(e) => {
//                       PatientDataFormik.setFieldValue("password", e);
//                     }}
//                     value={PatientDataFormik.values.password}
//                     onBlur={PatientDataFormik.handleBlur}
//                     errorText={
//                       PatientDataFormik.touched.password &&
//                       PatientDataFormik.errors.password
//                     }
//                   />
//                 </div>
