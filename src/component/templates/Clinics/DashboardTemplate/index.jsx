"use client";

import AppTable from "@/component/organisms/AppTable/AppTable";
import { PatientTableHeader } from "@/developmentContent/tableHeader";

import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import { IconButton } from "@/component/organisms/AppTable/CommonCells";
import useAxios from "@/interceptor/axiosInterceptor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaEye, FaUserEdit } from "react-icons/fa";
import { LuUsersRound } from "react-icons/lu";
import { TbNfc } from "react-icons/tb";
import classes from "./DashboardTemplate.module.css";
import StatesCard from "@/component/molecules/StatesCard/StatesCard";
import { Loader } from "@/component/atoms/Loader";
import Button from "@/component/atoms/Button";

const DashboardTemplate = () => {
  const router = useRouter();
  const { Get } = useAxios();
  const [data, setData] = useState([]);
  const [statsData, setStatsData] = useState([
    {
      title: "Total Patients",
      count: 10,
      icon: LuUsersRound,
    },
    {
      title: "COTIC Patient Retrieval",
      count: 10,
      icon: TbNfc,
    },
  ]);
  const [loading, setLoading] = useState("");

  const getData = async () => {
    setLoading("loading");
    const { response } = await Get({
      route: `users/clinic/dashboard`,
    });
    if (response) {
      const statsCard = [
        {
          title: "Total Patients",
          count: response?.data?.patientsCount,
          icon: LuUsersRound,
        },
        {
          title: "COTIC Patient Retrieval",
          count: response?.data?.nfcTapCount,
          icon: TbNfc,
        },
      ];
      setData(response?.data?.patients || []);
      setStatsData(statsCard);
    }
    setLoading("");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LayoutWrapper>
      <Container>
        {loading === "loading" ? (
          <div className={classes?.loaderContainer}>
            <Loader />
          </div>
        ) : (
          <>
            <Row className="g-2">
              {statsData?.map((item, index) => {
                return (
                  <Col key={item.title} md="6" xl={4}>
                    <StatesCard item={item} />
                  </Col>
                );
              })}
            </Row>

            <div className={classes?.tableContainer}>
              <AppTable
                loading={loading === "loading"}
                containerClass={classes?.containerClass}
                tableHeader={PatientTableHeader}
                data={data}
                noDataText="No Patient Found"
                hasPagination={false}
                renderItem={({ item, key, rowIndex, renderValue }) => {
                  const rowItem = data[rowIndex];
                  if (renderValue) {
                    return renderValue(item, rowItem);
                  }
                  if (key == "action") {
                    return (
                      <div className="flex row gap-2">
                        <IconButton
                          onClick={() =>
                            router.push(`/clinic/patient/${rowItem?.slug}`)
                          }
                          icon={<FaEye size={20} />}
                        />
                        <IconButton
                          onClick={() =>
                            router.push(`/clinic/patient/${rowItem?.slug}/edit`)
                          }
                          icon={<FaUserEdit size={20} />}
                        />
                      </div>
                    );
                  }
                  return item || "";
                }}
              />
            </div>
            {data?.length > 10 && (
              <div className={classes?.viewAllPatientsButtonContainer}>
                <Button
                  label={"View All Patients"}
                  onClick={() => {
                    router.push("/clinic/patient");
                  }}
                  className={classes?.viewAllPatientsButton}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </LayoutWrapper>
  );
};

export default DashboardTemplate;
