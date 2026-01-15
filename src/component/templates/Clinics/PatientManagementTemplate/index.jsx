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
import { IconButton } from "@/component/organisms/AppTable/CommonCells";
import { FaEye, FaUserEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { patientFilter } from "@/developmentContent/enums/enum";
import { MdDelete } from "react-icons/md";
import AreYouSureModal from "@/component/molecules/Modal/AreYouSureModal";
import RenderToast from "@/component/atoms/RenderToast";

const PatientManagementTemplate = () => {
  const router = useRouter();
  const { Get, Delete } = useAxios();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(patientFilter[0]);
  const [totalRecords, setTotalRecords] = useState(0);
  const debouceSearch = useDebounce(search, 500);
  const [selectedPatient, setSelectedPatient] = useState("");
  const getData = async (p = page) => {
    setLoading("loading");
    const query = {
      page: p,
      limit: RECORDS_LIMIT,
      search: debouceSearch,
      sortBy: selectedFilter?.value ?? "",
    };
    const queryString = new URLSearchParams(query)
      .toString()
      .replaceAll("+", "%20");
    const { response } = await Get({
      route: `users/patient/all?${queryString}`,
    });
    setLoading("");
    if (response) {
      setData(response?.data);
      setTotalRecords(response?.totalRecords);
    }
  };

  useEffect(() => {
    getData(1);
    setPage(1);
  }, [debouceSearch, selectedFilter]);

  const handleDelete = async () => {
    setLoading("deletePatient");
    const { error } = await Delete({
      route: `users/clinic/delete-patient/${selectedPatient?.slug}`,
    });
    if (error == null) {
      RenderToast({
        type: "success",
        message: `${selectedPatient?.firstName} ${selectedPatient?.lastName} Deleted Successfully`,
      });
      setData((prev) =>
        prev.filter((item) => item.slug !== selectedPatient?.slug)
      );
      setSelectedPatient("");
      getData();
    }
    setLoading("");
  };

  return (
    <>
      <LayoutWrapper>
        <Container className="g-2">
          <div className={classes?.pageHeader}>
            <div className={classes?.heading}>Patient Management</div>
            <div className={classes?.main}>
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
                    router.push("/clinic/patient/create");
                  }}
                />
              </div>
              <div className={classes?.filter}>
                <DropDown
                  setValue={setSelectedFilter}
                  value={selectedFilter}
                  options={patientFilter}
                  placeholder={"Filter"}
                  className={classes?.containerClass}
                />
              </div>
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
                      <IconButton
                        onClick={() => {
                          setSelectedPatient(rowItem);
                        }}
                        icon={<MdDelete size={20} />}
                      />
                    </div>
                  );
                }
                return item || "";
              }}
            />
          </div>
        </Container>
      </LayoutWrapper>

      {selectedPatient !== "" && (
        <AreYouSureModal
          show={selectedPatient !== ""}
          setShow={() => {
            setSelectedPatient("");
          }}
          title={`Are You Sure You Want To Delete ${selectedPatient?.firstName} ${selectedPatient?.lastName}?`}
          onClick={handleDelete}
          loading={loading === "deletePatient"}
        />
      )}
    </>
  );
};

export default PatientManagementTemplate;
