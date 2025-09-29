"use client";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import NoDataFound from "@/component/atoms/NoDataFound/NoDataFound";
import ShowDocuments from "@/component/atoms/ShowDocuments";
import TopHeader from "@/component/atoms/TopHeader";
import LoadingComponent from "@/component/molecules/LoadingComponent";
import SubmitSecurityModal from "@/component/molecules/Modal/SubmitSecurityModal/SubmitSecurityModal";
import { excludedFields } from "@/const";
import useAxios from "@/interceptor/axiosInterceptor";
import {
  BaseURL,
  capitalizeFirstLetter,
  flattenObject,
  formatLabel,
} from "@/resources/utils/helper";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./SecurityKey.module.css";
import DocumentsView from "@/component/atoms/DocumentsView/DocumentsView";

export default function SecurityKey({ slug }) {
  const { Get } = useAxios();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState("load");
  const [show, setShow] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [attachments, setAttachments] = useState({});
  const [selectedKey, setSelectedKey] = useState("");

  const getData = async () => {
    setLoading("loading");
    const { response } = await Get({ route: `users/patient/detail/${slug}` });
    const obj = response?.data;
    setAttachments(obj?.attachments ? obj?.attachments : {});

    if (response && obj) {
      const flattenedData = flattenObject(obj || {});
      setInitialData(flattenedData);
    } else {
      // No data found
      setInitialData({});
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

  // Show NoDataFound if no data is available
  if (!data && Object.keys(initialData).length === 0) {
    return (
      <LayoutWrapper>
        <Container>
          <TopHeader data="Security Key" />
          <NoDataFound 
            text="No Patient Data Found"
            showSubText={true}
            subText="The requested patient information could not be found. Please verify the security key or contact support if you believe this is an error."
          />
        </Container>
      </LayoutWrapper>
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
                          <DocumentsView doc={doc} />
                          <span>{doc.fileName?.slice(-14) || doc.name?.slice(-14) || 'Document'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </Row>
          </div>
        ) : (
          <>
            <TopHeader data={"security-key"} />
            <Row>
              {Object.entries(initialData || {}).map(([key, value], index) => {
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
                          <DocumentsView doc={doc} />
                          <span>{doc.fileName?.slice(-14) || doc.name?.slice(-14) || 'Document'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {Object.keys(initialData).length !== 0 && (
                <div className={classes.button}>
                  <Button
                    onClick={() => {
                      setShow(true);
                    }}
                    variant={"gradient"}
                    label={"View More Details"}
                  />
                </div>
              )}
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
