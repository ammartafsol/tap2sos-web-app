import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
});

export const signUpSchema = Yup.object().shape({
  clinicName: Yup.string().required("Clinic Name is required."),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required."),
  city: Yup.string().optional(),
  state: Yup.string().optional(),
  country: Yup.string().optional(),
  address: Yup.string().optional(),
  latitute: Yup.string().optional(),
  longitute: Yup.string().optional(),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, "Phone number is not valid")
    .optional(),
  callingCode: Yup.string().optional(),
});

export const ForgetPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email field is required"),
});

export const ResetPasswordSchema = Yup.object({
  newPassword: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export const profileSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  // phoneNumber: Yup.number("Invalid").required("Phone number name is required"),
});

export const updatePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string().required("New password is required"),
  reEnterNewPassword: Yup.string()
    .required("Re-enter new password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});
export const getAddPatientValidationSchema = (slug) => {
  const baseSchema = {
    patientNo: Yup.string().required("Patient No is required."),
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required."),
    medicalCondition: Yup.string().optional(),
    usefulInformation: Yup.string().optional(),
    organDonor: Yup.object().required(
      "Please select if you are an organ donor."
    ),
    bloodType: Yup.object().required("Please select your blood type."),
    gender: Yup.object().required("Gender is required."),
    dateOfBirth: Yup.date().required("Date of Birth is required."),
    doctorName: Yup.string().required("Doctor full name is required."),
    phoneNumber: Yup.string().required("Phone number is required."),
    callingCode: Yup.string().optional(),
    emergencyContact: Yup.string().required(
      "Emergency contact number is required."
    ),
    emergencyCallingCode: Yup.string().optional(),
    pesel: Yup.string().optional(),
    education: Yup.string().optional(),
    job: Yup.string().optional(),
    civilStatus: Yup.object().optional(),
    familyHistoryOfDementia: Yup.object().optional(),
    economicStatus: Yup.object().optional(),
    height: Yup.string().optional(),
    weight: Yup.string().optional(),
    bmi: Yup.string().optional(),
    waistCircumference: Yup.string().optional(),
    bloodPressure: Yup.string().optional(),
    heartRate: Yup.string().optional(),
    hyperTension: Yup.object().optional(),
    diabetes: Yup.object().optional(),
    heartDisease: Yup.object().optional(),
    liverDisease: Yup.object().optional(),
    renalDisease: Yup.object().optional(),
    obesity: Yup.object().optional(),
    mentalIllness: Yup.object().optional(),
    others: Yup.string().optional(),
    medicationTaken: Yup.string().optional(),
    smoking: Yup.string().optional(),
    alcoholConsumption: Yup.string().optional(),
    physicalExercise: Yup.string().optional(),
    sleepDuration: Yup.string().optional(),
    dietAdequacy: Yup.string().optional(),
    cognitiveStimulation: Yup.object().optional(),
    relaxationTechniques: Yup.string().optional(),
    timeSpentAlone: Yup.string().optional(),
    useOfElectronicDevice: Yup.object().optional(),
    waterConsumption: Yup.string().optional(),
  };

  if (!slug) {
    baseSchema.password = Yup.string()
      .min(8, "Password must be at least 8 characters long.")
      .required("Password is required.");

    baseSchema.confirmPassword = Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required.");
  }

  return Yup.object().shape(baseSchema);
};
