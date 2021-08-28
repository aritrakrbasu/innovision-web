import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import lastplayed from '../play.png'
function LastPlayed() {
    return (
        <div className="last-played" style={{backgroundImage:`url(${lastplayed})`}}>
            <a href="https://www.youtube.com/watch?v=hrZ9JI_sag4" target="_blank">
                <button><FontAwesomeIcon icon={faPlay}/></button>
            </a>
        </div>
    )
}

export default LastPlayed
