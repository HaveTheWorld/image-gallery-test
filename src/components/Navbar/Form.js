import React from 'react'
import T from 'prop-types'
import { Input, Icon } from '@/components/elements'
import css from './Form.sass'

class Form extends React.Component {
	state = {

	}

	onSubmit = e => {
		e.preventDefault()
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} className={css.form}>
				<Input
					label="Image URL"
					icon={['fas', 'link']}
					autoFocus
				/>
				<Input
					el="textarea"
					label="Image Description"
					icon={['far', 'comment-alt']}
				/>
				<button className="button is-primary is-outlined">
					<Icon icon={['far', 'paper-plane']} />
					<span>Submit</span>
				</button>
			</form>
		)
	}
}

Form.propTypes = {
	
}

export default Form