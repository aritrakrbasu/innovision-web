import React, { useRef,useState } from 'react'
import { Form, Modal,Button, Spinner, FormText } from 'react-bootstrap'
import { useAuth } from '../context/AuthProvider';
import { db, firebasevalue } from '../firebase';

function EventRegistrationModal(props) {
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(false);
    const [loading,setLoading]=useState(false)
    const {currentUser} = useAuth()
    const [githubId, setGithubId] = useState('')
    const [teamName, setTeamName] = useState('')
    const [member2Email,setMember2Email] = useState('')
    const [member3Email,setMember3Email] = useState('')
    const [member4Email,setMember4Email] = useState('')
    const [githubId2, setGithubId2] = useState('')
    const [githubId3, setGithubId3] = useState('')
    const [githubId4, setGithubId4] = useState('')

    function handleClose()
    {
        setError(false)
        props.onHide()
        setChecked(false)
    }

    function registerToEvent(e)
    {   
        if(checked == true)
        {
            e.preventDefault()
            setLoading(true)
            let detailsJson = {
                name : currentUser.displayName,
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
                    detailsJson.githubId3 = githubId4
            }
            if(props.teamNameRequired && teamName.length>0){
                detailsJson.teamName = teamName
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
            db.collection("events").doc(props.eventid).update({
                participants:firebasevalue.arrayUnion(detailsJson)
            }).then(()=>{
                db.collection("users").doc(currentUser.uid).update({
                    registeredEvents:firebasevalue.arrayUnion(props.eventid)
                }).then(()=>{
                    setLoading(false)
                    setChecked(false)
                    props.onHide()
                })
            })
        }
        else
        {
            e.preventDefault()
            setError(true)
            setChecked(false)
        }
    }
    console.log(props)
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
                            <Form.Label><b>Your GitHub Username</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter your GitHub username" onChange={(e)=>{setGithubId(e.target.value)}} required/>
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
                        <Form.Check type="checkbox" label="I have read everything"  onChange={()=>setChecked(!checked)} />
                    </Form.Group>
                    {/* {!checked && error && <div className="text-danger">Please check this field </div>} */}
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
