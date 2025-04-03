import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./LandingView.module.css";

export default function LandingView() {
  return (
    <>
      <LayoutWrapper>
        <div>
          <Container>
            <Row>
              <Col md={6}>
                <div className={classes.heroLeft}>
                  <h1>
                    Revolutionizing Healthcare Data with
                    <span>COTIC & Blockchain</span>
                  </h1>
                  <p>
                    Securely retrieve, store, and manage patient data using
                    COTIC and blockchain technology. Fast, reliable, and
                    immutable healthcare data access for hospitals and clinics.
                  </p>
                  <div className={classes.storeImages}>
                    <Image
                      src={"/Images/app-images/appStore.png"}
                      fill
                      alt="app img"
                    />
                    <Image
                      src={"/Images/app-images/googleStore.png"}
                      fill
                      alt="app img"
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className={classes.heroRightDiv}>
                  <div className={classes.rightImg}>
                    <Image
                      src={"/Images/app-images/hero.png"}
                      fill
                      alt="hero img"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutWrapper>
    </>
  );
}
