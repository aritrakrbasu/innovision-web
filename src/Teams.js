import React, { useEffect,useState } from 'react'
import './styles/teams.css'
import cloud from './cloud.png'
import Navbar from './components/Navbar'
import {Col, Container, Row} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { db } from './firebase'
import { faPhone, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'

function Teams() {

    const [teamMembers, setTeamMembers] = useState()

    useEffect(()=>{
        db.collection("users").where("isCoordinator","==",true).get().then((docs)=>{
            if(!docs.empty)
            {
                var coordinators = []
                docs.forEach((doc)=>{
                    coordinators.push({id:doc.id,...doc.data()})
                })
                setTeamMembers(coordinators)
            }
        })
    },[])
    return (
        <>
        <div class="stars"></div>
            <div class="twinkling"></div>
            <div class="clouds" style={{ backgroundImage: `url(${cloud})` }}></div>
            <Navbar/>
        <Container >
        <h1 class="hero glitch layers no_background section_heading_team"  data-text="The Team"><span>The Team</span></h1>
            <Row>
            {teamMembers && teamMembers.length > 0 && teamMembers.map((member)=>{
                if(member.isPhotoUrl)
                {
                    return(<Col lg={3}>
                        <>
                        <div class="card card1" style={{background:`url(${member.photoURL})`}}>
                            <div class="border">
                            <h2>{member.extras}</h2>
        
                            <div class="icons">
                                {member?.phoneNumber &&(<a href={"tel:"+member.phoneNumber} target="_blank"><FontAwesomeIcon className="fa" icon={faPhoneAlt} /></a>) }
                                {member?.gitID &&(<a href={member.gitID} target="_blank"><FontAwesomeIcon className="fa" icon={faGithub} /></a>) }
                                {member?.fbID &&(<a href={member.fbID} target="_blank"><FontAwesomeIcon className="fa" icon={faFacebook} /></a>) }
                                {member?.insID &&(<a href={member.insID} target="_blank"><FontAwesomeIcon className="fa" icon={faInstagram} /></a>) }
                            </div>
                            </div>
                        </div>
        
                        <h1 class="hero glitch layers no_background mobile_cen" data-text={member.displayName}><span>{member.displayName}</span></h1>
                        </>
                    </Col>)
                }else
                {
                    return(<Col lg={3}>
                        <>
                        <div class="card card1" style={{background:`url(./member/${member.id}.jpeg)`}}>
                            <div class="border">
                            <h2>{member.extras}</h2>
        
                            <div class="icons">
                                {member?.phoneNumber &&(<a href={"tel:"+member.phoneNumber} target="_blank"><FontAwesomeIcon className="fa" icon={faPhoneAlt} /></a>) }
                                {member?.gitID &&(<a href={member.gitID} target="_blank"><FontAwesomeIcon className="fa" icon={faGithub} /></a>) }
                                {member?.fbID &&(<a href={member.fbID} target="_blank"><FontAwesomeIcon className="fa" icon={faFacebook} /></a>) }
                                {member?.insID &&(<a href={member.insID} target="_blank"><FontAwesomeIcon className="fa" icon={faInstagram} /></a>) }
                            </div>
                            </div>
                        </div>
        
                        <h1 class="hero glitch layers no_background mobile_cen" data-text={member.displayName}><span>{member.displayName}</span></h1>
                        </>
                    </Col>)
                }
                
            }) }
            </Row>
        </Container>
        </>
        
    )
}

export default Teams
