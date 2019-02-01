import React from 'react'
import T from 'prop-types'
import Dropdown from './Dropdown'

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-brand">
				<div className="navbar-item">
					<h1 className="subtitle is-4 has-text-primary">Image Gallery</h1>
				</div>
			</div>
			<div className="navbar-menu">
				<div className="navbar-end">
					<div className="navbar-item">
						<Dropdown />
					</div>
				</div>
			</div>
		</nav>
	)
}

Navbar.propTypes = {
	
}

export default Navbar