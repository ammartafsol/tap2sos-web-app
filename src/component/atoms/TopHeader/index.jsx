"use client";

import React from "react";
import classes from "./TopHeader.module.css";
import { usePathname } from "next/navigation";
import { formatPathname } from "@/resources/utils/helper";


const TopHeader = () => {
  const pathname = usePathname();
  const formattedName = formatPathname(pathname);

  return (
    <div className={classes?.TopHeader}>
      <h4>{formattedName}</h4>
      <ul className={classes?.pageMenu}>
        <li>Home</li>
        <li>{formattedName}</li>
      </ul>
    </div>
  );
};

export default TopHeader;
