"use client";

import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { RECORDS_LIMIT } from "@/const";
import { PatientTableHeader } from "@/developmentContent/tableHeader";

import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import useAxios from "@/interceptor/axiosInterceptor";
import useDebounce from "@/resources/hooks/useDebounce";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { IoAdd, IoSearchOutline } from "react-icons/io5";
import classes from "./PatientManagementTemplate.module.css";

const PatientManagementTemplate = () => {
  const { Get } = useAxios();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const debouceSearch = useDebounce(search, 500);
  const getData = async (p = page) => {
    setLoading("loading");
    const query = {
      page: p,
      limit: RECORDS_LIMIT,
      search: debouceSearch,
    };
    const queryString = new URLSearchParams(query)
      .toString()
      .replace(/\+/g, "%20");
    const { response } = await Get({
      route: `users/patient/all?${queryString}`,
    });
    setLoading("");
    if (response) {
      // setData(new Array(100).fill(response?.data[0]));
      // setTotalRecords(50);
      setData(response?.data);
      setTotalRecords(response?.totalRecords);
    }
  };

  useEffect(() => {
    getData();
  }, [debouceSearch]);

  return (
    <>
      <LayoutWrapper>
        <Container className="g-0">
          <div className={classes?.pageHeader}>
            <div className="h1">Patient Management</div>
            <div className={classes?.rightContainer}>
              <Input
                placeholder={"Search"}
                setter={setSearch}
                mainContClassName={classes?.mainContClassName}
                type={"search"}
                leftIcon={
                  <IoSearchOutline size={20} color={"var(--text-color-v1)"} />
                }
              />
              <Button
                leftIcon={<IoAdd fontSize={22} />}
                className={classes?.btn}
                label={"Add Patient"}
                onClick={() => {
                  // router.push("/clinics/add-patient");
                }}
              />
            </div>
          </div>
          <div className={classes?.tableContainer}>
            <AppTable
              loading={loading === "loading"}
              containerClass={classes?.containerClass}
              tableHeader={PatientTableHeader}
              data={data}
              noDataText="No Patient Found"
              hasPagination={true}
              totalRecords={totalRecords}
              setCurrentPage={(p) => {
                setPage(p);
                getData(p);
              }}
              currentPage={page}
              renderItem={({ item, key, rowIndex, renderValue }) => {
                const rowItem = data[rowIndex];
                if (renderValue) {
                  return renderValue(item, rowItem);
                }
                if (key == "name") {
                  return (
                    <p>
                      {rowItem?.firstName
                        ? `${rowItem?.firstName}  ${rowItem?.lastName}`
                        : "-"}
                    </p>
                  );
                }
                return item || "";
              }}
            />
          </div>
        </Container>
      </LayoutWrapper>
    </>
  );
};

export default PatientManagementTemplate;
