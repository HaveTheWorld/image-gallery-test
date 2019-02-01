import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { editComment } from '@/redux/ducks/images'
import { Input, Icon } from '@/components/elements'
import css from './EditComment.sass'

class EditComment extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			comment: ''
		}
		this.state.comment = props.comment
	}

	onChange = e => {
		this.setState({ comment: e.target.value })
	}

	saveComment = () => {
		const { comment } = this.state
		if (!comment) { return }
		
		const { id, editComment, close } = this.props
		editComment(id, comment)
		close()
	}

	render() {
		const { comment } = this.state

		return (
			<div className={css.edit}>
				<div className={css.field}>
					<Input
						el="textarea"
						rows="3"
						label="Edit Comment"
						value={comment}
						onChange={this.onChange}
						addClass={css.text}
					/>
				</div>
				<button
					className="button is-small is-light"
					title="Save comment"
					onClick={this.saveComment}
					disabled={!comment}
				>
					<Icon icon={['fas', 'save']} />
				</button>
			</div>
		)
	}
}

EditComment.propTypes = {
	id: T.string.isRequired,
	comment: T.string.isRequired,
	editComment: T.func.isRequired,
	close: T.func.isRequired
}

const mapDispatchToProps = {
	editComment
}

export default connect(null, mapDispatchToProps)(EditComment)