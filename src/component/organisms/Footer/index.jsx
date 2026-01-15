import { FOOTER_LINKS } from "@/developmentContent/appData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footerMain}>
      <div className={classes.footerLogo}>
        <Image src={"/Images/app-images/logo.svg"} alt="logo" fill />
      </div>
      <div className={classes.footerMenus}>
        <div className={classes.links}>
          {FOOTER_LINKS.map((link) => {
            const linkKey = link?.route || link?.title || `footer-link-${link.title}-${link.route}`;
            return (
              <Link key={linkKey} href={link.route} className={classes.link}>
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>
      <div className={classes.footerEmail}>
      info@newcotech.io
      </div>
      <div className={classes.footerBottom}>
        <p>© 2025 Tap2sos All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
