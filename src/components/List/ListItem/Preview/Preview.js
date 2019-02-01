import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { viewImage } from '@/redux/ducks/images'
import { Loader } from '@/components/elements'
import css from './Preview.sass'

class Preview extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			imageLoaded: false
		}

		const image = new Image()
		image.src = props.url
		image.addEventListener('load', () =>  {
			!this.state.imageLoaded && this.setState({ imageLoaded: true })
		})
	}

	render() {
		const { imageLoaded } = this.state
		const { id, url, viewImage } = this.props
		const style = { backgroundImage: `url(${url})` }

		return (
			<a
				className={css.preview}
				style={style}
				onClick={() => imageLoaded && viewImage(id)}
			>
				{!imageLoaded && <Loader addClass={css.loader} />}
			</a>
		)
	}
}

Preview.propTypes = {
	
}

const mapDispatchToProps = {
	viewImage
}

export default connect(null, mapDispatchToProps)(Preview)