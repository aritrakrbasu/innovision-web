import React,{useEffect,useRef,useState} from 'react'
import { Image, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import cloud from './cloud.png'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthProvider'
import logo from './logo.png'
function Login() {

    const[loading,setLoading]=useState(false)
    const passwordRef = useRef()
    const emailRef = useRef()
    const[error,setError]=useState(false)
    const history= useHistory()

    const {currentUser,teacherLogin}=useAuth()

    function handleLogin(e)
    {
        e.preventDefault()
        setLoading(true)
        if(passwordRef.current.value.length < 6)
        {
            setError("Password must be greater than 5 characters")
            setLoading(false)
            return
        }else
        {
            teacherLogin(emailRef.current.value,passwordRef.current.value).then(()=>{})
            .catch((error)=>{
                setError(error.message)
                setLoading(false)
            })
        }

    }

    useEffect(()=>{
        if(currentUser && currentUser.uid)
        {
            history.push("/dashboard")
        }
    },[currentUser])

    return (
        <div>
            <div class="stars"></div>
        <div class="twinkling"></div>
        <div class="clouds" style={{ backgroundImage: `url(${cloud})` }}></div>
<Navbar />
            <div className="registration_form_holder login_form_holder">
                <Image src={logo} className="logo-login" />
                <form class="registration_form">
                    <input type="text" placeholder="Email Id" ref={emailRef}/>
                    <input type="password" placeholder="Password" ref={passwordRef}/>
                    <center>
                        <div id="styled_btn">
                            {error && <div className="text-danger">{error}</div>}
                            <button class="learn-more" onClick={handleLogin}>

                            {loading?(
                                            <Spinner variant="light" animation="border" role="status">
                                           
                                          </Spinner>):(
                                            <>
                                             <span  class="circle" aria-hidden="true">
                                <span class="icon arrow"></span>
                                </span>
                                <span class="button-text">Login Now</span>
                                            </>
                                        )}
                            </button>
                        </div>
                    </center>
                </form>
        </div>
        </div>
    )
}

export default Login

