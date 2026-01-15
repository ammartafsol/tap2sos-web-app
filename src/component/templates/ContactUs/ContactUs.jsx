"use client";
import React, { useRef } from "react";
import classes from "./ContactUs.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import { Col, Container, Row } from "react-bootstrap";
import TopHeader from "@/component/atoms/TopHeader";
import Image from "next/image";
import { Input } from "@/component/atoms/Input";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import Button from "@/component/atoms/Button";
import { useState } from "react";
import { CONTACT_US_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { contactUsSchema } from "@/formik/formikSchema/formik-schemas";
import { useFormik } from "formik";
import useAxios from "@/interceptor/axiosInterceptor";
import RenderToast from "@/component/atoms/RenderToast";
import ReCAPTCHA from "react-google-recaptcha";
import { recaptchaSitekey } from "@/const";
import PropTypes from "prop-types";

export default function ContactUs({ _data }) {
    const { Post } = useAxios();

    const [loading, setLoading] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const recaptchaRef = useRef(null);
    const [recaptchaToken, setRecaptchaToken] = useState(null);

    // ContactUsFormik
    const ContactUsFormik = useFormik({
        initialValues: CONTACT_US_FORM_VALUES,
        validationSchema: contactUsSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });


    const handleSubmit = async (values) => {
        if (!recaptchaToken) {
            RenderToast({
                type: "error",
                message: "Please complete the reCAPTCHA verification.",
            });
            return;
        }

        setLoading("loading");
        const payload = {
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }
        const { response } = await Post({
            route: "contact-us",
            data: payload,
        });
        if (response) {
            RenderToast({
                type: "success",
                message: "Thank you for contacting us. We'll get back to you within 24 hours.",
            });
            ContactUsFormik.resetForm();
            setShowSuccessMessage(true);
            setRecaptchaToken(null);
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
            }
        }
        setLoading("");
    }

    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token);
    }

 
    return (
        <LayoutWrapper>
            <Container>
                <TopHeader />
                <div className={classes.contactUsCard}>
                  <Row>
                    <Col lg={6}>
                        <div className={classes.headingDiv}>
                            <h2>Stay Tuned</h2>
                            <p>{_data?.description}</p>
                        </div>
                        <div className={classes.contactUsDetails}>
                            <div className={classes.contactInfoDiv}>
                                <div className={classes.imageDiv}>
                                    <Image src={"/Images/app-images/email.png"} width={32} height={32} alt="" />
                                </div>
                                <a className={classes?.emailLink} href="mailto:info@newcotech.io">info@newcotech.io</a>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} className={classes.contactUsFormDiv}>
                        <Input placeholder={"Name"} 
                        mainContClassName={'mb-0'}  type="text"
                        value={ContactUsFormik.values.name} 
                        setter={ContactUsFormik.handleChange("name")} 
                        errorText={ContactUsFormik.errors.name} />

                        <Input placeholder={"Email address"}
                         mainContClassName={'mb-0'} 
                         type="email" value={ContactUsFormik.values.email} 
                         setter={ContactUsFormik.handleChange("email")} 
                         errorText={ContactUsFormik.touched.email && ContactUsFormik.errors.email } />


                        <Input placeholder={"Subject"} 
                        mainContClassName={'mb-0'} 
                        type="text" 
                        value={ContactUsFormik.values.subject} 
                        setter={ContactUsFormik.handleChange("subject")} 
                        errorText={ContactUsFormik.touched.subject && ContactUsFormik.errors.subject } />

                        <TextArea placeholder={"Message"} rows={5} 
                        value={ContactUsFormik.values.message} 
                        setter={ContactUsFormik.handleChange("message")} 
                        errorText={ContactUsFormik.touched.message && ContactUsFormik.errors.message } />

                        <p className={classes.responseTimeText}>
                            We respond within 24 hours on business days
                        </p>
                        <div>
                            <div className={classes.gdprConsentDiv}>
                            <input
                                type="checkbox"
                                id="gdprConsent"
                                checked={ContactUsFormik.values.gdprConsent}
                                onChange={ContactUsFormik.handleChange("gdprConsent")}
                                className={classes.gdprCheckbox}
                            />
                            <label htmlFor="gdprConsent" className={classes.gdprLabel}>
                                I agree to the processing of my personal data according to our Privacy Policy
                            </label>
                        </div>
                            {ContactUsFormik.touched.gdprConsent && ContactUsFormik.errors.gdprConsent && (
                                <p className={classes.errorText}>{ContactUsFormik.errors.gdprConsent}</p>
                            )}
                        </div>

                        <div className={classes.recaptchaContainer}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={recaptchaSitekey}
                                onChange={handleRecaptchaChange}
                            />
                        </div>

                        <Button label={loading === "loading" ? "Please Wait..." : "Submit Message"}
                         variant={"gradient"} 
                         onClick={ContactUsFormik.handleSubmit} 
                         disabled={loading === "loading"} 
                         loading={loading === "loading"} 
                         type="submit"/>
                        
                        {showSuccessMessage && (
                            <p className={classes.successMessage}>
                                Thank you for contacting us. We'll get back to you within 24 hours.
                            </p>
                        )}
                    </Col>
                  </Row>
                </div>
            </Container>
        </LayoutWrapper>
    );
}

ContactUs.propTypes = {
    _data: PropTypes.object,
};
