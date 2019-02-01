import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { addImage } from '@/redux/ducks/images'
import { Input, Icon } from '@/components/elements'
import css from './Form.sass'

const isDev = process.env.NODE_ENV !== 'production'

const randomInt = isDev ? require('@/lib/helpers').randomInt : undefined
const faker = isDev ? require('faker/locale/en') : undefined

class Form extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			url: '',
			comment: ''
		}
		if (isDev) {
			const width = randomInt(300, 800)
			const height = randomInt(200, 600)
			const unique = Date.now()
			this.state.url = `https://picsum.photos/${width}/${height}/?random=true&v=${unique}`
			this.state.comment = faker.lorem.words(randomInt(10, 50))
		}
	}

	onChange = name => e => {
		this.setState({ [name]: e.target.value })
	}

	onSubmit = e => {
		e.preventDefault()

		const { url, comment } = this.state
		if (!url || !comment) { return }

		const { addImage, close } = this.props
		addImage({ url, comment })
		close()
	}

	render() {
		const { url, comment } = this.state
		const disabled = !url || !comment

		return (
			<form onSubmit={this.onSubmit} className={css.form}>
				<Input
					label="Image URL"
					icon={['fas', 'link']}
					value={url}
					onChange={this.onChange('url')}
					autoFocus
				/>
				<Input
					el="textarea"
					rows="5"
					label="Image Comment"
					icon={['far', 'comment-alt']}
					value={comment}
					onChange={this.onChange('comment')}
				/>
				<button
					className="button is-primary is-outlined"
					disabled={disabled}
					title={disabled ? 'Fill in all the fields, please!' : null}
				>
					<Icon icon={['far', 'paper-plane']} />
					<span>Submit</span>
				</button>
			</form>
		)
	}
}

Form.propTypes = {
	
}

const mapDispatchToProps = {
	addImage
}

export default connect(null, mapDispatchToProps)(Form)