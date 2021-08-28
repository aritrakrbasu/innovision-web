import React, { useState,useRef } from 'react'
import './styles/registrations.css'
import logo from './logo_card.png'
import mail from './mail.png'
import cloud from './cloud.png'
import { useAuth } from './context/AuthProvider'
import { useHistory } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

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
    const { createUser } = useAuth()
    const history = useHistory()

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

        <div className="frame__nav">
			<ul>
				<li>
					<a href="/events">
						<button class="navigation__button">About Innovision</button>
					</a>
				</li>
				<li>
					<a href="#">
						<button class="navigation__button">The Team</button>
					</a>
				</li>
				<li>
					<a href="#">
						<button class="navigation__button">Contact Us</button>
					</a>
				</li>
			</ul>
		</div>

        <div class="ticket-visual_visual" id="ticket">
            <div class="left"></div>
            <div class="right"></div>
            <div class="ticket-visual-wrapper">
                <div class="ticket-visual_profile">
                <div class="ticket-profile_profile">
                    <img
                    src="https://github.com/aritrakrbasu.png"
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
