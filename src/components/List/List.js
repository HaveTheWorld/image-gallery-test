import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { removeImage } from '@/redux/ducks/images'
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
		const { items, removeImage } = this.props
		return (
			<ul>
				{items.map(item => (
					<ListItem
						key={item.id}
						{...item}
						remove={removeImage}
						listMounted={isMounted}
					/>
				))}
			</ul>
		)
	}
}

List.propTypes = {
	
}

const mapStateToProps = state => ({
	items: state.images.items
})

const mapDispatchToProps = {
	removeImage
}

export default connect(mapStateToProps, mapDispatchToProps)(List)