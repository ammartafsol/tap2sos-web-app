"use client";
import { Input } from "@/component/atoms/Input";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import TopHeader from "@/component/atoms/TopHeader";
import LoadingComponent from "@/component/molecules/LoadingComponent";
import useAxios from "@/interceptor/axiosInterceptor";
import {
  capitalizeFirstLetter,
  flattenObject,
  formatLabel,
} from "@/resources/utils/helper";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./PatientDetailTemplate.module.css";
import DocumentsView from "@/component/atoms/DocumentsView/DocumentsView";
import UploadProfile from "@/component/molecules/UploadProfile";
import PropTypes from "prop-types";

export default function PatientDetailTemplate({ slug }) {
  const { Get } = useAxios();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState("load");
  const [attachments, setAttachments] = useState({});
  const [photo, setPhoto] = useState(null);

  const getData = async () => {
    setLoading("loading");
    const { response } = await Get({ route: `users/detail/${slug}` });
    const obj = response?.data;
    if (response) {
      setAttachments(obj?.attachments ? obj?.attachments : {});
      setPhoto(obj?.photo ? obj?.photo : null);
      const flattenedData = flattenObject(obj || {});
      flattenedData.phoneNumber = `+${flattenedData?.callingCode} ${flattenedData.phoneNumber}`;
      flattenedData.emergencyContact = `+${flattenedData?.emergencyCallingCode} ${flattenedData.emergencyContact}`;
      delete flattenedData?.callingCode;
      delete flattenedData?.emergencyCallingCode;
      setData(flattenedData);
    }
    setLoading("");
  };

  const getDisplayValue = (key, value) => {
    if (key === "organDonor") {
      return value ? "Yes" : "No";
    }
    return capitalizeFirstLetter(String(value)) || "No Data";
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
        <div>
          <TopHeader data="Patient Details" />
          <UploadProfile uploadImage={photo} readOnly={true} />
          <Row>
            {Object.entries(data || {}).map(([key, value]) => {
              return (
                <Col md={6} key={key}>
                  <Input
                    type="text"
                    disabled={true}
                    label={formatLabel(key)}
                    value={getDisplayValue(key, value)}
                  />
                </Col>
              );
            })}

            {Object.keys(attachments).map((type) => {
              const docs = attachments[type] || [];
              return (
                <div key={type} className={classes.tagGroup}>
                  <div className={classes.tagWrapper}>
                    <div className={classes.tag}>
                      <span>{type}</span>
                    </div>
                  </div>

                  <div className={classes.documentsList}>
                    {docs.map((doc) => {
                      const docKey = doc.key || doc.fileName || `${type}-${doc.id || Math.random()}`;
                      return (
                        <div key={docKey} className={classes.documentItem}>
                          <DocumentsView doc={doc} />
                          <span>{doc.fileName.slice(-14)}</span>{" "}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </Row>
        </div>
      </Container>
    </LayoutWrapper>
  );
}

PatientDetailTemplate.propTypes = {
  slug: PropTypes.string.isRequired,
};
