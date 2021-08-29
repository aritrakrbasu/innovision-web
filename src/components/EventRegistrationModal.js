import { wait, waitFor } from '@testing-library/react';
import React, { useRef,useState } from 'react'
import { Form, Modal,Button, Spinner, FormText } from 'react-bootstrap'
import { useAuth } from '../context/AuthProvider';
import { db, firebasevalue } from '../firebase';

function EventRegistrationModal(props) {
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState('');
    const [loading,setLoading]=useState(false)
    const {currentUser} = useAuth()
    const [githubId, setGithubId] = useState('')
    const [hackerrankId, setHackerrankId] = useState('')
    const [teamName, setTeamName] = useState('')
    const [member2Email,setMember2Email] = useState('')
    const [member3Email,setMember3Email] = useState('')
    const [member4Email,setMember4Email] = useState('')
    const [githubId2, setGithubId2] = useState('')
    const [githubId3, setGithubId3] = useState('')
    const [githubId4, setGithubId4] = useState('')

    function handleClose()
    {
        props.onHide()
        setChecked(false)
        setLoading(false)
        setError('')
        setMember2Email('')
        setMember3Email('')
        setMember4Email('')
        setGithubId('')
        setGithubId2('')
        setGithubId3('')
        setGithubId4('')
        setHackerrankId('')
        setTeamName('')
    }

    function registerToEvent(e)
    {   
        if(checked == true)
        {
            e.preventDefault()
            setLoading(true)
            let detailsJson = {
                member1name : currentUser.displayName,
                member1Email : currentUser.email,
                phoneNumber : currentUser.phoneNumber
            }
            if(props.githubRequired){
                if(githubId.length>0)
                    detailsJson.githubId = githubId
                if(githubId2.length>0)
                    detailsJson.githubId2 = githubId2
                if(githubId3.length>0)
                    detailsJson.githubId3 = githubId3
                if(githubId4.length>0)
                    detailsJson.githubId4 = githubId4
            }
            if(props.teamNameRequired && teamName.length>0){
                detailsJson.teamName = teamName
            }
            if(props.hackerrankRequired && hackerrankId.length>0){
                detailsJson.hackerrankId = hackerrankId
            }
            if(member2Email.length>0){
                detailsJson.member2Email = member2Email
            }
            if(member3Email.length>0){
                detailsJson.member3Email = member3Email
            }
            if(member4Email.length>0){
                detailsJson.member4Email = member4Email
            }

            handleVerify().then((jsonData)=>{
                if(member2Email.length>0){
                    detailsJson.member2Name = jsonData.member2Name
                }
                if(member3Email.length>0){
                    detailsJson.member3Name = jsonData.member3Name
                }
                if(member4Email.length>0){
                    detailsJson.member4Name = jsonData.member4Name
                }
                console.log(detailsJson)
                db.collection("users").doc(currentUser.uid).update({
                    registeredEvents:firebasevalue.arrayUnion(props.eventid)
                }).then(()=>{
                    db.collection("events").doc(props.eventid).update({
                        participants:firebasevalue.arrayUnion(detailsJson)
                    }).then(()=>{
                        setLoading(false)
                        setChecked(false)
                        setError('')
                        setMember2Email('')
                        setMember3Email('')
                        setMember4Email('')
                        setGithubId('')
                        setGithubId2('')
                        setGithubId3('')
                        setGithubId4('')
                        setHackerrankId('')
                        setTeamName('')
                        props.onHide()
                    })
                })
            }).catch(err => {
                setLoading(false)
                setError(err)
            })
        }
        else
        {
            e.preventDefault()
            setChecked(false)
        }
    }

    function handleVerify() {
        return new Promise((resolve,reject) => {
            let status = []
            const memberJson = {}
            let arrayLen = (member2Email.length>0) + (member3Email.length>0) + (member4Email.length>0);
            if(member2Email.length>0){
                db.collection("users").where('email','==',member2Email).get().then(docs=>{
                    if(!docs.empty){
                        memberJson.member2Name = (docs.docs[0].data().displayName)
                        status.push(true)
                    } else {
                        status.push(false)
                    }
                })
            }
            if(member3Email.length>0){
                db.collection("users").where('email','==',member3Email).get().then(docs=>{
                    if(!docs.empty){
                        memberJson.member3Name = (docs.docs[0].data().displayName)
                        status.push(true)
                    } else {
                        status.push(false)
                    }
                })
            }
            if(member4Email.length>0){
                db.collection("users").where('email','==',member4Email).get().then(docs=>{
                    if(!docs.empty){
                        memberJson.member4Name = (docs.docs[0].data().displayName)
                        status.push(true)
                    } else {
                        status.push(false)
                    }
                })
            }

            if(status.length!=arrayLen){
                setTimeout(()=>{
                    if(status.length==arrayLen){
                        if(status.every((val)=>val==true)){
                            resolve(memberJson)
                        } else {
                            reject("One or more members aren't registered in our website! Register and try again.")
                        }
                    }
                },1000)
            }
            if(arrayLen==0) {
                resolve()
            }
        })
    }

    return (
        <Modal size="lg" centered show={props.show} onHide={handleClose}>
        <Modal.Body>
                <div className="event-description" dangerouslySetInnerHTML={{ __html: props.description }}>
                    
                </div>
                <div className="event-rules" dangerouslySetInnerHTML={{ __html: props.rules }}></div>
                <Form onSubmit={(e)=>registerToEvent(e)}>
                    {props.teamNameRequired && (
                        <Form.Group className="mb-3" controlId="teamName">
                            <Form.Label><b>Team Name</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter your team name" onChange={(e)=>setTeamName(e.target.value)} required/>
                        </Form.Group>
                    )}

                    {props.githubRequired && (
                        <Form.Group className="mb-3" controlId="githubId">
                            <Form.Label><b>GitHub Username</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter your GitHub username" onChange={(e)=>{setGithubId(e.target.value)}} required/>
                        </Form.Group>
                    )}

                    {props.hackerrankRequired && (
                        <Form.Group className="mb-3" controlId="githubId">
                            <Form.Label><b>Hackerrank Username</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter your Hackerrank username" onChange={(e)=>{setHackerrankId(e.target.value)}} required/>
                        </Form.Group>
                    )}
                
                    {props.maxTeamMembers>1 && (
                        <Form.Group className="mb-3" controlId="member2details">
                            <Form.Label><b>Member 2 Email</b></Form.Label>
                            <Form.Control type="email" placeholder="Enter your second member's email id" onChange={(e)=>{setMember2Email(e.target.value)}} required={(props.eventid==='quiz')}/>
                        </Form.Group>
                    )}
                    
                    {props.githubRequired && (
                        <Form.Group className="mb-3" controlId="githubId2">
                            <Form.Label><b>Member 2 GitHub Username</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter your second member's GitHub username" onChange={(e)=>{setGithubId2(e.target.value)}} required={member2Email.length>0}/>
                        </Form.Group>
                    )}

                    {(props.maxTeamMembers>2) && (
                        <Form.Group className="mb-3" controlId="member3details">
                            <Form.Label><b>Member 3 Email</b></Form.Label>
                            <Form.Control type="email" placeholder="Enter your third member's email id" onChange={(e)=>{setMember3Email(e.target.value)}} />
                        </Form.Group>
                    )}

                    {props.githubRequired && (
                        <Form.Group className="mb-3" controlId="githubId3">
                            <Form.Label><b>Member 3 GitHub Username</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter your third member's GitHub username" onChange={(e)=>{setGithubId3(e.target.value)}} required={member3Email.length>0}/>
                        </Form.Group>
                    )}

                    {(props.maxTeamMembers>3) && (
                        <Form.Group className="mb-3" controlId="member4details">
                            <Form.Label><b>Member 4 Email</b></Form.Label>
                            <Form.Control type="email" placeholder="Enter your fourth member's email id" onChange={(e)=>{setMember4Email(e.target.value)}}/>
                        </Form.Group>
                    )}
                    {props.githubRequired && (
                        <Form.Group className="mb-3" controlId="githubId4">
                            <Form.Label><b>Member 4 GitHub Username</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter your third member's GitHub username" onChange={(e)=>{setGithubId4(e.target.value)}} required={member4Email.length>0}/>
                        </Form.Group>
                    )}
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I have read everything" checked={checked} onChange={()=>setChecked(!checked)} />
                    </Form.Group>
                    {error && error.length > 0 &&<div className="text-danger" style={{marginTop: '5px', marginBottom: '10px'}}>{error}</div>}
                    <Button variant="dark" type="submit" disabled={!checked}> {loading ? (<Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                          </Spinner>): "Register Now"} </Button>
                    <Button variant="light"  onClick={handleClose}> Close </Button>
                    
                </Form>
        </Modal.Body>
        </Modal>
    )
}

export default EventRegistrationModal
