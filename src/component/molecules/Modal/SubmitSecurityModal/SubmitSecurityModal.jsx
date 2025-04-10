import React, { useState } from "react";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
import classes from "./SubmitSecurityModal.module.css";
import { useFormik } from "formik";
import { Post } from "@/interceptor/axiosInterceptor";
import * as Yup from "yup";

const SubmitSecurityModal = ({ show, setShow, slug, setData }) => {
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
      patientId: slug,
      password: values?.password,
    };
    const response = await Post({ route: "users/patient/login", data: obj });
    if (response) {
      setShow(false);
      setData(response?.response?.data?.data?.user);
      PasswordFormik.resetForm();
    }
    setLoading("");
  };

  const handleClose = () => {
    setShow(false);
  };

  console.log("formik", PasswordFormik.values);

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

export default SubmitSecurityModal;
