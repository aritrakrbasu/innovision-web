import React, { useEffect,useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../context/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn, faCouch, faDizzy, faFile, faFileAlt, faFire, faHeadphones, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import logo from '../logo.png'
import { NavLink } from 'react-router-dom'
import LastPlayed from './LastPlayed'
import '../styles/sidebar.css'
function Sidebar() {
    const { logout,currentUser } = useAuth()
    const history = useHistory()
    async function handleLogout() {    
        try {
          await logout()
          history.push("/")
        } catch {
          console.log("Failed to log out")
        }
      }

      const [registeredEvents, setRegisteredEvents] = useState([]);
    useEffect(()=>{
        if(currentUser && currentUser.registeredEvents)
        {
            setRegisteredEvents(currentUser.registeredEvents)
        }
    },[currentUser])


    return (
        <div className="sidebar">
            <a href="/">
              <img src={logo} alt="logo" className="sidebar-brand img-fluid p-3" />
            </a>
            <ul className="sidebar-ul">
                <NavLink to="/dashboard" activeClassName="active"><li><FontAwesomeIcon icon={faFire} /><span>Home</span></li></NavLink>
                <NavLink to="/vote" activeClassName="active"><li><FontAwesomeIcon icon={faBullhorn} /><span>Vote</span></li></NavLink>
                {
                                        (registeredEvents.includes("thewallarticle") || registeredEvents.includes("thewallartwork") 
                                        || registeredEvents.includes("thewallpoetry") || registeredEvents.includes("shutterbugshortvideos") 
                                        || registeredEvents.includes("shutterbugphotos")) && (
                                          <NavLink to="/mysubmission" activeClassName="active"><li><FontAwesomeIcon icon={faFileAlt} /><span>My Submissions</span></li></NavLink>
                                        )
                                    }
                
                <li><button variant="light" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/><span>Sign out</span></button></li>
            </ul>
            <LastPlayed />
        </div>
    )
}

export default Sidebar
