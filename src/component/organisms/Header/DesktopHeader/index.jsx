import { NAV_DATA } from "@/developmentContent/appData";
import { mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import classes from "./DesktopHeader.module.css";
import Button from "@/component/atoms/Button";

export default function DesktopHeader({ isScroll, logout }) {
  // const router = useRouter();

  // const { accessToken } = useSelector((state) => state?.authReducer);
  // const accessToken = false;
  // const pathName = usePathname();

  return (
    <div className={classes.mainDiv}>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={mergeClass(isScroll && classes.afterScroll, classes.header)}
        id={"navDesktopHeader"}
      >
        <Container>
          <Row className="w-100">
            <Col md={12} className="p-0">
              <div className={classes.mainHeader}>
                <div className={classes.logoDiv}>
                  <Image src={"/Images/app-images/logo.svg"} alt="logo" fill />
                </div>

                {/* navigation */}
                <div className={classes.headerRight}>
                  <div className={classes.navigationDiv}>
                    {NAV_DATA?.map((item, index) => (
                      <Link
                        key={index}
                        href={item?.route}
                        className={mergeClass(
                          classes.link,
                          "fs-16-inter"
                          // item?.route === pathName && classes.activeLink
                        )}
                      >
                        {item?.title}
                      </Link>
                    ))}
                  </div>
                  <div className={classes.navBtn}>
                    <Button label={"Get Started"} variant={"gradient"} />
                  </div>
                </div>
                {/* navigation */}
              </div>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
}
