import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cloud from './cloud.png'
import { db } from './firebase';
import './styles/landingPage.css'
import './styles/explode.css'
import { Col, Container, Row } from 'react-bootstrap';

function LandingPage() {

    const {id} = useParams();
    const [eventDetails, setEventDetails] = useState([])

    useEffect(()=>{
        db.collection("events").doc(id).get().then((data)=>{
            if(!data.empty){
                setEventDetails({ id:id,...data.data()})
            }
        }).catch((err)=>{console.log(err)})
    },[id])

    return (
        <>
            <div class="stars"></div>
            <div class="twinkling"></div>
            <div class="clouds" style={{ backgroundImage: `url(${cloud})` }}></div>

            
            
            <div className="parent__container" style={{ position: 'relative', zIndex: '999999999'}}>
                <div className="frame__nav" >
                    <ul>
                        <li>
                            <a href="#">
                                <button class="navigation__button">The Team</button>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <button class="navigation__button">Contact Us</button>
                            </a>
                        </li>
                        <li>
                            <a href="/login">
                                <button class="navigation__button">Login</button>
                            </a>
                        </li>
                        <li>
                            <a href="/register">
                                <button class="navigation__button">Register</button>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="landing__container">
                    <Container fluid>
                        <Row>
                            <Col lg={4}><div className="landing__image">
                                            {eventDetails && eventDetails.name?.length>0 && <img src={`/posters/${eventDetails.id}.jpeg`} />}
                                        </div>
                            </Col>
                            <Col lg={8}>
                            <div className="landing__content">
                                <span className="landingEvent__title glitch layers" data-text={eventDetails.name}>{eventDetails.name}</span>
                                <div className="landing__description" dangerouslySetInnerHTML={{__html:eventDetails.description}} />
                                <div className="landing__description" dangerouslySetInnerHTML={{__html:eventDetails.rules}} />
                                <div style={{fontSize: '14px'}}>
                                    {eventDetails && eventDetails.name?.length>0 && (<Link to="/register" class="learn-more">
                                        <button class="learn-more ml-2">
                                            <span class="circle" aria-hidden="true">
                                            <span class="icon arrow"></span>
                                            </span>
                                            <span class="button-text">Register</span>
                                        </button>
                                    </Link>)}
                                </div>
                            </div>
                            </Col>
                        </Row>
                    </Container>
                    
                </div>
            </div>
            
        </>
    )
}

export default LandingPage
