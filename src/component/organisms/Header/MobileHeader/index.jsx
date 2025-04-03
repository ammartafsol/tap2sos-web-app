import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import Drawer from "react-modern-drawer";
import classes from "./MobileHeader.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/component/atoms/Button";
import { NAV_DATA } from "@/developmentContent/appData";

export default function MobileHeader({ logout }) {
  // const { accessToken } = useSelector((state) => state?.authReducer);
  const accessToken = false;
  const pathName = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={classes.header}>
      <Container>
        <Row>
          <Col xs={11}>
            <div className={classes.logoDiv}>
              <Image
                src={"/images/app-images/primary-logo.png"}
                alt="logo"
                fill
              />
            </div>
          </Col>
          <Col xs={1}>
            <div onClick={toggleDrawer}>
              <HiOutlineBars3BottomLeft
                size={32}
                color="var(--primary-color)"
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
      >
        <div className={classes.drawerDiv}>
          <div className={classes.drawerLogo}>
            <Image src={"/images/app-images/white-logo.png"} alt="logo" fill />
          </div>
        </div>
        <div className={classes.navigationDiv}>
          {NAV_DATA?.map((item, index) => (
            <Link
              key={index}
              href={item?.route}
              className={mergeClass(
                classes.link,
                "fs-16-inter",
                item?.route === pathName && classes.activeLink
              )}
            >
              {item?.title}
            </Link>
          ))}
        </div>
        <div className={classes.buttonSection}>
          {accessToken ? (
            <div className={classes.buttonDiv}>
              <Button
                variant="primary"
                label={"Dashboard"}
                className={classes.dashboardButton}
              />
              <Button label={"Log Out"} variant="outlined" onClick={logout} />
            </div>
          ) : (
            <div className={classes.buttonDiv}>
              <Button
                label={"Sign Up"}
                variant="primary"
                onClick={() => router?.push("/signup")}
              />
              <Button
                label={"Log In"}
                variant="outlined"
                onClick={() => router?.push("/signin")}
              />
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}
