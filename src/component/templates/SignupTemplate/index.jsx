"use client";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import RenderToast from "@/component/atoms/RenderToast";
import CustomPhoneInput from "@/component/molecules/CustomPhoneInput";
import MapAndPlaces from "@/component/organisms/MapAndPlaces";
import { SIGNUP_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { signUpSchema } from "@/formik/formikSchema/formik-schemas";
import useAxios from "@/interceptor/axiosInterceptor";
import { mergeClass } from "@/resources/utils/helper";
import { saveLoginUserData } from "@/store/auth/authSlice";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsFillHospitalFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import classes from "./SignupTemplate.module.css";

export default function SignupTemplate() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { Post } = useAxios();
  const [loading, setLoading] = useState(""); // submitSignup

  // SignupFormik
  const SignupFormik = useFormik({
    initialValues: SIGNUP_FORM_VALUES,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  // handleSubmit
  const handleSubmit = async (values) => {
    setLoading("submitSignup");

    const { response } = await Post({ route: `users/signup`, data: values });
    if (response) {
      Cookies.set("_xpdx", handleEncrypt(response?.token), { expires: 90 });
      dispatch(saveLoginUserData(response));
      RenderToast({
        type: "success",
        message: "Login Successfully",
      });
      router.push("/dashboard");
    }
    setLoading("");
  };

  return (
    <LayoutWrapper>
      <Container>
        <Row className={mergeClass("g-0", classes.loginContainer)}>
          <Col md={12} className={classes.loginFormDiv}>
            <div className={classes.headingDiv}>
              <h2>Sign Up to Tap2sos</h2>
              <p>
                Create your account in just a few steps. Access all our features
                and more!
              </p>
            </div>
            <Input
              type={"text"}
              leftIcon={<BsFillHospitalFill color="#B0B7C3" fontSize={20} />}
              placeholder={"Clinic Name"}
              value={SignupFormik.values.clinicName}
              setter={SignupFormik.handleChange("clinicName")}
              errorText={
                SignupFormik.touched.clinicName &&
                SignupFormik.errors.clinicName
              }
              mainContClassName={"mb-0"}
            />
            <Input
              type={"email"}
              leftIcon={<MdEmail color="#B0B7C3" fontSize={20} />}
              placeholder={"Email address"}
              value={SignupFormik.values.email}
              setter={SignupFormik.handleChange("email")}
              errorText={
                SignupFormik.touched.email && SignupFormik.errors.email
              }
              mainContClassName={"mb-0"}
            />
            <Input
              type={"password"}
              leftIcon={<FaLock color="#B0B7C3" fontSize={16} />}
              placeholder={"Password"}
              value={SignupFormik.values.password}
              setter={SignupFormik.handleChange("password")}
              errorText={
                SignupFormik.touched.password && SignupFormik.errors.password
              }
              mainContClassName={"mb-0"}
            />
            <Input
              type={"password"}
              leftIcon={<FaLock color="#B0B7C3" fontSize={16} />}
              placeholder={"Confirm Password"}
              value={SignupFormik.values.confirmPassword}
              setter={SignupFormik.handleChange("confirmPassword")}
              errorText={
                SignupFormik.touched.confirmPassword &&
                SignupFormik.errors.confirmPassword
              }
              mainContClassName={"mb-0"}
            />
            <MapAndPlaces
              type="places"
              leftIcon={<FaLocationDot color="#B0B7C3" fontSize={16} />}
              placeClass={classes?.locationAutoComplete}
              comboRootClassName={classes?.comboRootClassName}
              setLocationData={(data) => {
                if (data == null) {
                  SignupFormik?.setFieldValue("address", "");
                  SignupFormik?.setFieldValue("lat", "");
                  SignupFormik?.setFieldValue("lng", "");
                  SignupFormik?.setFieldValue("country", "");
                  SignupFormik?.setFieldValue("state", "");
                  SignupFormik?.setFieldValue("city", "");
                  SignupFormik?.setFieldValue("zipcode", "");
                } else {
                  SignupFormik?.setFieldValue("address", data.address);
                  SignupFormik?.setFieldValue("lat", data?.lat);
                  SignupFormik?.setFieldValue("lng", data?.lng);
                  SignupFormik?.setFieldValue("country", data?.country);
                  SignupFormik?.setFieldValue("state", data?.state);
                  SignupFormik?.setFieldValue("city", data?.city);
                  SignupFormik?.setFieldValue("zipcode", data?.zipcode);
                }
              }}
              errorText={
                SignupFormik.touched.address && SignupFormik.errors.address
                  ? SignupFormik.errors.address
                  : null
              }
            />
            <CustomPhoneInput
              value={
                SignupFormik.values.phoneNumber == ""
                  ? ""
                  : `${SignupFormik.values.callingCode}${SignupFormik.values.phoneNumber}`
              }
              setValue={(data) => {
                SignupFormik.setFieldValue("callingCode", data.callingCode);
                SignupFormik.setFieldValue("phoneNumber", data.phoneNumber);
              }}
              errorText={
                SignupFormik.touched.phoneNumber &&
                SignupFormik.errors.phoneNumber
              }
              // mainContClassName={"mb-0"}
            />
            <p
              onClick={() => {
                router.push("/forget-password");
              }}
              className={classes.forgetPassword}
            >
              Forgot Password?
            </p>
            <Button
              label={loading == "submitSignup" ? "Please Wait..." : "Login"}
              variant={"gradient"}
              onClick={SignupFormik.handleSubmit}
              disabled={loading == "submitSignup"}
            />
            <div className={classes.alreadyContainer}>
              Already have an account?
              <span onClick={() => router.push("/")}>Log in</span>
            </div>
          </Col>
        </Row>
      </Container>
    </LayoutWrapper>
  );
}
