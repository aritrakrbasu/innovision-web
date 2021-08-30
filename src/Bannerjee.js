import React, { useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { auth, db } from './firebase'

function Bannerjee() {

    const nameRef = useRef()
    const emailRef = useRef()
    const photoRef = useRef()
    const phonenumberRef = useRef()
    const facebookRef = useRef()
    const instagramRef = useRef()
    const githubRef = useRef()
    const coordinatorRef = useRef()
    const teamRef = useRef()
    const passwordRef = useRef()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    function createUser(e)
    {
        e.preventDefault()
        setError()
        setSuccess()
        setLoading(true)
        auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value).then(function(result) {
            const user = auth.currentUser;
            user.updateProfile({
              displayName: nameRef.current.value,
    
            }).then((url) => {
                  db.collection("users").doc(user.uid).set({
                    displayName:nameRef.current.value,
                    uid:user.uid,
                    email:emailRef.current.value,
                    phoneNumber:passwordRef.current.value,
                    isCoordinator:true,
                    photoURL:photoRef.current.value,
                    fbID:facebookRef.current.value,
                    insID:instagramRef.current.value,
                    gitID:githubRef.current.value,
                    coordOf:coordinatorRef.current.value,
                    extras:teamRef.current.value,
                  }).then(()=>{
                    setLoading(false)
                    setSuccess("profile created")
                    nameRef.current.value=""
                    user.uid=""
                    emailRef.current.value=""
                    passwordRef.current.value=""
                    photoRef.current.value=""
                    facebookRef.current.value=""
                    instagramRef.current.value=""
                    githubRef.current.value=""
                    coordinatorRef.current.value=""
                    teamRef.current.value=""

                  }).catch(error =>{
                      setLoading(false)
                      setError("error creating profile")
                  });
                })
              .catch(error => {
                setLoading(false)
                setError("error creating profile")
              });
                }).catch(error => {
                    setLoading(false)
                    setError("error creating profile")
                  });
    }

    return (
        <div>
            <form onSubmit={createUser} className="d-flex align-items-center flex-column">
                <input placeholder="full name" className="w-50 my-2 p-2" ref={nameRef}/>
                <input placeholder="email" className="w-50 my-2 p-2" ref={emailRef}/>
                <input placeholder="password"className="w-50 my-2 p-2" ref={passwordRef}/>
                <input placeholder="photo url"className="w-50 my-2 p-2" ref={photoRef}/>
                <input placeholder="Phone Number"className="w-50 my-2 p-2" ref={phonenumberRef}/>
                <input placeholder="facebook link"className="w-50 my-2 p-2" ref={facebookRef}/>
                <input placeholder="instagram link"className="w-50 my-2 p-2" ref={instagramRef}/>
                <input placeholder="github"className="w-50 my-2 p-2" ref={githubRef}/>
                <input placeholder="coordinator"className="w-50 my-2 p-2" ref={coordinatorRef}/>
                <input placeholder="teams"className="w-50 my-2 p-2" ref={teamRef}/>
                {success && (<div className="text-success">{success}</div>)}
                {error && (<div className="text-danger">{error}</div>)}
                <button class="learn-more">

                            {loading?(
                                            <Spinner variant="light" animation="border" role="status">
                                           
                                          </Spinner>):(
                                            <>
                                             <span  class="circle" aria-hidden="true">
                                <span class="icon arrow"></span>
                                </span>
                                <span class="button-text">Register Now</span>
                                            </>
                                        )}
                            </button>
            </form>
        </div>
    )
}

export default Bannerjee
