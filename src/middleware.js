import { NextResponse } from "next/server";
import {
  AUTH_ROUTES,
  PUBLIC_ROUTES,
  PROTECTED_ROUTES,
} from "./developmentContent/routes";
import { handleDecrypt } from "./resources/utils/helper";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const role = handleDecrypt(request?.cookies.get("_xpdx_ur")?.value);
  const accessToken = handleDecrypt(request?.cookies.get("_xpdx")?.value);

  // Redirect logged-in users away from auth pages
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/clinic/dashboard", request.url));
  }

  // Redirect to login if trying to access protected routes without token
  if (!accessToken && PROTECTED_ROUTES.some(route => pathname.startsWith(route.replace('/[slug]', '')))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access to public routes and auth pages
  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|Images|fonts).*)"],
};
