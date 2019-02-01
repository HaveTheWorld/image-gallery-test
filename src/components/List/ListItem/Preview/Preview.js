import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { viewImage } from '@/redux/ducks/images'
import { Loader, Icon } from '@/components/elements'
import css from './Preview.sass'

class Preview extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			imageLoaded: false,
			error: false
		}

		const image = new Image()
		image.src = props.url
		image.addEventListener('load', () =>  {
			!this.state.imageLoaded && this.setState({ imageLoaded: true })
		})
		image.addEventListener('error', () =>  {
			!this.state.imageLoaded && this.setState({ imageLoaded: true, error: true })
		})
	}

	render() {
		const { imageLoaded, error } = this.state
		const { id, url, viewImage } = this.props
		const style = { backgroundImage: `url(${url})` }

		return (
			<a
				className={cls(css.preview, { [css.error]: error })}
				style={style}
				onClick={() => imageLoaded && !error && viewImage(id)}
			>
				{!imageLoaded && <Loader addClass={css.loader} />}
				{imageLoaded && error && <Icon icon={['fas', 'exclamation-triangle']} x2 addClass="has-text-primary" />}
			</a>
		)
	}
}

Preview.propTypes = {
	id: T.string.isRequired,
	url: T.string.isRequired,
	viewImage: T.func.isRequired
}

const mapDispatchToProps = {
	viewImage
}

export default connect(null, mapDispatchToProps)(Preview)