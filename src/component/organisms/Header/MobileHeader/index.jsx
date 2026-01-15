import PropTypes from "prop-types";
import Image from "next/image";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import Drawer from "react-modern-drawer";
import classes from "./MobileHeader.module.css";
import Link from "next/link";
import { NAV_DATA } from "@/developmentContent/appData";
import { mergeClass } from "@/resources/utils/helper";
import { usePathname, useRouter } from "next/navigation";

export default function MobileHeader({ logout }) {
  const pathName = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={12}>
            <div className={classes.header}>
              <Row>
                <Col xs={8}>
                  <button
                    type="button"
                    onClick={() => { router.push('/'); }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        router.push('/');
                      }
                    }}
                    className={classes.logoDiv}
                    aria-label="Go to homepage"
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                  >
                    <Image
                      src={"/Images/app-images/logo.svg"}
                      alt="logo"
                      fill
                    />
                  </button>
                </Col>
                <Col xs={4}>
                  <button
                    type="button"
                    className={classes.navHamIcon}
                    onClick={toggleDrawer}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleDrawer();
                      }
                    }}
                    aria-label="Toggle navigation menu"
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                  >
                    <HiOutlineBars3BottomLeft
                      size={32}
                      color="var(--primary-color)"
                    />
                  </button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <Drawer open={isOpen} onClose={toggleDrawer} direction="right">
        <div className={classes.drawerDiv}>
          <div className={classes.drawerLogo}>
            <Image src={"/Images/app-images/logo.svg"} alt="logo" fill />
          </div>
        </div>
        <div className={classes.navigationDiv}>
          {NAV_DATA?.map((item) => {
            const navKey = item?.route || item?.title || `nav-${Math.random()}`;
            return (
              <Link
                key={navKey}
                href={item?.route}
                className={mergeClass(
                  classes.link,
                  "fs-16-inter",
                  item?.route === pathName && classes.activeLink
                )}
              >
                {item?.title}
              </Link>
            );
          })}
        </div>
      </Drawer>
    </>
  );
}

MobileHeader.propTypes = {
  logout: PropTypes.func.isRequired,
};
