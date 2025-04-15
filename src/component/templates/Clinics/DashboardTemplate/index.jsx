"use client";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import LoadingComponent from "@/component/atoms/LoadingComponent";
import LineChart from "@/component/molecules/Chart";
import DropDown from "@/component/molecules/DropDown/DropDown";
import StatesCard from "@/component/molecules/StatesCard/StatesCard";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { ClinicTableHeader } from "@/developmentContent/tableHeader";
import { Get } from "@/interceptor/axios-functions";
import { generateYearOptions } from "@/resources/utils/helper";
import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { LuHospital, LuUsersRound } from "react-icons/lu";
import { TbNfc } from "react-icons/tb";
import classes from "./DashboardTemplate.module.css";

const DashboardTemplate = () => {
  const [loading, setLoading] = useState("");
  const [graphData, setGraphData] = useState({});
  const [data, setData] = useState({});
  const [statesData, setStatesData] = useState([]);
  const [selectYear, setSelectYear] = useState({
    label: new Date().getFullYear(),
    value: new Date().getFullYear(),
  });

  const getData = async () => {
    setLoading("loading");
    const query = {
      year: selectYear?.value,
    };
    const queryString = new URLSearchParams(query).toString();
    const response = await Get({ route: `admin/dashboard?${queryString}` });
    const responseData = response?.data?.data?.data;
    if (response) {
      const graphMonths = responseData?.graph?.map((item) => item.monthName);
      const graphCount = responseData?.graph?.map((item) => item.count);
      const statesData = [
        {
          title: "Total Patients",
          count: responseData?.patientsCount,
          icon: LuUsersRound,
        },
        {
          title: "COTIC Patient Retrieval",
          count: responseData?.nfcTapCount,
          icon: TbNfc,
        },
      ];
      setData(responseData);
      setGraphData({
        monthName: graphMonths,
        monthCount: graphCount,
      });
      setStatesData(statesData);
    }
    setLoading("");
  };

  useEffect(() => {
    if (selectYear) {
      getData();
    }
  }, [selectYear]);

  if (loading === "loading") {
    return (
      <div className="center">
        <LoadingComponent />
      </div>
    );
  }
  return null;

  // return (
  //   <div className={"main"}>
  //     <div className="h1">Dashboard</div>

  //     <Row className={classes?.statesMain}>
  //       {statesData?.map((item, index) => {
  //         return (
  //           <Col key={index} md="6" lg="4">
  //             <StatesCard item={item} />
  //           </Col>
  //         );
  //       })}
  //     </Row>
  //     <BorderWrapper containerClass={classes?.BorderWrapper}>
  //       <div className={classes?.header}>
  //         <div className="h2">Patient Data Retrieval Activity</div>
  //         <DropDown
  //           options={generateYearOptions()}
  //           setValue={setSelectYear}
  //           value={selectYear}
  //         />
  //       </div>
  //       <div className={classes?.lineChart}>
  //         <LineChart graphData={graphData} />
  //       </div>
  //     </BorderWrapper>
  //     <BorderWrapper containerClass={classes?.BorderWrapper}>
  //       <div className={classes?.users}>
  //         <div className="h2">Clinics</div>
  //       </div>
  //       <AppTable
  //         tableHeader={ClinicTableHeader}
  //         data={data?.recentClinics}
  //         hasPagination={false}
  //         renderItem={({ item, key, rowIndex }) => {
  //           const dataItem = data?.recentClinics[rowIndex];
  //           if (key === "date") {
  //             return (
  //               <div>{moment(dataItem?.createdAt).format("YYYY/MM/DD")}</div>
  //             );
  //           }
  //           // if (key === "select") {
  //           //   return <BsThreeDotsVertical fontSize={18} cursor={"pointer"} />;
  //           // }
  //           return item || "";
  //         }}
  //       />
  //     </BorderWrapper>
  //   </div>
  // );
};

export default DashboardTemplate;
