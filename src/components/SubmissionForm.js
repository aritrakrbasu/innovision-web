import React, { useRef, useState } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { useAuth } from '../context/AuthProvider'
import { db, firebasevalue } from '../firebase'

function SubmissionForm(props) {

    const youtube1Ref = useRef()
    const youtube2Ref = useRef()
    const shutterbug1Ref = useRef()
    const shutterbug2Ref = useRef()
    const article1Ref = useRef()
    const article2Ref = useRef()
    const artwork2Ref = useRef()
    const artwork1Ref = useRef()
    const poetry1Ref = useRef()
    const poetry2Ref = useRef()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()

    const {currentUser} =useAuth()
    function handleClose()
    {
        props.onHide()
    }

    function matchYoutubeUrl(url) {
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if(url.match(p)){
            return url.match(p)[1];
        }
        return false;
    }

    function submitRealLense(e)
    {
        e.preventDefault();
        setLoading(true)
        setError()
        if(youtube2Ref.current.value.length>0)
        {
            if(youtube2Ref.current.value === youtube1Ref.current.value)
            {
                setLoading(false)
                setError("Both Links can't be same")
                return
            }
        }
        if(youtube1Ref.current.value.length>0)
        {
            if(matchYoutubeUrl(youtube1Ref.current.value))
            {
                if(youtube2Ref.current.value.length>0)
                {
                    if(matchYoutubeUrl(youtube2Ref.current.value))
                    {
                        db.collection("events").doc(props.eventData.id).update({
                            submission :firebasevalue.arrayUnion({
                                submission1Link:youtube1Ref.current.value,
                                submission2Link:youtube2Ref.current.value,
                                submittedBy : currentUser.uid,
                                submittedByName:currentUser.displayName
                            })
                            
                        }).then(()=>{
                                db.collection("users").doc(currentUser.uid).update({
                                    [`submitted.`+props.eventData.id] : {
                                        eventId : props.eventData.id,
                                        submission1Link:youtube1Ref.current.value,
                                        submission2Link:youtube2Ref.current.value,
                                    }
                                })
                            }).then(()=>{
                                setLoading(false)
                                setError()
                                props.onHide()
                                })
                            
                            
                    }else
                    {
                        setLoading(false)
                        setError("Submission link 2 must be an youtube URL")
                    }
                }else
                {
                    db.collection("events").doc(props.eventData.id).update({
                        submission :firebasevalue.arrayUnion({
                            submission1Link:youtube1Ref.current.value,
                            submittedBy : currentUser.uid,
                            submittedByName:currentUser.displayName
                        })
                    }).then(()=>{
                            db.collection("users").doc(currentUser.uid).update({
                                [`submitted.`+props.eventData.id] : {
                                    eventId : props.eventData.id,
                                    submission1Link:youtube1Ref.current.value,
                                   
                                
                            }
                            }).then(()=>{
                                setLoading(false)
                                setError()
                                props.onHide()
                            })
                
                })
                }
            }else
            {
                setError("Submission link 1 must be an youtube URL")
                setLoading(false)
                
            }
        }

        
    }

    function submitShutterBug(e)
    {
        e.preventDefault();
        setLoading(true)
        setError()
        if(shutterbug2Ref.current.value.length>0)
        {
            if(shutterbug2Ref.current.value === shutterbug1Ref.current.value)
            {
                setLoading(false)
                setError("Both Links can't be same")
                return
            }
        }
            if(shutterbug2Ref.current.value.length>0)
            {
                db.collection("events").doc(props.eventData.id).update({
                        submission :firebasevalue.arrayUnion({
                        submission1Link:shutterbug1Ref.current.value,
                        submission2Link:shutterbug2Ref.current.value,
                        submittedBy : currentUser.uid,
                        submittedByName:currentUser.displayName
                    })
                }).then(()=>{
                        db.collection("users").doc(currentUser.uid).update({
                            [`submitted.`+props.eventData.id] : {
                                eventId : props.eventData.id,
                                submission1Link:shutterbug1Ref.current.value,
                                submission2Link:shutterbug2Ref.current.value,
                            
                        }
                        }).then(()=>{
                            setLoading(false)
                            setError()
                            props.onHide()
                        })
                    })
            
            }else
            {
                db.collection("events").doc(props.eventData.id).update({
                    submission :firebasevalue.arrayUnion({
                    submission1Link:shutterbug1Ref.current.value,
                    submittedBy : currentUser.uid,
                    submittedByName:currentUser.displayName
                })
                }).then(()=>{
                        db.collection("users").doc(currentUser.uid).update({
                            [`submitted.`+props.eventData.id] : {
                                eventId : props.eventData.id,
                                submission1Link:shutterbug1Ref.current.value,
                            
                        }
                        }).then(()=>{
                            setLoading(false)
                            setError()
                            props.onHide()
                        })
                    })
            }
    }


    function submitArticle(e)
    {
        e.preventDefault();
        setLoading(true)
        setError()
        if(article2Ref.current.value.length>0)
        {
            if(article2Ref.current.value === article1Ref.current.value)
            {
                setLoading(false)
                setError("Both Links can't be same")
                return
            }
        }
            if(article2Ref.current.value.length>0)
            {
                db.collection("events").doc(props.eventData.id).update({
                        submission :firebasevalue.arrayUnion({
                        submission1Link:article1Ref.current.value,
                        submission2Link:article2Ref.current.value,
                        submittedBy : currentUser.uid,
                        submittedByName:currentUser.displayName
                    })
                }).then(()=>{
                        db.collection("users").doc(currentUser.uid).update({
                            [`submitted.`+props.eventData.id] : {
                                eventId : props.eventData.id,
                                submission1Link:article1Ref.current.value,
                                submission2Link:article2Ref.current.value,
                            
                        }
                        }).then(()=>{
                            setLoading(false)
                            setError()
                            props.onHide()
                        })
                    })
            
            }else
            {
                db.collection("events").doc(props.eventData.id).update({
                    submission :firebasevalue.arrayUnion({
                    submission1Link:article1Ref.current.value,
                    submittedBy : currentUser.uid,
                    submittedByName:currentUser.displayName
                })
                }).then(()=>{
                        db.collection("users").doc(currentUser.uid).update({
                            [`submitted.`+props.eventData.id] : {
                                eventId : props.eventData.id,
                                submission1Link:article1Ref.current.value,
                            
                        }
                        }).then(()=>{
                            setLoading(false)
                            setError()
                            props.onHide()
                        })
                    })
            }
    }


    function submitArtwork(e)
    {
        e.preventDefault();
        setLoading(true)
        setError()
        if(artwork2Ref.current?.value.length>0)
        {
            if(artwork2Ref.current.value === artwork1Ref.current.value)
            {
                setLoading(false)
                setError("Both Links can't be same")
                return
            }
        }
            if(artwork2Ref.current.value.length>0)
            {
                db.collection("events").doc(props.eventData.id).update({
                        submission :firebasevalue.arrayUnion({
                        submission1Link:artwork1Ref.current.value,
                        submission2Link:artwork2Ref.current.value,
                        submittedBy : currentUser.uid,
                        submittedByName:currentUser.displayName
                    })
                }).then(()=>{
                        db.collection("users").doc(currentUser.uid).update({
                            [`submitted.`+props.eventData.id] : {
                                eventId : props.eventData.id,
                                submission1Link:artwork1Ref.current.value,
                                submission2Link:artwork2Ref.current.value,
                    
                        }
                        }).then(()=>{
                            setLoading(false)
                            setError()
                            props.onHide()
                        })
                    })
            
            }else
            {
                db.collection("events").doc(props.eventData.id).update({
                    submission :firebasevalue.arrayUnion({
                    submission1Link:artwork1Ref.current.value,
                    submittedBy : currentUser.uid,
                    submittedByName:currentUser.displayName
                })
                }).then(()=>{
                        db.collection("users").doc(currentUser.uid).update({
                            [`submitted.`+props.eventData.id] : {
                                eventId : props.eventData.id,
                                submission1Link:artwork1Ref.current.value,
                            }
                        
                        }).then(()=>{
                            setLoading(false)
                            setError()
                            props.onHide()
                        })
                    })
            }
    }


    function submitPoetry(e)
    {
        e.preventDefault();
        setLoading(true)
        setError()
        if(poetry2Ref.current.value.length>0)
        {
            if(poetry2Ref.current.value === poetry1Ref.current.value)
            {
                setLoading(false)
                setError("Both Links can't be same")
                return
            }
        }
            if(poetry2Ref.current.value.length>0)
            {
                db.collection("events").doc(props.eventData.id).update({
                        submission :firebasevalue.arrayUnion({
                        submission1Link:poetry1Ref.current.value,
                        submission2Link:poetry2Ref.current.value,
                        submittedBy : currentUser.uid,
                        submittedByName:currentUser.displayName
                    })
                }).then(()=>{
                        db.collection("users").doc(currentUser.uid).update({
                            [`submitted.`+props.eventData.id] : {
                                eventId : props.eventData.id,
                                submission1Link:poetry1Ref.current.value,
                                submission2Link:poetry2Ref.current.value,
                            }
                        
                        }).then(()=>{
                            setLoading(false)
                            setError()
                            props.onHide()
                        })
                    })
            
            }else
            {
                db.collection("events").doc(props.eventData.id).update({
                    submission :firebasevalue.arrayUnion({
                    submission1Link:poetry1Ref.current.value,
                    submittedBy : currentUser.uid,
                    submittedByName:currentUser.displayName
                })
                }).then(()=>{
                        db.collection("users").doc(currentUser.uid).update({
                            [`submitted.`+props.eventData.id] : {
                                eventId : props.eventData.id,
                                submission1Link:poetry1Ref.current.value,
                            
                        }
                        }).then(()=>{
                            setLoading(false)
                            setError()
                            props.onHide()
                        })
                    })
            }
    }

    
    return (
        <Modal size="lg" centered show={props.show} onHide={handleClose}>
        <Modal.Body>
            {props && props.eventData &&(
                <div className="event-description" dangerouslySetInnerHTML={{ __html: props.eventData.rules }}>
                    
                    </div>
            )}
                

                {props?.eventData?.id==="shutterbugshortvideos" &&(
                    <Form onSubmit={submitRealLense}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 1 </Form.Label>
                            <Form.Control type="url" placeholder="Enter youtube URL" ref={youtube1Ref} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 2</Form.Label>
                            <Form.Control type="url" placeholder="Enter youtube URL" ref={youtube2Ref}/>
                        </Form.Group>
                        
                        {error && (<div className="text-danger my-4">{error}</div>)}
                        <Button variant="dark" type="submit">
                            
                            {loading?(
                                        <Spinner variant="light" animation="border" role="status">
                                           
                                          </Spinner>):(
                                            <>
                                             Submit
                                            </>
                                        )}
                        </Button>
                    </Form>
                )}

                {props?.eventData?.id==="shutterbugphotos" &&(
                    <Form onSubmit={submitShutterBug}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 1 </Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={shutterbug1Ref} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 2</Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={shutterbug2Ref}/>
                        </Form.Group>
                        
                        {error && (<div className="text-danger my-4">{error}</div>)}
                        <Button variant="dark" type="submit">
                            
                            {loading?(
                                        <Spinner variant="light" animation="border" role="status">
                                           
                                          </Spinner>):(
                                            <>
                                             Submit
                                            </>
                                        )}
                        </Button>
                    </Form>
                )}

                {props?.eventData?.id==="shutterbugphotosteacher" &&(
                    <Form onSubmit={submitShutterBug}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 1 </Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={shutterbug1Ref} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 2</Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={shutterbug2Ref}/>
                        </Form.Group>
                        
                        {error && (<div className="text-danger my-4">{error}</div>)}
                        <Button variant="dark" type="submit">
                            
                            {loading?(
                                        <Spinner variant="light" animation="border" role="status">
                                           
                                          </Spinner>):(
                                            <>
                                             Submit
                                            </>
                                        )}
                        </Button>
                    </Form>
                )}

                {props?.eventData?.id==="thewallarticle" &&(
                    <Form onSubmit={submitArticle}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 1 </Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={article1Ref} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 2</Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={article2Ref}/>
                        </Form.Group>
                        
                        {error && (<div className="text-danger my-4">{error}</div>)}
                        <Button variant="dark" type="submit">
                            
                            {loading?(
                                        <Spinner variant="light" animation="border" role="status">
                                           
                                          </Spinner>):(
                                            <>
                                             Submit
                                            </>
                                        )}
                        </Button>
                    </Form>
                )}
                {props?.eventData?.id==="thewallarticleteacher" &&(
                    <Form onSubmit={submitArticle}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 1 </Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={article1Ref} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 2</Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={article2Ref}/>
                        </Form.Group>
                        
                        {error && (<div className="text-danger my-4">{error}</div>)}
                        <Button variant="dark" type="submit">
                            
                            {loading?(
                                        <Spinner variant="light" animation="border" role="status">
                                           
                                          </Spinner>):(
                                            <>
                                             Submit
                                            </>
                                        )}
                        </Button>
                    </Form>
                )}

                {props?.eventData?.id==="thewallartwork" &&(
                    <Form onSubmit={submitArtwork}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 1 </Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={artwork1Ref} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 2</Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={artwork2Ref}/>
                        </Form.Group>
                        
                        {error && (<div className="text-danger my-4">{error}</div>)}
                        <Button variant="dark" type="submit">
                            
                            {loading?(
                                        <Spinner variant="light" animation="border" role="status">
                                           
                                          </Spinner>):(
                                            <>
                                             Submit
                                            </>
                                        )}
                        </Button>
                    </Form>
                )}
                {props?.eventData?.id==="thewallartworkteacher" &&(
                    <Form onSubmit={submitArtwork}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 1 </Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={artwork1Ref} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 2</Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={artwork2Ref}/>
                        </Form.Group>
                        
                        {error && (<div className="text-danger my-4">{error}</div>)}
                        <Button variant="dark" type="submit">
                            
                            {loading?(
                                        <Spinner variant="light" animation="border" role="status">
                                           
                                          </Spinner>):(
                                            <>
                                             Submit
                                            </>
                                        )}
                        </Button>
                    </Form>
                )}

                {props?.eventData?.id==="thewallpoetry" &&(
                    <Form onSubmit={submitPoetry}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 1 </Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={poetry1Ref} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 2</Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={poetry2Ref}/>
                        </Form.Group>
                        
                        {error && (<div className="text-danger my-4">{error}</div>)}
                        <Button variant="dark" type="submit">
                            
                            {loading?(
                                        <Spinner variant="light" animation="border" role="status">
                                           
                                          </Spinner>):(
                                            <>
                                             Submit
                                            </>
                                        )}
                        </Button>
                    </Form>
                )}
                {props?.eventData?.id==="thewallpoetryteacher" &&(
                    <Form onSubmit={submitPoetry}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 1 </Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={poetry1Ref} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Submission 2</Form.Label>
                            <Form.Control type="url" placeholder="Enter drive link" ref={poetry2Ref}/>
                        </Form.Group>
                        
                        {error && (<div className="text-danger my-4">{error}</div>)}
                        <Button variant="dark" type="submit">
                            
                            {loading?(
                                        <Spinner variant="light" animation="border" role="status">
                                           
                                          </Spinner>):(
                                            <>
                                             Submit
                                            </>
                                        )}
                        </Button>
                    </Form>
                )}
                <Button variant="light"  onClick={handleClose}> Close </Button>
        </Modal.Body>
        </Modal>
    )
}

export default SubmissionForm
