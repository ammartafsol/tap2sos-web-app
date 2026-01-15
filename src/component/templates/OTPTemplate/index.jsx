"use client";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import RenderToast from "@/component/atoms/RenderToast";
import useAxios from "@/interceptor/axiosInterceptor";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from "./OTPTemplate.module.css";

const OTPTemplate = () => {
  const { Post } = useAxios();
  const router = useRouter();
  const userEmail = useSelector((state) => state.authReducer?.user?.email);
  const otpInputs = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({ id: `otp-input-${i}`, index: i })),
    []
  );
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const fromForgotPassword = !Cookies.get("_xpdx_ver");

  console.log("fromForgotPassword", fromForgotPassword);

  // handleInputChange
  const handleInputChange = (value, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(-1);
    setOtpValues(newOtpValues);

    if (value && index < otpValues.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
    setErrorMessage("");
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = "";
      setOtpValues(newOtpValues);
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`)?.focus();
      }
    }
  };

  // handle submit
  const handleSubmit = async () => {
    setLoading("loading");
    if (otpValues.includes("")) {
      setLoading("");
      return setErrorMessage("Please fill in all OTP fields.");
    }
    const obj = {
      email: userEmail || Cookies.get("email"),
      otpCode: otpValues.join(""),
      fromForgotPassword,
    };
    Cookies.set("otpCode", obj.otpCode);
    const { response } = await Post({ route: "users/verify-otp", data: obj });
    console.log("reponse",response);
    if (response.status === "success") {
      if (fromForgotPassword) {
        router.push("/reset-password");
      } else {
        Cookies.remove("_xpdx_ver");
        Cookies.remove("email");
        Cookies.remove("code");
        router.push("/auth/sign-in");
      }
      RenderToast({ type: "success", message: "Success" });
      setCanResend(false);
    }
    setLoading("");
  };

  // handle resend otp
  const handleResendOTP = async () => {
    if (loading) return;
    const obj = {
      email: userEmail || Cookies.get("email"),
      fromForgotPassword: true,
    };
    setLoading("otp");
    const response = await Post({ route: "auth/resend/otp", data: obj });
    setLoading("");
    if (response) {
      setOtpValues(new Array(6).fill(""));
      RenderToast({ type: "info", message: "OTP resent successfully" });
      setTimer(60);
      setCanResend(false);
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <LayoutWrapper>
      <Container>
        <div className={classes.loginContainer}>
          <div className={classes.headingDiv}>
            <h2>Email Verification</h2>
            <p>
              Enter the OTP sent to your email address to reset your password.
            </p>
          </div>
          <div className={classes.formContainer}>
            <div className={classes.otpContainer}>
              {otpInputs.map((input) => {
                const idx = input.index;
                return (
                  <Input
                    key={input.id}
                    type="text"
                    className={classes.otpInput}
                    value={otpValues[idx]}
                    onChange={(e) => handleInputChange(e.target.value, idx)}
                    maxLength={1}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    id={input.id}
                  />
                );
              })}
            </div>
            <div className={classes.timerMain}>
              <p className={classes.timer}>
                {timer > 0 ? (
                  `⏳ ${timer} sec`
                ) : (
                  <span
                    className={classes.resendText}
                    onClick={canResend ? handleResendOTP : undefined}
                    onKeyDown={(e) => {
                      if (canResend && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        handleResendOTP();
                      }
                    }}
                    role={canResend ? "button" : undefined}
                    tabIndex={canResend ? 0 : undefined}
                    aria-label={canResend ? "Resend OTP code" : undefined}
                    style={{ cursor: canResend ? "pointer" : "default" }}
                  >
                    Didn't get the code?{" "}
                    <span className={classes.resendLink}>
                      {loading === "otp" ? "Sending..." : "Resend"}
                    </span>
                  </span>
                )}
              </p>
            </div>

            {errorMessage && (
              <p className={classes.errorMessage}>{errorMessage}</p>
            )}

            <Button
              disabled={loading === "loading"}
              onClick={handleSubmit}
              variant={"gradient"}
              label={loading === "loading" ? "loading..." : "Submit"}
            />
          </div>
        </div>
      </Container>
    </LayoutWrapper>
  );
};

export default OTPTemplate;
