import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useAuth } from '../context/AuthProvider'
import { db } from '../firebase'
import '../styles/admin.css'
import stamp from '../registered.png'

function AdminDashboard() {

    const {currentUser} = useAuth()
    const [events , setEvents]=useState([])

    useEffect(() => {
        
        if(currentUser.isCoordinator && currentUser.coordOf)
        {
            var coordinatorOf =currentUser.coordOf

            var array = coordinatorOf.split(',');

            var eventList = []

            array.forEach((eventName,index)=>{
                db.collection("events").doc(eventName).onSnapshot((doc)=>{
                    if(doc.exists)
                    {
                        eventList.push({id:doc.id,...doc.data()})
                    }
                })
            })

            setEvents(eventList)


        }
    }, [currentUser])
    return (
        <>
        <Container className="admin_dashboard">
            <h1 className="section-heading">Your Events</h1>
            <Row>
            {events && events.length>0 && events.map((event,index)=>{
                return(
                    <Col lg={3} md={2} className="item-container" key={index}>
                    <div className="item-holder">
                        <img src={`./posters/${event.id}.jpeg`} className="item-holder-image img-fluid" />
                        <div className="participant_count">
                            <span>Total Participants</span>
                            {event.participants.length}
                        </div>
                        <div className="item__nameStyle">{event.name}</div>
                        <h3 className="item-creator">{event.type}</h3>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                    
                </Col>)
            })}
            </Row>
        </Container>
        <Container>
            <Row>
            <h1 className="section-heading mt-4">Participation List</h1>
            {events && events.length>0 &&events.map((event)=>{
                if(event.id==='hackathon')
                {
                    return(
                        <>
                                <h1 className="section-heading-small mt-4">
                                    {event.name}
                                </h1>
                                <Table responsive striped bordered hover variant="light">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Team Name</th>
                                    <th>Team Members</th>
                                    <th>Phone Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event?.participants.map((participant,index)=>{
                                        return(<tr key={index}>
                                            <td>{index +1}</td>
                                            <td>{participant.teamName}</td>
                                            <td>
                                               {participant.member1name && ` Member 1 Name : ${participant.member1name} `}<br />
                                               {participant.member1Email && ` Member 1 Email : ${participant.member1Email} `}<br />
                                               {participant.githubId && ` Member 1 Github : ${participant.githubId} `}<br />
                                               {participant.member2Name && ` Member 2 Name : ${participant.member2Name} `}<br />
                                               {participant.member2Email && ` Member 2 Email : ${participant.member2Email} `}<br />
                                               {participant.githubId2 && ` Member 2 Github : ${participant.githubId2} `}<br />
                                               {participant.member3Name && ` Member 3 Name : ${participant.member3Name} `}<br />
                                               {participant.member3Email && ` Member 3 Email : ${participant.member3Email} `}<br />
                                               {participant.githubId3 && ` Member 3 Github : ${participant.githubId3} `}<br />
                                               {participant.member4Name && ` Member 4 Name : ${participant.member4Name} `}<br />
                                               {participant.member4Email && ` Member 4 Email : ${participant.member4Email} `}<br />
                                               {participant.githubId4 && ` Member 4 Github : ${participant.githubId4} `}<br />
                                            </td>
                                            <td>{participant.phoneNumber}</td>
                                        
                                            </tr>)
                                    })}
                                </tbody>
                            </Table>
                            </>
                    )
                }
                else if(event.id==='quiz')
                {
                    return(
                        <>
                                <h1 className="section-heading-small mt-4">
                                    {event.name}
                                </h1>
                                <Table responsive striped bordered hover variant="light">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Team Name</th>
                                    <th>Team Members</th>
                                    <th>Phone Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event?.participants.map((participant,index)=>{
                                        
                                        
                                        return(<tr key={index}>
                                            <td>{index +1}</td>
                                            <td>{participant.teamName}</td>
                                            <td>
                                               {` Member 1 Name : ${participant.name || participant.member1name} `}<br />
                                               {participant.member1Email && ` Member 1 Email : ${participant.member1Email} `}<br />
                                               {participant.member1Email && ` Member 2 Name : ${participant.member2Name} `}<br />
                                               {participant.member2Email && ` Member 2 Email : ${participant.member2Email} `}<br />
                                            </td>
                                            <td>{participant.phoneNumber}</td>
                                        
                                            </tr>)
                                    })}
                                </tbody>
                            </Table>
                            </>
                    )
                }
                else if(event.id==='codathon'){
                    return(
                        <>
                                <h1 className="section-heading-small mt-4">
                                    {event.name}
                                </h1>
                                <Table responsive striped bordered hover variant="light">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>HackerRank ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event?.participants.map((participant,index)=>{
                                        return(<tr key={index}>
                                            <td>{index +1}</td>
                                            <td>{participant.name || participant.member1name}</td>
                                            <td>{participant.member1Email}</td>
                                            <td>{participant.phoneNumber}</td>
                                            <td>{participant.hackerrankId}</td>
                                        
                                            </tr>)
                                    })}
                                </tbody>
                            </Table>
                            </>
                    )
                }
                else {
                    return(
                        <>
                                <h1 className="section-heading-small mt-4">
                                    {event.name}
                                </h1>
                                <Table responsive striped bordered hover variant="light">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event?.participants.map((participant,index)=>{
                                        return(<tr key={index}>
                                            <td>{index +1}</td>
                                            <td>{participant.name || participant.member1name}</td>
                                            <td>{participant.member1Email}</td>
                                            <td>{participant.phoneNumber}</td>
                                        
                                            </tr>)
                                    })}
                                </tbody>
                            </Table>
                            </>
                    )
                }
            })}
            </Row>
        </Container>
        <Container>
            <Row>
                {events && events.length>0 && events.map((event)=>{
                if(event.hasOwnProperty("submission")){
                    return(
                        <>
                            <h1 className="section-heading-small mt-4">
                                {`Submissions — ` + event.name}
                            </h1>
                            <Table responsive striped bordered hover variant="light">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Submissions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event.submission && event.submission.length>0 && event.submission.map((submission,index)=>{
                                        return(
                                            <tr>
                                                <td>{index +1}</td>
                                                <td>{submission.submittedByName}</td>
                                                <td>
                                                    {submission.hasOwnProperty("submission1Link") ? submission.submission1Link:''}
                                                    <br/>
                                                    {submission.hasOwnProperty("submission2Link") ? submission.submission2Link:''}
                                                </td>
                                            </tr>)
                                    })}
                                </tbody>
                            </Table>
                        </>
                    )
                }})}
            </Row>
        </Container>
        </>
    )
}

export default AdminDashboard
