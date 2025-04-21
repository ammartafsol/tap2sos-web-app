"use client";

import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import RenderToast from "@/component/atoms/RenderToast";
import { FORGET_PASSWORD_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { ForgetPasswordSchema } from "@/formik/formikSchema/formik-schemas";
import useAxios from "@/interceptor/axiosInterceptor";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MdEmail } from "react-icons/md";

const FogetPasswordTemplate = () => {
  const router = useRouter();
  const { Post } = useAxios();
  const [loading, setLoading] = useState("");

  const formikForgetPassword = useFormik({
    initialValues: FORGET_PASSWORD_FORM_VALUES,
    validationSchema: ForgetPasswordSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const handleSignUp = async (values) => {
    setLoading("loading");
    const obj = {
      email: values?.email,
    };
    const response = await Post({ route: "auth/forgot/password", data: obj });
    if (response) {
      Cookies.set("email", obj.email);
      RenderToast({ type: "success", message: "success" });
      router.push("/auth/otp");
    }
    setLoading("");
  };

  return (
    <LayoutWrapper>
      <Container>
        <div>
          <div className={"signInText"}>
            <h4>Forgot Password</h4>
            <p>
              Enter the email address associated with your account, and we’ll
              email you a link to reset your password..
            </p>
          </div>
          <Row>
            <Col xs="12">
              <Input
                type={"email"}
                leftIcon={<MdEmail color="#B0B7C3" fontSize={20} />}
                placeholder={"Email"}
                setter={(e) => {
                  formikForgetPassword.setFieldValue("email", e);
                }}
                value={formikForgetPassword.values.email}
                errorText={
                  formikForgetPassword.touched.email &&
                  formikForgetPassword.errors.email
                }
              />
            </Col>
          </Row>
          <Button
            disabled={loading === "loading"}
            onClick={() => {
              formikForgetPassword.handleSubmit();
            }}
            className="btnfull"
            label={loading === "loading" ? "loading..." : "Send"}
          />
        </div>
      </Container>
    </LayoutWrapper>
  );
};

export default FogetPasswordTemplate;
