"use client";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
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

    if (response) {
      const flattenedData = flattenObject(obj || {});
      setInitialData(flattenedData);
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
