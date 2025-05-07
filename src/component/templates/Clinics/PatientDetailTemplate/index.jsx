"use client";
import { Input } from "@/component/atoms/Input";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import ShowDocuments from "@/component/atoms/ShowDocuments";
import TopHeader from "@/component/atoms/TopHeader";
import LoadingComponent from "@/component/molecules/LoadingComponent";
import useAxios from "@/interceptor/axiosInterceptor";
import {
  BaseURL,
  capitalizeFirstLetter,
  flattenObject,
  formatLabel,
} from "@/resources/utils/helper";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./PatientDetailTemplate.module.css";
import DocumentsView from "@/component/atoms/DocumentsView/DocumentsView";

export default function PatientDetailTemplate({ slug }) {
  const { Get } = useAxios();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState("load");
  const [attachments, setAttachments] = useState({});
  const [selectedKey, setSelectedKey] = useState("");

  const getData = async () => {
    setLoading("loading");
    const { response } = await Get({ route: `users/detail/${slug}` });
    const obj = response?.data;
    setAttachments(obj?.attachments ? obj?.attachments : {});
    if (response) {
      const flattenedData = flattenObject(obj || {});
      flattenedData.phoneNumber = `+${flattenedData?.callingCode} ${flattenedData.phoneNumber}`;
      flattenedData.emergencyContact = `+${flattenedData?.emergencyCallingCode} ${flattenedData.emergencyContact}`;
      delete flattenedData?.callingCode;
      delete flattenedData?.emergencyCallingCode;
      setData(flattenedData);
    }
    setLoading("");
  };

  const downloadDocumens = async (key) => {
    setLoading("load");
    setSelectedKey(key);
    const url = BaseURL(`users/media/fetch/${key}`);
    window.open(url);
    setLoading("");
    setSelectedKey("");
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
          <Row>
            {Object.entries(data || {}).map(([key, value], index) => {
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

            {/* {attachments?.length > 0 && (
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
            )} */}

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
                    {docs.map((doc, index) => (
                      <div key={index} className={classes.documentItem}>
                        <DocumentsView />
                        <span>{doc.fileName.slice(-14)}</span>{" "}
                      </div>
                    ))}
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
