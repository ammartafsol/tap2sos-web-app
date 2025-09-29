// Auth pages that logged-in users should be redirected away from
export const AUTH_ROUTES = [
  "/login",
  "/sign-up", 
  "/forget-password",
  "/otp",
  "/reset-password",
];

// Public pages that anyone can access
export const PUBLIC_ROUTES = [
  "/",
  "/about-us",
  "/contact-us", 
  "/how-it-works",
  "/privacy-policy",
  "/terms-and-conditions",
];

// Routes that require login
export const PROTECTED_ROUTES = [
  "/clinic/dashboard",
  "/clinic/patient",
  "/clinic/patient/create",
  "/clinic/patient/[slug]",
  "/clinic/patient/[slug]/edit",
  "/profile",
];

// Legacy exports for backward compatibility
export const WITHOUT_LOGIN_ROUTES = [...AUTH_ROUTES, ...PUBLIC_ROUTES];
export const CLINIC_AFTER_LOGIN_ROUTES = [...PROTECTED_ROUTES, ...PUBLIC_ROUTES];
