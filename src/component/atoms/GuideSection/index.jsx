import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import GuideCard from '../GuideCard';
import classes from "./GuideSection.module.css";

const GuideSection = ({ data, removeBorder }) => {
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
                  {data?.guideCards?.map((cardData) => {
                    const cardKey = cardData?.id || cardData?.title || `guide-card-${cardData?.image}`;
                    return (
                      <Col md={6} lg={4} xl={3} key={cardKey}>
                        <GuideCard removeBorder={removeBorder} data={cardData} />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

GuideSection.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    guideCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
      })
    ),
  }).isRequired,
  removeBorder: PropTypes.bool,
};

GuideSection.defaultProps = {
  removeBorder: false,
};

export default GuideSection;