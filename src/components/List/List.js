import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { removeImage } from '@/redux/ducks/images'
import ListItem from './ListItem'

const List = ({ images, removeImage }) => {
	return (
		<ul>
			{images.map(image => (
				<ListItem
					key={image.id}
					{...image}
					remove={removeImage}
				/>
			))}
		</ul>
	)
}

List.propTypes = {
	
}

const mapStateToProps = state => ({
	images: state.images.items
})

const mapDispatchToProps = {
	removeImage
}

export default connect(mapStateToProps, mapDispatchToProps)(List)