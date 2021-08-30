import React, { useEffect,useState } from 'react'
import Sidebar from './components/Sidebar'
import { Button, Col, Container, Row } from 'react-bootstrap'

import stamp from './registered.png'
import { db } from './firebase'
import EventRegistrationModal from './components/EventRegistrationModal'
import { useAuth } from './context/AuthProvider'
import SubmissionForm from './components/SubmissionForm'
import AdminDashboard from './components/AdminDashboard'

function Mysubmission() {
    const [events, setEvents] = useState()
    const {currentUser} = useAuth()
    const [registeredEvents, setRegisteredEvents] = useState([]);
    useEffect(()=>{
        if(currentUser && currentUser.registeredEvents)
        {
            setRegisteredEvents(currentUser.registeredEvents)
        }
    },[currentUser])
    useEffect(()=>{
        db.collection("events").onSnapshot((documents)=>{
            
            if(!documents.empty)
            {
                var eventlist =[]
                documents.forEach((doc)=>{

                    eventlist.push({id:doc.id,...doc.data()})
                })

                setEvents(eventlist)
            }
        })
    },[])

    return (
        <Container fluid={true}>
        <Row>
            <Col lg={1}>
            <Sidebar />
            </Col>
            <Col lg={11}>
            <Container fluid>
                                <Row className="mt-5">
                                    {
                                        (registeredEvents.includes("thewallarticle") || registeredEvents.includes("thewallartwork") 
                                        || registeredEvents.includes("thewallpoetry") || registeredEvents.includes("shutterbugshortvideos") 
                                        || registeredEvents.includes("shutterbugphotos")) && (
                                        <h1 className="section-heading">My Submission</h1>
                                        )
                                    }
                                    {
                                           currentUser.submitted ? (Object.keys(currentUser.submitted).length >0 && Object.keys(currentUser.submitted).map((submission,i)=>{
                                            console.log(submission)
                                            return(
                                            <>
                                                <div className="my_submission text-light">
                                                    <h5>{(submission ==='thewallpoetry' || submission ==='thewallarticle' || submission ==='thewallartwork') && "The Wall"} </h5>

                                                    <h5>{(submission ==='shutterbugshortvideos') && "Reel Lens"} </h5>
                                                    <h5>{(submission ==='shutterbugphotos') && "Shutterbug"} </h5>
                                                    <br></br>
                                                    <p>{currentUser.submitted[submission].submission1Link}</p>  
                                                    <p> {currentUser.submitted[submission].submission2Link}</p>   
                                                </div>
                                            </>)
                                        })):(
                                            <div className="my_submission text-light">
                                                    <h5>you haven't yet submitted :( </h5>
                                            </div>
                                        )

                                    }
                                </Row>
                                </Container>
                                    
            </Col>
        </Row>
        </Container>
    )
}

export default Mysubmission
