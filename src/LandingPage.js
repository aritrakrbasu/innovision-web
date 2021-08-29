import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cloud from './cloud.png'
import { db } from './firebase';
import './styles/landingPage.css'
import './styles/explode.css'
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from './components/Navbar';

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
            
            <div className="parent__container2" style={{ position: 'relative', zIndex: '99999999'}}>
                <Navbar />
            </div>

            <div className="parent__container" style={{ position: 'relative', zIndex: '999999999'}}>
                <div className="landing__container">
                    <Container fluid>
                        <Row noGutters>
                            <Col lg={4} xl={4}><div className="landing__image">
                                            {eventDetails && eventDetails.name?.length>0 && <img src={`/posters/${eventDetails.id}.jpeg`} />}
                                        </div>
                            </Col>
                            <Col lg={8} xl={8}>
                            <div className="landing__content">
                                <span className="landingEvent__title glitch layers" data-text={eventDetails.name}>{eventDetails.name}</span>
                                <div className="landing__description" dangerouslySetInnerHTML={{__html:eventDetails.description}} />
                                <div className="landing__description" dangerouslySetInnerHTML={{__html:eventDetails.rules}} />
                                <div style={{fontSize: '14px'}}>
                                    {eventDetails && eventDetails.name?.length>0 && (<Link to="/register" class="learn-more">
                                        <button class="learn-more ml-2 mb-3">
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
