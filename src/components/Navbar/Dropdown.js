import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import onClickOutside from 'react-onclickoutside'
import { Icon } from '@/components/elements'
import Form from './Form'

class Dropdown extends React.Component {
	state = {
		isActive: false
	}

	toggle = () => {
		this.setState({ isActive: !this.state.isActive })
	}

	handleClickOutside() {
		this.setState({ isActive: false })
	}

	render() {
		const { isActive } = this.state

		return (
			<div className="dropdown is-right is-active">
				<div className="dropdown-trigger">
					<button className="button is-primary" onClick={this.toggle}>
						<Icon icon={['fas', 'images']} />
						<span>Add Image</span>
					</button>
				</div>
				{
					isActive &&
					<div className="dropdown-menu">
						<div className="dropdown-content">
							<div className="dropdown-item">
								<Form close={this.toggle} />
							</div>
						</div>
					</div>
				}
			</div>
		)
	}
}

Dropdown.propTypes = {
	
}

export default onClickOutside(Dropdown)