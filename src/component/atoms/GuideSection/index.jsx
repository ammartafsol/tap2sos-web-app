import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import GuideCard from '../GuideCard';
import classes from "./GuideSection.module.css"

const GuideSection = ({data,removeBorder}) => {
    console.log("data",data);
  return (
    <div className={classes.guideSection}>
        <Container>
          <Row>
            <Col md={12} className="">
              <div className={classes.guideHead}>
                <h2>{data?.title}</h2>
                <p>{data?.description}</p>
              </div>
              <div className={classes.guideCardWrapper}>
                <Row className='gy-3'>
                  {data?.guideCards?.map((data, index) => {
                    return (
                      <Col md={6} lg={4} xl={3} key={index}>
                        <GuideCard removeBorder={removeBorder} data={data} />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default GuideSection