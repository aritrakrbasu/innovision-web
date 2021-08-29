import React, { useEffect,useState } from 'react'
import Sidebar from './components/Sidebar'
import { Button, Col, Container, Row } from 'react-bootstrap'

import stamp from './registered.png'
import { db } from './firebase'
import EventRegistrationModal from './components/EventRegistrationModal'
import { useAuth } from './context/AuthProvider'
import SubmissionForm from './components/SubmissionForm'



function Dashboard() {

    const [events, setEvents] = useState()
    const [show, setShow] = useState(false);
    const [showSubmission, setshowSubmission] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [githubReq, setGithubReq] = useState(false);
    const [hackerrankReq, setHackerrankReq] = useState(false);
    const [teamNameReq, setTeamNameReq] = useState(false);
    const [maxTeamMembers, setMaxTeamMembers] = useState(1);
    const [selectedRules, setSelectedRules] = useState();
    const [selectedDescription, setSelectedDescription] = useState();
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [eventData, setEventData] = useState();

    const {currentUser} = useAuth()

    const handleClose = (id) => {
        setShow(false)
        setshowSubmission(false)
    }
    const handleShow = (event) => {
        setShow(true)
        setSelectedId(event.id)
        setSelectedRules(event.rules)
        setSelectedDescription(event.description)
        if(event.hasOwnProperty("githubRequired") && event.githubRequired){
            setGithubReq(true)
        } else {
            setGithubReq(false)
        }
        if(event.hasOwnProperty("teamNameRequired") && event.teamNameRequired){
            setTeamNameReq(true)
        } else {
            setTeamNameReq(false)
        }
        if(event.hasOwnProperty("maxTeamSize") && event.maxTeamSize){
            setMaxTeamMembers(event.maxTeamSize)
        } else {
            setMaxTeamMembers(1)
        }
        if(event.hasOwnProperty("hackerrankRequired") && event.hackerrankRequired){
            setHackerrankReq(true)
        } else {
            setHackerrankReq(false)
        }
    }

    const showForm = (event) => {
        setshowSubmission(true)
        setEventData(event)
    }

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


    useEffect(()=>{
        if(currentUser && currentUser.registeredEvents)
        {
            setRegisteredEvents(currentUser.registeredEvents)
        }
    },[currentUser])
    
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
                    <h1 className="section-heading">Submission</h1>
                    )
                }
                
            {events && events.length>0 && events.map((event,index)=>{
                if(index > 0)
                {
                    
                }
                if( registeredEvents.includes(event.id))
                {
                    if(event.id === "thewallarticle"|| event.id === "thewallartwork"||event.id === "thewallpoetry"||event.id ==="shutterbugshortvideos"||event.id ==="shutterbugphotos")
                    {
                        return(
                            <Col lg={2} xs={6} md={2} className="item-container" key={index}>
                            <div className="item-holder ">
                            <Button className="event_register p-0 " onClick={()=>showForm(event)}> 
                                <img src={`./icon/${event.id}.png`} className="item-holder-image img-fluid" />
                                </Button>
                                <div className="item__nameStyle">{event.name}</div>
                            </div>
                            
                        </Col>
                    )
                    }else
                    return null
                }else
                return null

            })}         
                
            </Row>
        </Container>



            <Container fluid>
            <h1 className="section-heading">Events</h1>
            <Row>
                {events && events.length>0 && events.map((event,index)=>{
                    if(registeredEvents.includes(event.id))
                    {
                        return(
                            <Col lg={2} md={2} className="item-container" key={index}>
                                <div className="item-holder">
                                    <img src={`./posters/${event.id}.jpeg`} className="item-holder-image img-fluid" />
                                    <div className="registered_overlay">
                                        <img src={stamp}  className="stamp"/>
                                    </div>
                                    <div className="item__nameStyle">{event.name}</div>
                                    <h3 className="item-creator">{event.type}</h3>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                </div>
                                
                            </Col>
                        )
                    }else
                    {
                        return(
                            <Col lg={2} md={2} className="item-container" key={index}>
                                <div className="item-holder">
                                    <img src={`./posters/${event.id}.jpeg`} className="item-holder-image img-fluid" />
                                    <div className="item-name">{event.name}</div>
                                    <h3 className="item-creator">{event.type}</h3>
                                    
                                    <Button className="event_register" onClick={()=>handleShow(event)}> <span class="major">Register</span> </Button>
                                </div>
                            </Col>
                        )
                    }
                }
                )}          
                
            </Row>
        </Container>

            </Col>
          </Row>

          <EventRegistrationModal show={show} rules={selectedRules} description={selectedDescription}  eventid={selectedId} githubRequired={githubReq} hackerrankRequired={hackerrankReq} teamNameRequired={teamNameReq} maxTeamMembers={maxTeamMembers} onHide={handleClose}/>

          <SubmissionForm  show={showSubmission} onHide={handleClose} eventData={eventData}/>
        </Container>
    )
}

export default Dashboard
