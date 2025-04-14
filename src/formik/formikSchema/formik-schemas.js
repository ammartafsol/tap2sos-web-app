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
