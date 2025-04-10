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
import {
  baseURL,
  capitalizeFirstLetter,
  flattenObject,
  formatLabel,
} from "@/resources/utils/helper";
import moment from "moment-timezone";
import RenderToast from "@/component/atoms/RenderToast";
import ShowDocuments from "@/component/atoms/ShowDocuments";
import SubmitSecurityModal from "@/component/molecules/Modal/SubmitSecurityModal/SubmitSecurityModal";
import LoadingComponent from "@/component/molecules/LoadingComponent";
import { excludedFields } from "@/const";

export default function SecurityKey({ slug }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState("load");
  const [show, setShow] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [attachments, setAttachments] = useState([]);
  const [selectedKey,setSelectedKey] = useState('');

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
    setAttachments(obj?.attachments);
    if (response) {
      const flattenedData = flattenObject(obj);
      const filteredData = Object.fromEntries(
        Object.entries(flattenedData).filter(
          ([key]) => !excludedFields.includes(key)
        )
      );
      setInitialData(filteredData);
    }
    setLoading("");
  };

  const downloadDocumens = async (key) => {
    setLoading("load");
    setSelectedKey(key);
    const url = baseURL(`users/media/fetch/${key}`);
    window.open(url);
    setLoading("");
    setSelectedKey('');
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
              {Object.entries(data || {}).map(([key, value], index) => {
                if (excludedFields.includes(key)) return null;

                if (typeof value === "object" && value !== null) {
                  return Object.entries(value).map(
                    ([nestedKey, nestedValue], nestedIndex) => (
                      <Col md={6} key={`${index}-${nestedIndex}`}>
                        <Input
                          type="text"
                          disabled={true}
                          label={formatLabel(key)}
                          value={
                            key === "organDonor"
                              ? value
                                ? "Yes"
                                : "No"
                              : capitalizeFirstLetter(String(value)) || "No Data"
                          }
                        />
                      </Col>
                    )
                  );
                }

                return (
                  <Col md={6} key={index}>
                    <Input
                      type="text"
                      disabled={true}
                      label={formatLabel(key)}
                      value={
                        key === "organDonor"
                          ? value
                            ? "Yes"
                            : "No"
                          : capitalizeFirstLetter(String(value)) || "No Data"
                      }
                    />
                  </Col>
                );
              })}

{attachments?.length > 0 && (
  <>
    <h5 className={classes?.attachmentsHeading}>Attachments</h5>
  <div className={classes?.attachments}>
    {attachments.map((item) => (
      <ShowDocuments
        key={item?.key}
        item={item}
        downloadDocumens={downloadDocumens}
        loading={loading}
        selectedKey={selectedKey}
      />
    ))}
  </div>
  </>
)}

              
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

                return (
                  <Col md={6} key={index}>
                    <Input
                      type="text"
                      disabled={true}
                      label={formatLabel(key)}
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
          setAttachments={setAttachments}
          setShow={setShow}
        />
      </Container>
    </LayoutWrapper>
  );
}
