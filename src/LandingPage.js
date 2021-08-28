import React from 'react'
import cloud from './cloud.png'

function LandingPage(props) {
    return (
        <>
            <div class="stars"></div>
            <div class="twinkling"></div>
            <div class="clouds" style={{ backgroundImage: `url(${cloud})` }}></div>

        </>
    )
}

export default LandingPage
