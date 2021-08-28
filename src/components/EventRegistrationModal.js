import React, { useRef,useState } from 'react'
import { Form, Modal,Button, Spinner } from 'react-bootstrap'
import { useAuth } from '../context/AuthProvider';
import { db, firebasevalue } from '../firebase';

function EventRegistrationModal(props) {
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(false);
    const [loading,setLoading]=useState(false)
    const {currentUser} = useAuth()

    function handleClose()
    {
        props.onHide()
    }

    function registerToEvent()
    {   
        if(checked)
        {
            setLoading(true)
            db.collection("events").doc(props.eventid).update({
                participants:firebasevalue.arrayUnion({
                    name : currentUser.displayName,
                    email : currentUser.email,
                    phoneNumber : currentUser.phoneNumber})
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
            setError(true)
        }
    }
    return (
        <Modal size="lg" centered show={props.show} onHide={handleClose}>
        <Modal.Body>
                <div className="event-description" dangerouslySetInnerHTML={{ __html: props.description }}>
                    
                </div>
                <div className="event-rules" dangerouslySetInnerHTML={{ __html: props.rules }}></div>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I have read everything"  onChange={() => setChecked(!checked)} />
                </Form.Group>
                {error && <div className="text-danger">Please check this feild </div>}
                <Button variant="dark" onClick={registerToEvent}> {loading ? (<Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                          </Spinner>): "Register Now"} </Button>
        </Modal.Body>
        </Modal>
    )
}

export default EventRegistrationModal
