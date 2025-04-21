"use client";

import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import RenderToast from "@/component/atoms/RenderToast";
import { RESET_PASSWORD_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { ResetPasswordSchema } from "@/formik/formikSchema/formik-schemas";
import useAxios from "@/interceptor/axiosInterceptor";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
  const { Post } = useAxios();
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const formikResetPassword = useFormik({
    initialValues: RESET_PASSWORD_FORM_VALUES,
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading("loading");
    const obj = {
      email: Cookies.get("email"),
      code: Cookies.get("code"),
      password: values?.newPassword,
      confirmPassword: values?.confirmPassword,
    };
    const response = await Post({ route: "auth/reset/password", data: obj });
    if (response) {
      router.push("/auth/sign-in");
      RenderToast({
        message: "password updated successfully",
        type: "success",
      });
      Cookies.remove("code");
      Cookies.remove("email");
    }
    setLoading("");
  };

  return (
    <LayoutWrapper>
      <Container>
        <div className={"signInText"}>
          <h4>Recover Password</h4>
          <p>Please type something you’ll remember</p>
        </div>
        <Row>
          <Col xs="12">
            <Input
              type={"password"}
              leftIcon={<FaLock color="#B0B7C3" fontSize={16} />}
              placeholder={"Password"}
              setter={(e) => {
                formikResetPassword.setFieldValue("newPassword", e);
              }}
              value={formikResetPassword.values.newPassword}
              errorText={
                formikResetPassword.touched.newPassword &&
                formikResetPassword.errors.newPassword
              }
            />
          </Col>
          <Col xs="12">
            <Input
              type={"password"}
              leftIcon={<FaLock color="#B0B7C3" fontSize={16} />}
              placeholder={"Confirm Password"}
              setter={(e) => {
                formikResetPassword.setFieldValue("confirmPassword", e);
              }}
              value={formikResetPassword.values.confirmPassword}
              errorText={
                formikResetPassword.touched.confirmPassword &&
                formikResetPassword.errors.confirmPassword
              }
            />
          </Col>
        </Row>
        {/* <Checkbox label={"I agree to the Terms & Conditions"} setValue={()=>{}} /> */}
        <Button
          disabled={loading === "loading"}
          onClick={formikResetPassword.handleSubmit}
          className={classes.btnfull}
          label={loading === "loading" ? "loading..." : "Recover Password"}
        />
      </Container>
    </LayoutWrapper>
  );
};

export default ResetPassword;
