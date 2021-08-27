import React, { useEffect, useState } from 'react'

function Home() {

    const [width, setWidth] = useState("200px")
    const [height, setHeight] = useState("120px")

    useEffect(() => {
        window.onscroll = () => {
            console.log("yo")
          }
    }, [])

    return (
        <>
       a
        </>
        
    )
}

export default Home
