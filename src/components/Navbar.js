import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <>
        <div class="frame">

<div class="">
    <span class="frame__deco-inner dept_text">Department of CSE <br></br>presents</span>
</div>

</div>
<div className="frame__nav">
			<ul>
				<li>
					<Link to="/">
						<button class="navigation__button">Home</button>
					</Link>
				</li>
				<li>
					<Link to="/about">
						<button class="navigation__button">About Innovision</button>
					</Link>
				</li>
				<li>
                    <Link to="/team">
						<button class="navigation__button">The Team</button>
					</Link>
				</li>
				<li>
					<a href="#">
						<button class="navigation__button">Contact Us</button>
					</a>
				</li>
			</ul>
		</div>
        </>
    )
}

export default Navbar
