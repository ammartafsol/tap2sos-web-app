// import React, { useState } from "react";
// import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
// import { Input } from "@/component/atoms/Input";
// import Button from "@/component/atoms/Button";
// import classes from "./SubmitSecurityModal.module.css";
// import { useFormik } from "formik";
// import useAxios from "@/interceptor/axiosInterceptor";
// import * as Yup from "yup";
// import { flattenObject } from "@/resources/utils/helper";
// import { excludedFields } from "@/const";

// const SubmitSecurityModal = ({
//   show,
//   setShow,
//   slug,
//   setData,
//   setAttachments,
// }) => {
//   const { Post } = useAxios();
//   const [loading, setLoading] = useState("");
//   const PasswordFormik = useFormik({
//     initialValues: {
//       password: "",
//     },
//     validationSchema: Yup.object({
//       password: Yup.string().required("Password is required"),
//     }),
//     onSubmit: (values) => {
//       handleSubmit(values);
//     },
//   });

//   const handleSubmit = async (values) => {
//     setLoading("loading");
//     const obj = {
//       patientNo: slug,
//       password: values?.password,
//     };
//     const { response } = await Post({
//       route: "users/patient/login",
//       data: obj,
//     });
//     console.log("response",response);
//     if (response) {
//       setAttachments(response?.data?.user?.attachments || {});
//       const responseData = response?.data?.user;
//       const filteredData = flattenObject(responseData);
//       filteredData.phoneNumber = `+${filteredData?.callingCode} ${filteredData.phoneNumber}`;
//       filteredData.emergencyContact = `+${filteredData?.emergencyCallingCode} ${filteredData.emergencyContact}`;
//       delete filteredData?.callingCode;
//       delete filteredData?.emergencyCallingCode;

//       setAttachments(responseData?.attachments ? responseData?.attachments : {});
//       setShow(false);
//       setData(filteredData);
//       PasswordFormik.resetForm();
//     }
//     setLoading("");
//   };

//   const handleClose = () => {
//     setShow(false);
//   };

//   return (
//     <ModalSkeleton header={"Security Key"} setShow={setShow} show={show}>
//       <Input
//         type={"password"}
//         placeholder={"Enter Security Key"}
//         setter={(e) => PasswordFormik.setFieldValue("password", e)}
//         value={PasswordFormik.values.password}
//         errorText={
//           PasswordFormik.touched.password && PasswordFormik.errors.password
//         }
//       />
//       <div className={classes?.btnParent}>
//         <Button
//           onClick={handleClose}
//           className={classes?.cancelBtn}
//           label={"Cancel"}
//           variant={"secondary"}
//         />
//         <Button
//           onClick={() => {
//             PasswordFormik.handleSubmit();
//           }}
//           className={classes?.btn}
//           label={loading === "loading" ? "loading..." : "Submit"}
//           variant={"gradient"}
//           disabled={loading === "loading"}
//         />
//       </div>
//     </ModalSkeleton>
//   );
// };

// export default SubmitSecurityModal;

import React, { useState } from "react";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
import classes from "./SubmitSecurityModal.module.css";
import { useFormik } from "formik";
import useAxios from "@/interceptor/axiosInterceptor";
import * as Yup from "yup";
import { BaseURL, flattenObject } from "@/resources/utils/helper";
import { excludedFields } from "@/const";
import axios from "axios";

const SubmitSecurityModal = ({
  show,
  setShow,
  slug,
  setData,
  setAttachments,
}) => {
  const { Post } = useAxios();
  const [loading, setLoading] = useState("");
  const [attachments213, setAttachments213] = useState({});
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

  // const handleSubmit = async (values) => {
  //   setLoading("loading");
  //   const obj = {
  //     patientNo: slug,
  //     password: values?.password,
  //   };
  //   const response2 = fetch(BaseURL("users/patient/login"), {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(obj),
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log("data 112344354233❌❌❌❌", data?.data?.user?.attachments)
  //     setAttachments(data?.data?.user?.attachments ? data?.data?.user?.attachments : {});
  //   })
  //   .catch(error => console.error("Error:", error));
  //   console.log("response2 112344354233❌❌❌❌",response2);
  //   return
  //   const response = await axios.post(BaseURL("users/patient/login"), obj);
  //   console.log("response 112344354 ❌❌❌❌",response);
  //   if (response) {
  //     const responseData = response?.data?.data?.user;
  //     // console.log("responseData 112344354 ❌❌❌❌",responseData);
  //     const filteredData = flattenObject(responseData);
  //     filteredData.phoneNumber = `+${filteredData?.callingCode} ${filteredData.phoneNumber}`;
  //     filteredData.emergencyContact = `+${filteredData?.emergencyCallingCode} ${filteredData.emergencyContact}`;
  //     delete filteredData?.callingCode;
  //     delete filteredData?.emergencyCallingCode;
  //     setAttachments(responseData?.attachments ? responseData?.attachments : {});
  //     setShow(false);
  //     setData(filteredData);
  //     PasswordFormik.resetForm();
  //   }
  //   setLoading("");
  // };

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
      setAttachments213(responseData?.attachments);

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

export default SubmitSecurityModal;
