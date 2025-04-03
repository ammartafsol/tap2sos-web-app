import React from 'react'
import classes from "./AboutUs.module.css"
import LayoutWrapper from '@/component/atoms/LayoutWrapper'
import TopHeader from '@/component/atoms/TopHeader'
import { Container } from 'react-bootstrap'

const AboutUs = () => {
  return (
    <LayoutWrapper>
        <Container>
       <TopHeader />
        </Container>
    </LayoutWrapper>
  )
}

export default AboutUs