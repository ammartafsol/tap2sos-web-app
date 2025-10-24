"use client";
import React from "react";
import classes from "./ContactUs.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import { Col, Container } from "react-bootstrap";
import TopHeader from "@/component/atoms/TopHeader";
import Image from "next/image";
import { Input } from "@/component/atoms/Input";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import Button from "@/component/atoms/Button";
import { useState } from "react";
import { MediaUrl } from "@/resources/utils/helper";
import { CONTACT_US_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { contactUsSchema } from "@/formik/formikSchema/formik-schemas";
import { useFormik } from "formik";
import useAxios from "@/interceptor/axiosInterceptor";
import RenderToast from "@/component/atoms/RenderToast";

export default function ContactUs({ _data }) {
    const { Post } = useAxios();

    const [data, setData] = useState(_data)
    const [loading, setLoading] = useState("");

    // ContactUsFormik
    const ContactUsFormik = useFormik({
        initialValues: CONTACT_US_FORM_VALUES,
        validationSchema: contactUsSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });


    const handleSubmit = async (values) => {
        setLoading("loading");
        const { response } = await Post({
            route: "contact-us",
            data: values,
        });
        console.log("response",response);
        if (response) {
            RenderToast({
                type: "success",
                message: "Thank you for contacting us. We'll get back to you within 24 hours.",
            });
            ContactUsFormik.resetForm();
        }
        setLoading("");
    }

    const responseHandler = () => {
        RenderToast({
            type: "success",
            message: "We respond within 24 hours on business days",
        });
        window.open('mailto:info@newcotech.io', '_blank');
    }
    return (
        <LayoutWrapper>
            <Container>
                <TopHeader />
                <div className={classes.contactUsCard}>
                    <Col lg={6}>
                        <div className={classes.headingDiv}>
                            {/* <h2>{data?.text}</h2> */}
                            <h2>Stay Tuned</h2>
                            <p>{data?.description}</p>
                        </div>
                        {/* <div className={classes.contactUsDetails}> */}
                        {/* {data?.details?.map((item, index) => (
                                <div className={classes.contactInfoDiv} key={index}>
                                    <div className={classes.imageDiv}>
                                        <Image src={MediaUrl(item?.icon)} width={32} height={32} alt="" />
                                    </div>
                                    <p>{item?.value}</p>
                                </div>
                            ))} */}
                        <div className={classes.contactUsDetails}>
                            {/* <div className={classes.contactInfoDiv}>
                                    <div className={classes.imageDiv}>
                                        <Image src={"/Images/app-images/phone.png"} width={32} height={32} alt="" />
                                    </div>
                                    <p>+1 890 473 5102</p>
                                </div> */}
                            <div className={classes.contactInfoDiv} onClick={responseHandler} >
                                <div className={classes.imageDiv}>
                                    <Image src={"/Images/app-images/email.png"} width={32} height={32} alt="" />
                                </div>
                                <p>info@newcotech.io</p>
                            </div>
                            {/* <div className={classes.contactInfoDiv}>
                                    <div className={classes.imageDiv}>
                                        <Image src={"/Images/app-images/location.png"} width={32} height={32} alt="" />
                                    </div>
                                    <p>912 Park Ave, Ketchikan, Alaska 99901, USA</p>
                                </div> */}
                        </div>
                        {/* </div> */}
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


                        <Button label={loading == "loading" ? "Please Wait..." : "Submit Message"}
                         variant={"gradient"} 
                         onClick={ContactUsFormik.handleSubmit} 
                         disabled={loading == "loading"} 
                         loading={loading == "loading"} 
                         type="submit"/>
                    </Col>
                </div>
            </Container>
        </LayoutWrapper>
    );
}
