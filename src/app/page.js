import LandingView from "@/component/templates/Website/LandingView";
import React from "react";
import { getApi } from "@/interceptor/server-side-getApi";

export default async function LandingPage() {
  const data = await getApi(`cms/pages/homePage`);
  console.log("🚀 Landing Page Data:", data)
  return <LandingView landingPageData={data?.data} />;
}

