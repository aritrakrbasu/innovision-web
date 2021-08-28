import React from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../context/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn, faCouch, faDizzy, faFire, faHeadphones, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import logo from '../logo.png'
import { NavLink } from 'react-router-dom'
import LastPlayed from './LastPlayed'
import '../styles/sidebar.css'
function Sidebar() {
    const { logout } = useAuth()
    const history = useHistory()
    async function handleLogout() {    
        try {
          await logout()
          history.push("/")
        } catch {
          console.log("Failed to log out")
        }
      }
    return (
        <div className="sidebar">
            <img src={logo} alt="logo" className="sidebar-brand img-fluid" />
            <ul className="sidebar-ul">
                <NavLink to="/dashboard" activeClassName="active"><li><FontAwesomeIcon icon={faFire} /><span>Home</span></li></NavLink>
                <NavLink to="/vote" activeClassName="active"><li><FontAwesomeIcon icon={faBullhorn} /><span>Vote</span></li></NavLink>
                <li><button variant="light" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/><span>Sign out</span></button></li>
            </ul>
            <LastPlayed />
        </div>
    )
}

export default Sidebar
