import PropTypes from "prop-types";
import React, { useState } from "react";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
import classes from "./SubmitSecurityModal.module.css";
import { useFormik } from "formik";
import useAxios from "@/interceptor/axiosInterceptor";
import * as Yup from "yup";
import { flattenObject } from "@/resources/utils/helper";

const SubmitSecurityModal = ({
  show,
  setShow,
  slug,
  setData,
  setAttachments,
}) => {
  const { Post } = useAxios();
  const [loading, setLoading] = useState("");
  const PasswordFormik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading("loading");

    const obj = {
      patientNo: slug,
      password: values?.password,
    };

    const { response } = await Post({
      route: "users/patient/login",
      data: obj,
    });

    if (response) {
      const responseData = response?.data?.user;

      if (responseData) {
        setAttachments(responseData?.attachments || {});
        const filteredData = flattenObject(responseData);
        // Format phone numbers
        filteredData.phoneNumber = `+${filteredData?.callingCode} ${filteredData.phoneNumber}`;
        filteredData.emergencyContact = `+${filteredData?.emergencyCallingCode} ${filteredData.emergencyContact}`;

        // Remove unnecessary keys
        delete filteredData.callingCode;
        delete filteredData.emergencyCallingCode;
        setShow(false);
        setData(filteredData);
        PasswordFormik.resetForm();
      }
    }
    setLoading("");
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <ModalSkeleton header={"Security Key"} setShow={setShow} show={show}>
      <Input
        type={"password"}
        placeholder={"Enter Security Key"}
        setter={(e) => PasswordFormik.setFieldValue("password", e)}
        value={PasswordFormik.values.password}
        errorText={
          PasswordFormik.touched.password && PasswordFormik.errors.password
        }
      />
      <div className={classes?.btnParent}>
        <Button
          onClick={handleClose}
          className={classes?.cancelBtn}
          label={"Cancel"}
          variant={"secondary"}
        />
        <Button
          onClick={() => {
            PasswordFormik.handleSubmit();
          }}
          className={classes?.btn}
          label={loading === "loading" ? "loading..." : "Submit"}
          variant={"gradient"}
          disabled={loading === "loading"}
        />
      </div>
    </ModalSkeleton>
  );
};

SubmitSecurityModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  setAttachments: PropTypes.func.isRequired,
};

export default SubmitSecurityModal;
