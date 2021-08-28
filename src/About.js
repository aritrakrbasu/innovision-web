import React from 'react'
import { Container, Row } from 'react-bootstrap'
import cloud from './cloud.png'
import Navbar from './components/Navbar'
import './styles/about.css'
function About() {
    return (
        <div>
            <div class="stars"></div>
            <div class="twinkling"></div>
            <div class="clouds" style={{ backgroundImage: `url(${cloud})` }}></div>

            <Navbar />

        <div className="about__container">
            <Container>
				<Row>
				<h1 class="hero glitch layers no_background" data-text="Innovision'21"><span>Innovision'21</span></h1>
					<p>
						Are you ready for the biggest annual event of the year in the department of CSE? 
					<br />
					<br />
						Ever since its inception in 2013, the annual technical and co-curricular fest, “Innovision”, of CSE RCCIIT, has only been improving, getting bigger, and more exciting. It serves as the biggest symposium of RCCIIT for a confluence of students and teachers alike. 
						Every year, our seniors spare no effort in making this occasion a grand success and making sure their juniors have the best time spanning the days of the fest. Now after seeing our seniors work their hardest for the past years, this year, it is our responsibility to make sure everyone has a wonderful and smooth experience in this edition of Innovision. With able guidance from our teachers, we will strive to make Innovision ‘21 only bigger, better, and more remarkable than before, and it can only be done with your help. So are you ready to compete with your batchmates, juniors, and seniors alike?
						<br />
						<br />
						With a plethora of events to choose from, both technical, as well as non-technical, there is no shortage of events to prove both your technical knowledge and your creative talents. From quizzes to hackathons and coding competitions, extempore to creative writing and photography, no effort has been spared to make sure you have an outstanding experience.
						So we take great pleasure and present to you Innovision 2021, and invite all of our dear batchmates, juniors, and seniors from the department of CSE to take part in this year’s Innovision.
					</p>
				</Row>
			</Container>
        </div>
            
        </div>
    )
}

export default About
