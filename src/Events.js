import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import logo from './logo.png'
import cloud from './cloud.png'
import './styles/events.css'

function Events() {

    const [eventsData, setEventsData] = useState([])

    useEffect(()=> {
        var unsubscribe = db.collection("events").get().then(data=>{
            if(!data.empty) {
                let eventsArray = []
                data.forEach(event=> {
                    eventsArray.push({id: event.id,...event.data()})
                })
                setEventsData(eventsArray)
            }
        })
        return unsubscribe
    }, [])

    console.log(eventsData)

    return (

        <>
            <div class="stars"></div>
            <div class="twinkling"></div>
            <div class="clouds" style={{ backgroundImage: `url(${cloud})` }}></div>
            <div className="events__container">
                <div className="events__Title">
                    Innovision 2021
                    <div><img src={logo} width={200} className="logo"/></div>
                </div>

                <div className="events__cards">
                    {eventsData && eventsData.length>0 && eventsData.map((event, index)=> {
                        return(
                            <div className={(index%2 == 0) ? "rainbow-box" : "rainbow-box-reverse"} key={index}>
                                <img src={`./posters/${event.id}.jpeg`} className="poster" onError={(error)=>console.log(error)}/>
                                <div className="event__info">
                                    <div className="name">{event.name}</div>
                                    <div className="description" dangerouslySetInnerHTML={{ __html: event.description }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
        </div>
        </>
    )
}

export default Events
