"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import RenderToast from "@/component/atoms/RenderToast";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";

const Header = () => {
  // const cmsData = useSelector((state) => state?.commonReducer?.cms?.footer);
  // const { user } = useSelector((state) => state?.authReducer);

  // const dispatch = useDispatch();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  // const logout = async () => {
  //   dispatch(signOutRequest());

  //   Cookies.remove("_xpdx");

  //   router.push("/");
  //   RenderToast(`Successfully logout`, "success");
  // };

  function onScroll() {
    if (window.scrollY > 160) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  }
  useEffect(() => {
    window?.addEventListener("scroll", onScroll);
    isMobileViewHook(setIsMobile, 992);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileHeader  />
      ) : (
        <DesktopHeader isScroll={isScroll} />
      )}
    </>
  );
};

export default Header;
