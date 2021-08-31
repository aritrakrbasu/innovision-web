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
						<button class="navigation__button">About </button>
					</Link>
				</li>
				<li>
                    <Link to="/team">
						<button class="navigation__button">The Team</button>
					</Link>
				</li>
				<li>
                    <Link to="/login">
						<button class="navigation__button">Login</button>
					</Link>
				</li>
				<li>
                    <br></br>
                    <Link to="/register" class="brk-btn">
                        Register
                    </Link>
				</li>
			</ul>
		</div>
        </>
    )
}

export default Navbar
