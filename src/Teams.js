import React from 'react'
import './styles/teams.css'
import cloud from './cloud.png'
import Navbar from './components/Navbar'
import {Col, Container, Row} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'

function Teams() {
    return (
        <>
        <div class="stars"></div>
            <div class="twinkling"></div>
            <div class="clouds" style={{ backgroundImage: `url(${cloud})` }}></div>
            <Navbar/>
        <Container >
        <h1 class="hero glitch layers no_background section_heading_team"  data-text="The Team"><span>The Team</span></h1>
            <Row>
                <Col lg={3} xs={3}>
                    <div class="card card1">
                        <div class="border">
                        <h2>Ben Stiller</h2>
                        <div class="icons">
                            <i class="fa fa-codepen" aria-hidden="true"></i>
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                            <i class="fa fa-dribbble" aria-hidden="true"></i>
                            <i class="fa fa-twitter" aria-hidden="true"></i>
                            <i class="fa fa-facebook" aria-hidden="true"></i>
                        </div>
                        </div>
                    </div>
                </Col>
                <Col lg={3}>
                    <div class="card card1">
                        <div class="border">
                        <h2>Ben Stiller</h2>
                        <div class="icons">
                            <i class="fa fa-codepen" aria-hidden="true"></i>
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                            <i class="fa fa-dribbble" aria-hidden="true"></i>
                            <i class="fa fa-twitter" aria-hidden="true"></i>
                            <i class="fa fa-facebook" aria-hidden="true"></i>
                        </div>
                        </div>
                    </div>
                </Col>
                <Col lg={3}>
                    <div class="card card1">
                        <div class="border">
                        <h2>Ben Stiller</h2>
                        <div class="icons">
                            <i class="fa fa-codepen" aria-hidden="true"></i>
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                            <i class="fa fa-dribbble" aria-hidden="true"></i>
                            <i class="fa fa-twitter" aria-hidden="true"></i>
                            <i class="fa fa-facebook" aria-hidden="true"></i>
                        </div>
                        </div>
                    </div>
                </Col>
                <Col lg={3}>
                    <div class="card card1">
                        <div class="border">
                        <h2>Ben Stiller</h2>
                        <div class="icons">
                            <FontAwesomeIcon className="fa" icon={faGithub} />
                            <FontAwesomeIcon className="fa" icon={faFacebook} />
                            <FontAwesomeIcon className="fa" icon={faInstagram} />
                        </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
        
    )
}

export default Teams
