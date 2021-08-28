import React, { useState,useRef, useEffect } from 'react'
import './styles/registrations.css'
import logo from './logo_card.png'
import mail from './mail.png'
import cloud from './cloud.png'
import { useAuth } from './context/AuthProvider'
import { useHistory } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import Navbar from './components/Navbar'

function Registration() {

    const [name, setName] = useState("Full Name")
    const[loading,setLoading]=useState(false)
    const [email, setEmail] = useState("youremail@domain.com")
    const [error,setError] =useState()
    const fileRef = useRef()
    const passwordRef = useRef()
    const emailRef = useRef()
    const phonenumberRef = useRef()
    const nameRef = useRef()
    const { createUser, currentUser } = useAuth()
    const history = useHistory()

    useEffect(()=>{
        if(currentUser && currentUser.uid)
        {
            history.push("/dashboard")
        }
    },[currentUser])

    function uploadImage(e)
    {
        e.preventDefault();
        fileRef.current.click()
    }

    function showImage(e)
    {
        var output = document.getElementById('photo');
        output.src = URL.createObjectURL(e.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src) // free memory
        }
    }

    async function handleRegister(e) {
        
        e.preventDefault()
        setLoading(true)
        if(passwordRef.current.value.length < 5)
        {
            setLoading(false)
            setError("Password must of 5 characters")
            return;
        }
            setError("")
            setLoading(true)
            console.log(fileRef.current.files)
            if(fileRef.current.files.length >0 )
            {
                await createUser(emailRef.current.value, passwordRef.current.value, nameRef.current.value,phonenumberRef.current.value,fileRef.current.files[0]).then((data)=>{
                
                history.push("/dashboard")
                setLoading(false)
              }).catch((data)=>{
                setError(`Failed to create an account. ${data.message}`)
                setLoading(false)
              })
            }else
            {
                setError("Please upload a photo !")
                setLoading(false)
            }
            
            setLoading(false)
    }
    return (
        <>
        <div class="stars"></div>
		<div class="twinkling"></div>
		<div class="clouds" style={{ backgroundImage: `url(${cloud})` }}></div>

       <Navbar/>
        <div class="ticket-visual_visual" id="ticket">
            <div class="left"></div>
            <div class="right"></div>
            <div class="ticket-visual-wrapper">
                <div class="ticket-visual_profile">
                <div class="ticket-profile_profile">
                    <img
                    src="data:image/png;base64,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"
                    alt="medhatdawoud"
                    class="ticket-profile_image"
                    id="photo" 
                    />
                    <div class="ticket-profile_text">
                        <p class="ticket-profile_name">{name}</p>
                        <p class="ticket-profile_username">
                            <span class="ticket-profile_githubIcon">
                            <img src={mail} alt=""/>
                            </span>
                            {email}
                        </p>
                    </div>
                </div>
                <div class="ticket-event">
                    <img src={logo} />
                    {/* <span>Innovision '21</span> */}
                </div>
                </div>
                <div class="ticket-visual_ticket-number-wrapper">
                <div class="ticket-visual_ticket-number">№ 014747</div>
                </div>
            </div>
            </div>

            <div className="registration_form_holder">
                <form class="registration_form" onSubmit={handleRegister}>
                    <input type="file" accept="image/*" className="invisible" ref={fileRef} onChange={showImage} />
                    <button className="img_btn" onClick={uploadImage}>Upload Image</button>
                    <input type="text" placeholder="Full Name" onChange={(e)=>{setName(e.target.value)}} ref={nameRef} required/>
                    <input type="text" placeholder="Email Id"  onChange={(e)=>{setEmail(e.target.value)}} ref={emailRef} required/>
                    <input type="password" placeholder="Password" ref={passwordRef} required/>
                    <input type="text" placeholder="Phone Number" ref={phonenumberRef} required/>
                    <center>
                        <div id="styled_btn">
                            {error && <div className="text-danger">{error}</div>}
                            <button class="learn-more" type="submit">
                                {loading?(
                                            <Spinner variant="light" animation="border" role="status">
                                            
                                          </Spinner>):(
                                            <>
                                             <span class="circle" aria-hidden="true">
                                <span class="icon arrow"></span>
                                </span>
                                <span class="button-text">Register Now</span>
                                            </>
                                        )}
                            </button>
                        </div>
                    </center>
                </form>
        </div>
    </>
    )
}

export default Registration
