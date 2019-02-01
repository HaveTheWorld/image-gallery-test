import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { getActiveImage, closeImage } from '@/redux/ducks/images'
import { Modal } from '@/components/elements'

const ImageView = ({ image, closeImage }) => {
	return (
		<Modal isActive={image} onClose={closeImage}>
			<figure className="image">
				{image && <img src={image.url} alt={`View ${image.id}`} />}
			</figure>
		</Modal>
	)
}

ImageView.propTypes = {
	
}

const mapStateToProps = state => ({
	image: getActiveImage(state)
})

const mapDispatchToProps = {
	closeImage
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageView)