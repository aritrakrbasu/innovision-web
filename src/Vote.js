import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import Sidebar from './components/Sidebar'
import commingsoon from './comming_soon.svg'
import './styles/commingsoon.css'
function Vote() {
    return (
        <Container fluid={true}>
        <Row>
          <Col lg={1}>
          <Sidebar />
          </Col>
          <Col lg={11}>
          <Container fluid className="comming_soon_holder">
              <Image src={commingsoon} className="comming_soon_image"></Image>
              <p>comming soon</p>
          </Container>
          </Col>
          </Row>
          </Container>
    )
}

export default Vote
