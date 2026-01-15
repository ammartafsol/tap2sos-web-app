import PropTypes from "prop-types";
import { AFTER_LOGIN_NAV_DATA, NAV_DATA } from "@/developmentContent/appData";
import { MediaUrl, mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Navbar, OverlayTrigger, Row } from "react-bootstrap";
import classes from "./DesktopHeader.module.css";
import Button from "@/component/atoms/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function DesktopHeader({ isScroll, logout }) {
  const router = useRouter();

  const { isLogin, user } = useSelector((state) => state?.authReducer);
  const [show, setShow] = useState(false);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={mergeClass(isScroll && classes.afterScroll, classes.header)}
      id={"navDesktopHeader"}
    >
      <Container className="g-0">
        <Row className="g-0 w-100">
          <Col md={12} className="p-0">
            <div className={classes.mainHeader}>
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
                <Image src={"/Images/app-images/logo.svg"} alt="logo" fill />
              </button>

              {/* navigation */}
              <div className={classes.headerRight}>
                <div className={classes.navigationDiv}>
                  {NAV_DATA?.map((item) => {
                    const navKey = item?.route || item?.title || `nav-${Math.random()}`;
                    return (
                      <Link
                        key={navKey}
                        href={item?.route}
                        className={mergeClass(classes.link, "fs-16-inter")}
                      >
                        {item?.title}
                      </Link>
                    );
                  })}
                </div>
                {isLogin ? (
                  <OverlayTrigger
                   rootClose
                    trigger={["click"]}
                    placement={"bottom-end"}
                    overlay={
                      <div className={classes.overlayContainer}>
                        <p className={classes.userName}>{user?.clinicName}</p>
                        {AFTER_LOGIN_NAV_DATA?.map((item) => {
                          const overlayKey = item?.route || item?.title || `overlay-nav-${Math.random()}`;
                          return (
                            <Link
                              key={overlayKey}
                              href={item?.route}
                              className={mergeClass(classes.overLayLinks)}
                              onClick={() => { setShow(false); }}
                            >
                              {item?.title}
                            </Link>
                          );
                        })}
                        <button
                          type="button"
                          className={classes.overLayLinks}
                          onClick={() => { logout(); setShow(false); }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              logout();
                              setShow(false);
                            }
                          }}
                          aria-label="Logout"
                          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", width: "100%", textAlign: "left" }}
                        >
                          Logout
                        </button>
                      </div>
                    }
                    show={show}
                    onToggle={() => setShow(!show)}
                  >
                    <div className={classes.profileImg}>
                      <Image
                        src={
                          MediaUrl(user?.photo) ||
                          "/Images/app-images/user-avatar.png"
                        }
                        alt="profile"
                        fill
                      />
                    </div>
                  </OverlayTrigger>
                ) : (
                  <div className={classes.navBtns}>
                    <Button
                      label={"Get Started"}
                      variant={"gradient"}
                      onClick={() => {
                        router.push("/sign-up");
                      }}
                    />
                    <Button
                      label={"Login"}
                      variant={"primary"}
                      onClick={() => {
                        router.push("/login");
                      }}
                      customStyle={{
                        padding: "10px 25px",
                      }}
                    />
                  </div>
                )}
              </div>
              {/* navigation */}
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

DesktopHeader.propTypes = {
  isScroll: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

DesktopHeader.defaultProps = {
  isScroll: false,
};
