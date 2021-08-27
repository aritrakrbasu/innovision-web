import React, { useEffect, useState } from 'react'
import video from './static/video/test.mp4'

function Home() {

    const [width, setWidth] = useState("200px")
    const [height, setHeight] = useState("120px")
    const [overlay,setOverlay] = useState(false)
    const [url,setUrl] = useState("https://www.youtube.com/embed/stY8qg9lRxU?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&modestbranding=1&rel=0&enablejsapi=1&playlist=stY8qg9lRxU")

   function resizeVideo(event)
   {
       // scrolled up
       if(event.deltaY < 0)
       {
            setWidth("200px")
            setHeight("120px")
       }else
       {
            setOverlay(true)
            setWidth(window.screen.width)
            setHeight(window.screen.height)
            setUrl("https://www.youtube.com/embed/stY8qg9lRxU?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&modestbranding=1&rel=0&start=0&enablejsapi=1")
       }
   }

   function unmute()
   {
        document.getElementById('vid').muted = false;
   }
    return (
        <>
        <div class="content demo-1 loading"> 
            <canvas class="landscape" ></canvas>           
            <h2 class="content__title">Innovission 2k21</h2>
            <p class="content__subtitle">Imagine infinity</p>
            {overlay && <div className="video__overlay" onWheel={resizeVideo}  onClick={unmute}/>}
            <div className="trailer">
                
                <h1>Trailer</h1>
                <video id="vid"  width={width} height={height} className="video" autoPlay muted allow="autoplay"> 
                    <source src= {video} type="video/mp4" /> 
                </video> 
                <div class="content">
				<div class="content__item">
					<button class="content__button">Take me in <br />yo</button>
				</div>
				<div class="content__item content__item--details">
					<h3 class="content__location">September 1  &mdash; 3</h3>
					<h1 class="content__title">Innovision</h1>
					{/* <p class="content__date">Image Infinity</p>
					<p class="anything">
						<img src="https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a29sa2F0YSUyMGluZGlhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" />
					</p>  */}
				</div>
			</div>
            </div>
            
        </div>
        <div class="overlay" onWheel={resizeVideo} onClick={unmute}></div>
        </>
        
    )
}

export default Home
