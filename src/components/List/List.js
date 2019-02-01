import React from 'react'
import T from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { sortImages } from '@/redux/ducks/images'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ListItem from './ListItem'

class List extends React.Component {
	state = {
		isMounted: false
	}

	componentDidMount() {
		this.setState({ isMounted: true })
	}

	render() {
		const { isMounted } = this.state
		const { items, sortImages } = this.props
		
		return (
			<ul>
				{items.map((item, index) => (
					<ListItem
						key={item.id}
						index={index}
						{...item}
						sort={sortImages}
						listMounted={isMounted}
					/>
				))}
			</ul>
		)
	}
}

List.propTypes = {
	items: T.array.isRequired,
	sortImages: T.func.isRequired
}

const mapStateToProps = state => ({
	items: state.images.items
})

const mapDispatchToProps = {
	sortImages
}

export default compose(
	DragDropContext(HTML5Backend),
	connect(mapStateToProps, mapDispatchToProps)
)(List)