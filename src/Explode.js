import React,{useEffect} from 'react'
import './styles/explode.css'
import logo from './logo.png'
import cloud from './cloud.png'
function Explode() {

    useEffect(()=>{
    const script5 = document.createElement('script');

    script5.src = "./js/demo.js";
    script5.async = true;

    document.body.appendChild(script5);
    },[])
    return (
        <>
		<div class="stars"></div>
		<div class="twinkling"></div>
		<div class="clouds" style={{ backgroundImage: `url(${cloud})` }}></div>
		
        <div id="container"></div>
			<div class="frame">

				<div class="frame__deco">
					<span class="frame__deco-inner">Innovision</span>
				</div>
				
			</div>
			<div class="content">
				<div class="content__item">
					
					<button class="content__button">
						
					<span class="frame__deco-inner"><img src={logo} /></span>
					Click to explore infinity</button>
				</div>
				<div class="content__item content__item--details">
					
					<h3 class="content__location">September 1  &mdash; 3</h3>
					<h1 class="content__title">Innovision</h1>
					<p class="content__date">Image Infinity</p>
					 <p class="anything">
					 <div className="frame__nav">
						<ul>
							<li><a href="#">About Innovision</a></li>
							<li><a href="#">The Team</a></li>
							<li><a href="#">Contact Us</a></li>
						</ul>
					</div>
					</p> 
				</div>
			</div>
            </>
    )
}

export default Explode
