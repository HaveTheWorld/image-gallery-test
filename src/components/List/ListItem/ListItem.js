import React from 'react'
import T from 'prop-types'
import { findDOMNode } from 'react-dom'
import cls from 'classnames'
import { compose } from 'redux'
import { DragSource, DropTarget } from 'react-dnd'
import { IMAGE } from '@/lib/dnd-types'
import Preview from './Preview'
import Comment from './Comment'
import css from './ListItem.sass'

class ListItem extends React.Component {
	item

	componentDidMount() {
		const { listMounted } = this.props
		listMounted && this.item && this.item.scrollIntoView()		
	}

	render() {		
		const {
			id, url, comment,
			isDragging, connectDragSource, connectDropTarget
		} = this.props

		return connectDragSource(
			connectDropTarget(
				<li
					className={cls(css.row, { [css.isDragging]: isDragging })}
					ref={ref => this.item = ref}
				>
					<Preview id={id} url={url} />
					<Comment id={id} comment={comment} />				
				</li>
			)
		)
	}
}

ListItem.propTypes = {
	listMounted: T.bool.isRequired,
	id: T.string.isRequired,
	url: T.string.isRequired,
	comment: T.string.isRequired,
	isDragging: T.bool.isRequired,
	connectDragSource: T.func.isRequired,
	connectDropTarget: T.func.isRequired
}

/* ===== Source ===== */

const sourceSpec = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		}
	},
}

const sourceCollect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
})

/* ===== Target ===== */

const targetSpec = {
	hover(props, monitor, component) {
		if (!component) return null

		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index


		if (dragIndex === hoverIndex) return null

		// eslint-disable-next-line
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		const clientOffset = monitor.getClientOffset()
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		props.sort(dragIndex, hoverIndex)
		monitor.getItem().index = hoverIndex
	}
}

const targetCollect = connect => ({
	connectDropTarget: connect.dropTarget(),
})

export default compose(
	DropTarget(IMAGE, targetSpec, targetCollect),
	DragSource(IMAGE, sourceSpec, sourceCollect)
)(ListItem)