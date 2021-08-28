import React,{useEffect, useState} from 'react'
import './styles/explode.css'
import logo from './logo.png'
import cloud from './cloud.png'
import techc from './posters/techc.jpeg'
import { Col, Container, Row } from 'react-bootstrap'
import { db } from './firebase'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar'

function Explode() {

	const [showEvents, setShowEvents] = useState(false)
	const [events, setEvents] = useState()
	const [isMobile, setIsMobile] = useState(false)
	const [loading, setLoading] = useState(true)

    useEffect(()=>{
    const script5 = document.createElement('script');

    script5.src = "./js/demo.js";
    script5.async = true;

    document.body.appendChild(script5);
    },[])

	const handleResize = () => {
		if (window.innerWidth < 720) {
			setIsMobile(true)
			setLoading(false)
		} else {
			setIsMobile(false)
			setLoading(false)
		}
	  }

	useEffect(() => {
		handleResize()
	  },[])
	  


	useEffect(()=>{
        db.collection("events").onSnapshot((documents)=>{
            console.log(documents)
            if(!documents.empty)
            {
                var eventlist =[]
                documents.forEach((doc)=>{

                    eventlist.push({id:doc.id,...doc.data()})
                })

                setEvents(eventlist)
            }
        })
    },[])

    return (
        <>
		<div class="stars"></div>
		<div class="twinkling"></div>
		<div class="clouds" style={{ backgroundImage: `url(${cloud})` }}></div>

		<Navbar />
		
        <div id="container"></div>
			<div class="content">
				<div class="content__item">
					
					<button class="content__button" onClick={()=>{setShowEvents(true)}}>
						
					<span class="frame__deco-inner"><img src={logo} /></span>
					Click to explore infinity</button>
				</div>
				<div class="content__item content__item--details">
					
					<h3 class="content__location">September 1  &mdash; 3</h3>
					<h1 class="content__title">Innovision</h1>
					<p class="content__date">Image Infinity</p>
					 
				</div>
				{
					showEvents && !loading &&(
					<div className="event_list">
						 <Container >
							 {events && events.length>0 && events.map((event,index)=>{

								 if(index%2==0 && !isMobile)
								 {
									 return(
										<Row className="events_holder">
											<Col lg={8}>
											<div className="events_text_holder_Web">
												<p dangerouslySetInnerHTML={{__html:event.description}}></p>
	
												<Link to="/register">
													<button class="learn-more ml-2">
														<span class="circle" aria-hidden="true">
														<span class="icon arrow"></span>
														</span>
														<span class="button-text">Register Now</span>
													</button>
												</Link>
												<Link to={`/events/${event.id}`}>
													<button class="learn-more ml-2">
														<span class="circle" aria-hidden="true">
														<span class="icon arrow"></span>
														</span>
														<span class="button-text">Read More</span>
													</button>
												</Link>
											</div>
											</Col>
											<Col lg={4}>
											<div className="events_image_holder_Web">
												<img src={`./posters/${event.id}.jpeg`} className="event_images" />
												<h2 class="hero glitch layers" data-text={event.name}><span>{event.name}</span></h2>
											</div>
											</Col>
										</Row>
									 )
								 }
								 else if(index%2==1 && !isMobile)
								 {
								 return(
									<Row className="events_holder">
										
										<Col lg={4}>
										<div className="events_image_holder_Web">
											<img src={`./posters/${event.id}.jpeg`} className="event_images" />
											<h2 class="hero glitch layers" data-text={event.name}><span>{event.name}</span></h2>
										</div>
										</Col>
										<Col lg={8}>
										<div className="events_text_holder_Web">
											<p dangerouslySetInnerHTML={{__html:event.description}}></p>

											<Link to="/register">
												<button class="learn-more ml-2">
													<span class="circle" aria-hidden="true">
													<span class="icon arrow"></span>
													</span>
													<span class="button-text">Register Now</span>
												</button>
											</Link>
											<Link to={`/events/${event.id}`}>
												<button class="learn-more ml-2">
													<span class="circle" aria-hidden="true">
													<span class="icon arrow"></span>
													</span>
													<span class="button-text">Read More</span>
												</button>
											</Link>
										</div>
										</Col>
									</Row>
								 )
								 }

								 else if(isMobile)
								 {
								 return(
									<Row className="events_holder">
										
										<Col lg={4}>
										<div className="events_image_holder_Web">
											<img src={`./posters/${event.id}.jpeg`} className="event_images" />
											<h2 class="hero glitch layers" data-text={event.name}><span>{event.name}</span></h2>
										</div>
										</Col>
										<Col lg={8}>
										<div className="events_text_holder_Web">
											<p dangerouslySetInnerHTML={{__html:event.description}}></p>

											<Link to="/register">
												<button class="learn-more ml-2">
													<span class="circle" aria-hidden="true">
													<span class="icon arrow"></span>
													</span>
													<span class="button-text">Register Now</span>
												</button>
											</Link>
											<Link to={`/events/${event.id}`}>
												<button class="learn-more ml-2">
													<span class="circle" aria-hidden="true">
													<span class="icon arrow"></span>
													</span>
													<span class="button-text">Read More</span>
												</button>
											</Link>
										</div>
										</Col>
									</Row>
								 )
								 }
							 })}
						 </Container>
					 	
					
					</div> 
					)
				}
				
			</div>
            </>
    )
}

export default Explode
