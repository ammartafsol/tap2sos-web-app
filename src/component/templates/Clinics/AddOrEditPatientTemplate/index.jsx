"use client";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import TopHeader from "@/component/atoms/TopHeader";
import CustomPhoneInput from "@/component/molecules/CustomPhoneInput";
import DropDown from "@/component/molecules/DropDown/DropDown";
import LoadingComponent from "@/component/molecules/LoadingComponent";
import {
  bloodTypesData,
  civilData,
  cognitiveStimulationData,
  genderData,
  mediaTypeData,
  yesNoData,
} from "@/developmentContent/appData";
import { ADD_EDIT_PATIENT_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { getAddPatientValidationSchema } from "@/formik/formikSchema/formik-schemas";
import useAxios from "@/interceptor/axiosInterceptor";
import { BaseURL } from "@/resources/utils/helper";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./AddOrEditPatientTemplate.module.css";
import { useRouter } from "next/navigation";
import RenderToast from "@/component/atoms/RenderToast";
import MultiFileUpload from "@/component/molecules/MultiFileUpload";
import {
  getSupportedImageTypes,
  uploadImagesHelper,
} from "@/resources/utils/mediaUpload";
import LottieLoader from "@/component/atoms/LottieLoader/LottieLoader";

export default function AddOrEditPatientTemplate({ slug }) {
  const { Get, Post, Patch, Delete } = useAxios();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(""); // getPatientDetails, addOrEditPatientRequest
  const [attachments, setAttachments] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [docs, setDocs] = useState({});
  const [uploaders, setUploaders] = useState({});
  const [isLoadingWithType, setIsLoadingWithTypes] = useState("");

  const formikAddPatient = useFormik({
    initialValues: ADD_EDIT_PATIENT_FORM_VALUES,

    validationSchema: getAddPatientValidationSchema(slug), // add your validation schema here
    onSubmit: (values) => {
      handleAddPatient(values);
    },
  });

  const handleAddPatient = async (value) => {
    const yesNoToBool = (val) => val?.value === "yes";
    let params = {
      ...value,
      organDonor: yesNoToBool(value.organDonor),
      bloodType: value.bloodType?.value,
      gender: value.gender?.value,
      civilStatus: value.civilStatus?.value,
      cognitiveStimulation: value.cognitiveStimulation?.value,
      economicStatus: value.economicStatus?.value,
      hyperTension: yesNoToBool(value.hyperTension),
      diabetes: yesNoToBool(value.diabetes),
      heartDisease: yesNoToBool(value.heartDisease),
      liverDisease: yesNoToBool(value.liverDisease),
      renalDisease: yesNoToBool(value.renalDisease),
      obesity: yesNoToBool(value.obesity),
      mentalIllness: yesNoToBool(value.mentalIllness),
      familyHistoryOfDementia: yesNoToBool(value.familyHistoryOfDementia),
      useOfElectronicDevice: yesNoToBool(value.useOfElectronicDevice),
      dateOfBirth: new Date(value.dateOfBirth),
      attachments: docs,
      // ...(docs?.length > 0 && { attachments: docs }),
    };

    if (slug) {
      delete params?.password;
      delete params?.confirmPassword;
    }

    const url = slug ? `users/update/patient/${slug}` : `users/create-patient`;
    setLoading("addOrEditPatientRequest");
    const { response } = slug
      ? await Patch({
          route: url,
          data: params,
        })
      : await Post({
          route: url,
          data: params,
        });
    if (response) {
      RenderToast({
        type: "success",
        message: `Patient ${slug ? "Updated" : "Added"} Successfully`,
      });
      router.push(`/clinic/patient/${response?.data?.slug}`);
    }
    setLoading("");
  };

  const GetPatientDetails = async () => {
    setLoading("getPatientDetails");

    const { response } = await Get({ route: `users/detail/${slug}` });
    if (response) {
      const boolToYesNo = (val) => ({
        label: val ? "Yes" : "No",
        value: val ? "yes" : "no",
      });
      const findOption = (arr, val) => arr.find((item) => item.value === val);
      let data = response?.data;

      formikAddPatient.setValues({
        ...formikAddPatient.values,
        ...data,
        dateOfBirth: data?.dateOfBirth
          ? new Date(data?.dateOfBirth).toISOString().split("T")[0]
          : "",
        organDonor: boolToYesNo(data.organDonor),
        bloodType: findOption(bloodTypesData, data.bloodType),
        gender: findOption(genderData, data.gender),
        civilStatus: findOption(civilData, data.civilStatus),
        familyHistoryOfDementia: boolToYesNo(data.familyHistoryOfDementia),
        economicStatus: findOption(
          cognitiveStimulationData,
          data.economicStatus
        ),
        hyperTension: boolToYesNo(data.hyperTension),
        diabetes: boolToYesNo(data.diabetes),
        heartDisease: boolToYesNo(data.heartDisease),
        liverDisease: boolToYesNo(data.liverDisease),
        renalDisease: boolToYesNo(data.renalDisease),
        obesity: boolToYesNo(data.obesity),
        mentalIllness: boolToYesNo(data.mentalIllness),
        cognitiveStimulation: findOption(
          cognitiveStimulationData,
          data.cognitiveStimulation
        ),
        useOfElectronicDevice: boolToYesNo(data.useOfElectronicDevice),
      });
      setDocs(response?.data?.attachments);
    }
    setLoading("");
  };

  useEffect(() => {
    if (slug) {
      GetPatientDetails();
    }
  }, []);

  const downloadDocumens = async (key) => {
    setLoading("load");
    setSelectedKey(key);
    const url = BaseURL(`users/media/fetch/${key}`);
    window.open(url);
    setLoading("");
    setSelectedKey("");
  };

  const handleMediaSelect = (selectedOptions) => {
    const updatedAttachments = {};
    selectedOptions.forEach(({ label }) => {
      if (docs[label]) {
        updatedAttachments[label] = docs[label]; // Skip if already exists
      } else {
        updatedAttachments[label] = []; // Empty array to later hold files
      }
    });
    setDocs(updatedAttachments);
  };

  const handleAddUploader = (type) => {
    const current = uploaders[type] || [];
    const totalUploaded = docs[type]?.length || 0;

    if (current.length + totalUploaded < 2) {
      setUploaders((prev) => ({
        ...prev,
        [type]: [...current, {}],
      }));
    }
  };

  // handleUploadMedia
  const handleUploadMedia = (
    files,
    type, // this corresponds to each media type like "MRI", "CT Scan", etc.
    maxCount = 2,
    setDocs,
    docs
  ) => {
    const existingFiles = docs[type] || [];
    let uploadedFiles = files.filter((file) => file instanceof File);

    if (uploadedFiles.length + existingFiles.length > maxCount) {
      return RenderToast({
        message: `You can upload a maximum of ${maxCount} files for ${type}`,
        type: "error",
      });
    }

    uploadImagesHelper({
      images: uploadedFiles,
      setIsLoading: setIsLoadingWithTypes,
      loadingType: "uploadingImages",
      Post,
      setMedia: (media) => {
        const uploaded = [
          ...(media?.docs || []),
          ...(media?.images || []),
          ...(media?.photo || []),
        ];
        const updatedDocs = {
          ...docs,
          [type]: [
            ...existingFiles,
            ...uploaded.map((e) => ({
              key: e.key,
              fileName: e.fileName,
              type: type,
            })),
          ],
        };

        setDocs(updatedDocs);
      },
      token: null,
    });
  };

  if (loading === "getPatientDetails") {
    return (
      <div className="loading">
        <LoadingComponent />
      </div>
    );
  }

  console.log("formikAddPatient",formikAddPatient.values);

  return (
    <LayoutWrapper>
      <Container>
        <div>
          <TopHeader
            data={slug ? "Edit Patient" : "Add Patient"}
            showBreadcrumb={false}
          />
          <Row>
            <Col md={12} className="mb-3">
              <h4 className="mb-0">Demographics</h4>
            </Col>
            {/* Demographics */}
            <Col md={6}>
              <Input
                type="text"
                label="Patient No*"
                placeholder={"Enter Patient No"}
                value={formikAddPatient.values.patientNo}
                onChange={formikAddPatient.handleChange("patientNo")}
                errorText={
                  formikAddPatient.touched.patientNo &&
                  formikAddPatient.errors.patientNo
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="text"
                label="First Name*"
                placeholder={"Enter First Name"}
                value={formikAddPatient.values.firstName}
                onChange={formikAddPatient.handleChange("firstName")}
                errorText={
                  formikAddPatient.touched.firstName &&
                  formikAddPatient.errors.firstName
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="text"
                label="Last Name*"
                placeholder={"Enter Last Name"}
                value={formikAddPatient.values.lastName}
                onChange={formikAddPatient.handleChange("lastName")}
                errorText={
                  formikAddPatient.touched.lastName &&
                  formikAddPatient.errors.lastName
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="email"
                label="Email Address*"
                placeholder={"Enter Email Address"}
                value={formikAddPatient.values.email}
                onChange={formikAddPatient.handleChange("email")}
                errorText={
                  formikAddPatient.touched.email &&
                  formikAddPatient.errors.email
                }
              />
            </Col>

            {!slug && (
              <>
                <Col md={6}>
                  <Input
                    type="password"
                    label="Password*"
                    placeholder={"Enter Password"}
                    value={formikAddPatient?.values?.password}
                    onChange={formikAddPatient.handleChange("password")}
                    errorText={
                      formikAddPatient.touched.password &&
                      formikAddPatient.errors.password
                    }
                  />
                </Col>
                <Col md={6}>
                  <Input
                    type="password"
                    label="Confirm Password*"
                    placeholder={"Enter Confirm Password"}
                    value={formikAddPatient?.values?.confirmPassword}
                    onChange={formikAddPatient.handleChange("confirmPassword")}
                    errorText={
                      formikAddPatient.touched.confirmPassword &&
                      formikAddPatient.errors.confirmPassword
                    }
                  />
                </Col>
              </>
            )}

            <Col md={6}>
              <Input
                type="text"
                label="Medical Condition"
                placeholder={"Enter Medical Condition"}
                value={formikAddPatient.values.medicalCondition}
                onChange={formikAddPatient.handleChange("medicalCondition")}
                errorText={
                  formikAddPatient.touched.medicalCondition &&
                  formikAddPatient.errors.medicalCondition
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="text"
                label="Useful Information"
                placeholder={"Enter Useful Information"}
                value={formikAddPatient.values.usefulInformation}
                onChange={formikAddPatient.handleChange("usefulInformation")}
                errorText={
                  formikAddPatient.touched.usefulInformation &&
                  formikAddPatient.errors.usefulInformation
                }
              />
            </Col>
            <Col md={6}>
              <DropDown
                label={`Are you an organ donor?`}
                placeholder={`Select`}
                options={yesNoData}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("organDonor", e);
                }}
                value={formikAddPatient?.values?.organDonor}
                errorText={
                  formikAddPatient.touched.organDonor &&
                  formikAddPatient.errors.organDonor
                }
              />
            </Col>

            <Col md={6}>
              <DropDown
                placeholder={`Select Blood type`}
                label={"Blood Type"}
                options={bloodTypesData}
                value={formikAddPatient.values.bloodType}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("bloodType", e);
                }}
                errorText={
                  formikAddPatient.touched.bloodType &&
                  formikAddPatient.errors.bloodType
                }
              />
            </Col>
            <Col md={6}>
              <DropDown
                placeholder={`Select Gender`}
                label={"Gender*"}
                options={genderData}
                value={formikAddPatient.values.gender}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("gender", e);
                }}
                errorText={
                  formikAddPatient.touched.gender &&
                  formikAddPatient.errors.gender
                }
              />
            </Col>
            <Col md={6}>
              <Input
                type="date"
                label="Date Of Birth*"
                placeholder={"Select Date Of Birth"}
                value={formikAddPatient.values.dateOfBirth}
                onChange={formikAddPatient.handleChange("dateOfBirth")}
                errorText={
                  formikAddPatient.touched.dateOfBirth &&
                  formikAddPatient.errors.dateOfBirth
                }
                max={new Date().toISOString().split("T")[0]}
              />
            </Col>
            <Col md={6} style={{ marginBottom: "20px" }}>
              <CustomPhoneInput
                value={
                  formikAddPatient.values.phoneNumber == ""
                    ? ""
                    : `${formikAddPatient.values.callingCode}${formikAddPatient.values.phoneNumber}`
                }
                label={"Phone Number*"}
                placeholder={"Enter Phone Number"}
                setValue={(data) => {
                  formikAddPatient.setFieldValue(
                    "callingCode",
                    data.callingCode
                  );
                  formikAddPatient.setFieldValue(
                    "phoneNumber",
                    data.phoneNumber
                  );
                }}
                errorText={
                  formikAddPatient.touched.phoneNumber &&
                  formikAddPatient.errors.phoneNumber
                }
              />
            </Col>
            <Col md={6} style={{ marginBottom: "20px" }}>
              <CustomPhoneInput
                value={
                  formikAddPatient.values.emergencyContact == ""
                    ? ""
                    : `${formikAddPatient.values.emergencyCallingCode}${formikAddPatient.values.emergencyContact}`
                }
                label={"Emergency Contact*"}
                placeholder={"Enter Emergency Contact"}
                setValue={(data) => {
                  formikAddPatient.setFieldValue(
                    "emergencyCallingCode",
                    data.callingCode
                  );
                  formikAddPatient.setFieldValue(
                    "emergencyContact",
                    data.phoneNumber
                  );
                }}

                errorText={
                  formikAddPatient.touched.emergencyContact &&
                  formikAddPatient.errors.emergencyContact
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="text"
                label="Doctor Name*"
                placeholder="Enter Doctor Name"
                value={formikAddPatient.values.doctorName}
                onChange={formikAddPatient.handleChange("doctorName")}
                errorText={
                  formikAddPatient.touched.doctorName &&
                  formikAddPatient.errors.doctorName
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="text"
                label="PESEL*"
                placeholder="Enter PESEL"
                value={formikAddPatient.values.pesel}
                onChange={formikAddPatient.handleChange("pesel")}
                errorText={
                  formikAddPatient.touched.pesel &&
                  formikAddPatient.errors.pesel
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="text"
                label="Education"
                placeholder="Enter Education"
                value={formikAddPatient.values.education}
                onChange={formikAddPatient.handleChange("education")}
                errorText={
                  formikAddPatient.touched.education &&
                  formikAddPatient.errors.education
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="text"
                label="Job"
                placeholder="Enter Job"
                value={formikAddPatient.values.job}
                onChange={formikAddPatient.handleChange("job")}
                errorText={
                  formikAddPatient.touched.job && formikAddPatient.errors.job
                }
              />
            </Col>

            <Col md={6}>
              <DropDown
                label="Civil Status*"
                placeholder="Select Civil Status"
                options={civilData}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("civilStatus", e);
                }}
                value={formikAddPatient?.values?.civilStatus}
                errorText={
                  formikAddPatient.touched.civilStatus &&
                  formikAddPatient.errors.civilStatus
                }
              />
            </Col>

            <Col md={6}>
              <DropDown
                label="Family History of Dementia*"
                placeholder="Select Family History"
                options={yesNoData}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("familyHistoryOfDementia", e);
                }}
                value={formikAddPatient?.values?.familyHistoryOfDementia}
                errorText={
                  formikAddPatient.touched.familyHistoryOfDementia &&
                  formikAddPatient.errors.familyHistoryOfDementia
                }
              />
            </Col>

            <Col md={6}>
              <DropDown
                label="Economic Status"
                placeholder="Select Economic Status"
                options={cognitiveStimulationData}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("economicStatus", e);
                }}
                value={formikAddPatient?.values?.economicStatus}
                errorText={
                  formikAddPatient.touched.economicStatus &&
                  formikAddPatient.errors.economicStatus
                }
              />
            </Col>

            {/* Physical Characteristics */}
            <Col md={12} className="mb-3">
              <h4 className="mb-0">Physical Characteristics</h4>
            </Col>
            <Col md={6}>
              <Input
                type="number"
                label="Height (cm)*"
                placeholder="Enter Height"
                value={formikAddPatient.values.height}
                onChange={formikAddPatient.handleChange("height")}
                errorText={
                  formikAddPatient.touched.height &&
                  formikAddPatient.errors.height
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="number"
                label="Weight (kg)*"
                placeholder="Enter Weight"
                value={formikAddPatient.values.weight}
                onChange={formikAddPatient.handleChange("weight")}
                errorText={
                  formikAddPatient.touched.weight &&
                  formikAddPatient.errors.weight
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="number"
                label="BMI"
                placeholder="Enter BMI"
                value={formikAddPatient.values.bmi}
                onChange={formikAddPatient.handleChange("bmi")}
                errorText={
                  formikAddPatient.touched.bmi && formikAddPatient.errors.bmi
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="number"
                label="Waist Circumference (cm)"
                placeholder="Enter Waist Circumference"
                value={formikAddPatient.values.waistCircumference}
                onChange={formikAddPatient.handleChange("waistCircumference")}
                errorText={
                  formikAddPatient.touched.waistCircumference &&
                  formikAddPatient.errors.waistCircumference
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="text"
                label="Blood Pressure*"
                placeholder="Enter Blood Pressure"
                value={formikAddPatient.values.bloodPressure}
                onChange={formikAddPatient.handleChange("bloodPressure")}
                errorText={
                  formikAddPatient.touched.bloodPressure &&
                  formikAddPatient.errors.bloodPressure
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="number"
                label="Heart Rate (bpm)*"
                placeholder="Enter Heart Rate"
                value={formikAddPatient.values.heartRate}
                onChange={formikAddPatient.handleChange("heartRate")}
                errorText={
                  formikAddPatient.touched.heartRate &&
                  formikAddPatient.errors.heartRate
                }
              />
            </Col>

            {/* Disease Status / Comorbidities */}
            <Col md={12} className="mb-3">
              <h4 className="mb-0">Disease Status / Comorbidities</h4>
            </Col>
            <Col md={6}>
              <DropDown
                label="Hypertension*"
                placeholder="Select Hypertension"
                options={yesNoData}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("hyperTension", e);
                }}
                value={formikAddPatient?.values?.hyperTension}
                errorText={
                  formikAddPatient.touched.hyperTension &&
                  formikAddPatient.errors.hyperTension
                }
              />
            </Col>

            <Col md={6}>
              <DropDown
                label="Diabetes*"
                placeholder="Select Diabetes"
                options={yesNoData}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("diabetes", e);
                }}
                value={formikAddPatient?.values?.diabetes}
                errorText={
                  formikAddPatient.touched.diabetes &&
                  formikAddPatient.errors.diabetes
                }
              />
            </Col>

            <Col md={6}>
              <DropDown
                label="Heart Disease*"
                placeholder="Select Heart Disease"
                options={yesNoData}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("heartDisease", e);
                }}
                value={formikAddPatient?.values?.heartDisease}
                errorText={
                  formikAddPatient.touched.heartDisease &&
                  formikAddPatient.errors.heartDisease
                }
              />
            </Col>

            <Col md={6}>
              <DropDown
                label="Liver Disease"
                placeholder="Select Liver Disease"
                options={yesNoData}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("liverDisease", e);
                }}
                value={formikAddPatient?.values?.liverDisease}
                errorText={
                  formikAddPatient.touched.liverDisease &&
                  formikAddPatient.errors.liverDisease
                }
              />
            </Col>
            <Col md={6}>
              <DropDown
                label="Renal Disease"
                placeholder="Select Renal Disease"
                options={yesNoData}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("renalDisease", e);
                }}
                value={formikAddPatient?.values?.renalDisease}
                errorText={
                  formikAddPatient.touched.renalDisease &&
                  formikAddPatient.errors.renalDisease
                }
              />
            </Col>

            <Col md={6}>
              <DropDown
                label="Obesity"
                placeholder="Select Obesity"
                options={yesNoData}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("obesity", e);
                }}
                value={formikAddPatient?.values?.obesity}
                errorText={
                  formikAddPatient.touched.obesity &&
                  formikAddPatient.errors.obesity
                }
              />
            </Col>

            <Col md={6}>
              <DropDown
                label="Mental Illness*"
                placeholder="Select Mental Illness"
                options={yesNoData}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("mentalIllness", e);
                }}
                value={formikAddPatient?.values?.mentalIllness}
                errorText={
                  formikAddPatient.touched.mentalIllness &&
                  formikAddPatient.errors.mentalIllness
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="text"
                label="Others"
                placeholder="Enter Other Information"
                value={formikAddPatient.values.others}
                onChange={formikAddPatient.handleChange("others")}
                errorText={
                  formikAddPatient.touched.others &&
                  formikAddPatient.errors.others
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="text"
                label="Medication Taken*"
                placeholder="Enter Medication Taken"
                value={formikAddPatient.values.medicationTaken}
                onChange={formikAddPatient.handleChange("medicationTaken")}
                errorText={
                  formikAddPatient.touched.medicationTaken &&
                  formikAddPatient.errors.medicationTaken
                }
              />
            </Col>

            {/* Lifestyle Factors */}
            <Col md={12} className="mb-3">
              <h4 className="mb-0">Lifestyle Factors</h4>
            </Col>
            <Col md={6}>
              <Input
                type="number"
                label="Smoking*"
                placeholder="Enter Smoking (no. of cigarettes/day)"
                value={formikAddPatient.values.smoking}
                onChange={formikAddPatient.handleChange("smoking")}
                errorText={
                  formikAddPatient.touched.smoking &&
                  formikAddPatient.errors.smoking
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="number"
                label="Alcohol Consumption*"
                placeholder="Enter Alcohol Consumption (units/week)"
                value={formikAddPatient.values.alcoholConsumption}
                onChange={formikAddPatient.handleChange("alcoholConsumption")}
                errorText={
                  formikAddPatient.touched.alcoholConsumption &&
                  formikAddPatient.errors.alcoholConsumption
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="number"
                label="Physical Exercise*"
                placeholder="Enter Physical Exercise (hours/day)"
                value={formikAddPatient.values.physicalExercise}
                onChange={formikAddPatient.handleChange("physicalExercise")}
                errorText={
                  formikAddPatient.touched.physicalExercise &&
                  formikAddPatient.errors.physicalExercise
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="text"
                label="Diet Adequacy"
                placeholder="Enter Diet Adequacy"
                value={formikAddPatient.values.dietAdequacy}
                onChange={formikAddPatient.handleChange("dietAdequacy")}
                errorText={
                  formikAddPatient.touched.dietAdequacy &&
                  formikAddPatient.errors.dietAdequacy
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="number"
                label="Sleep Duration*"
                placeholder="Enter Sleep Duration (hours/day)"
                value={formikAddPatient.values.sleepDuration}
                onChange={formikAddPatient.handleChange("sleepDuration")}
                errorText={
                  formikAddPatient.touched.sleepDuration &&
                  formikAddPatient.errors.sleepDuration
                }
              />
            </Col>
            <Col md={6}>
              <DropDown
                label="Cognitive Stimulation"
                placeholder="Select Cognitive Stimulation"
                options={cognitiveStimulationData}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("cognitiveStimulation", e);
                }}
                value={formikAddPatient?.values?.cognitiveStimulation}
                errorText={
                  formikAddPatient.touched.cognitiveStimulation &&
                  formikAddPatient.errors.cognitiveStimulation
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="text"
                label="Relaxation Techniques"
                placeholder="Enter Relaxation Techniques"
                value={formikAddPatient.values.relaxationTechniques}
                onChange={formikAddPatient.handleChange("relaxationTechniques")}
                errorText={
                  formikAddPatient.touched.relaxationTechniques &&
                  formikAddPatient.errors.relaxationTechniques
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="number"
                label="Water Consumption"
                placeholder="Enter Water Consumption (litres/day)"
                value={formikAddPatient.values.waterConsumption}
                onChange={formikAddPatient.handleChange("waterConsumption")}
                errorText={
                  formikAddPatient.touched.waterConsumption &&
                  formikAddPatient.errors.waterConsumption
                }
              />
            </Col>

            <Col md={6}>
              <Input
                type="text"
                label="Time Spent Alone"
                placeholder="Enter Time Spent Alone"
                value={formikAddPatient.values.timeSpentAlone}
                onChange={formikAddPatient.handleChange("timeSpentAlone")}
                errorText={
                  formikAddPatient.touched.timeSpentAlone &&
                  formikAddPatient.errors.timeSpentAlone
                }
              />
            </Col>

            <Col md={6}>
              <DropDown
                label="Use of Electronic Device Before Sleep"
                placeholder="Select"
                options={yesNoData}
                setValue={(e) => {
                  formikAddPatient.setFieldValue("useOfElectronicDevice", e);
                }}
                value={formikAddPatient?.values?.useOfElectronicDevice}
                errorText={
                  formikAddPatient.touched.useOfElectronicDevice &&
                  formikAddPatient.errors.useOfElectronicDevice
                }
              />
            </Col>
            <Col md={6}>
              <DropDown
                label="Add Media"
                placeholder="Select"
                isMulti={true}
                options={mediaTypeData}
                setValue={handleMediaSelect}
                value={Object.keys(docs).map((label) => {
                  const option = mediaTypeData.find(
                    (item) => item.label === label
                  );
                  return option
                    ? option
                    : {
                        label,
                        value: label.toLowerCase().replace(/\s+/g, "_"),
                      };
                })}
              />
            </Col>
            {Object.keys(docs).map((type) => {
              const uploadedFiles = docs[type] || [];
              const uploaderSlots = uploaders[type] || [];

              // ✅ Always allow adding a new uploader, as long as there are fewer than 2 uploaders
              const canAddMore = uploaderSlots.length < 2;

              return (
                <div key={type} className={classes.tagGroup}>
                  <div className={classes.tagWrapper}>
                    <div className={classes.tag}>
                      <span>{type}</span>
                    </div>
                  </div>
                  <MultiFileUpload
                    // key={idx}
                    files={docs[type]} // Use uploaderFiles specific to each uploader
                    acceptedFiles={getSupportedImageTypes("all")}
                    maxFileCount={2}
                    supportedFiles="File formats pdf and Word Doc,JPEG,PNG,TIFF,DICOM,Excel,TEXT FILE,POWER POINT,ZIP "
                    // disable={isDisabled} // Disable if files already exist in the uploader
                    Delete={Delete}
                    setFiles={(f) => {
                      // const updatedFiles = [...uploaderFiles, ...f];
                      // const updatedUploaders = { ...uploaders };
                      // updatedUploaders[type][idx] = { files: updatedFiles };
                      // setUploaders(updatedUploaders);

                      // Ensure docs are updated with the new files for this specific type
                      handleUploadMedia(f, type, 2, setDocs, docs);
                    }}
                    removeFileCb={(key) => {
                      let updatedDocs = { ...docs };
                      updatedDocs[type] = (docs[type] || []).filter(
                        (file) => file.key !== key
                      );
                      setDocs(updatedDocs);
                    }}
                  />

                  {/* Uploaders */}
                  {/* {uploaderSlots.map((uploader, idx) => {
                    const uploaderFiles = uploader.files || [];
                    const isDisabled = uploaderFiles.length > 0; // Disable if files are uploaded

                    console.log("docs[type]",docs[type])

                    return (
                      <MultiFileUpload
                        key={idx}
                        files={docs[type]} // Use uploaderFiles specific to each uploader
                        acceptedFiles={getSupportedImageTypes("pdf")}
                        maxFileCount={2}
                        disable={isDisabled} // Disable if files already exist in the uploader
                        Delete={Delete}
                        setFiles={(f) => {
                          const updatedFiles = [...uploaderFiles, ...f];
                          const updatedUploaders = { ...uploaders };
                          updatedUploaders[type][idx] = { files: updatedFiles };
                          setUploaders(updatedUploaders);

                          // Ensure docs are updated with the new files for this specific type
                          handleUploadMedia(f, type, 2, setDocs, docs);
                        }}
                        removeFileCb={(key) => {
                          // Filter out the file from the uploader's files
                          const updatedUploaderFiles = uploaderFiles.filter(
                            (f) => f.key !== key
                          );
                          const updatedUploaders = { ...uploaders };
                          updatedUploaders[type][idx] = {
                            files: updatedUploaderFiles,
                          };
                          setUploaders(updatedUploaders);

                          // Remove the file from the docs[type] as well
                          const updatedDocs = {
                            ...docs,
                            [type]: (docs[type] || []).filter(
                              (file) => file.key !== key
                            ),
                          };
                          setDocs(updatedDocs);
                        }}
                      />
                    );
                  })} */}
                </div>
              );
            })}

            <Col md={12} className={classes?.buttonContainer}>
              <Button
                label={
                  loading == "addOrEditPatientRequest"
                    ? "Please Wait..."
                    : slug
                    ? "Update Patient"
                    : "Create Patient"
                }
                variant={"gradient"}
                onClick={formikAddPatient.handleSubmit}
                disabled={loading == "addOrEditPatientRequest"}
              />
            </Col>

            {/* {attachments?.length > 0 && (
              <>
                <h5 className={classes?.attachmentsHeading}>Attachments</h5>
                <div className={classes?.attachments}>
                  {attachments.map((item) => (
                    <ShowDocuments
                      key={item?.key}
                      item={item}
                      downloadDocumens={downloadDocumens}
                      loading={loading}
                      selectedKey={selectedKey}
                    />
                  ))}
                </div>
              </>
            )} */}
          </Row>
        </div>
      </Container>
      {["uploadingImages", "uploadingDocuments"].includes(
        isLoadingWithType
      ) && <LottieLoader />}
    </LayoutWrapper>
  );
}


