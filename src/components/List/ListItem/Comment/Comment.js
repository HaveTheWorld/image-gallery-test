import React, { Fragment } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { removeImage } from '@/redux/ducks/images'
import { Icon } from '@/components/elements'
import EditComment from './EditComment'
import css from './Comment.sass'

class Comment extends React.Component {
	state = {
		editMode: false
	}

	toggleMode = () => {
		this.setState({ editMode: !this.state.editMode })
	}

	render() {
		const { editMode } = this.state
		const { id, comment, removeImage } = this.props

		return (
			<Fragment>

				<div className={css.comment}>
					{
						editMode
							? <EditComment id={id} comment={comment} close={this.toggleMode} />
							: <p className={css.commentText}>{comment}</p>
					}
				</div>

				<div className={cls('buttons', css.buttons)}>

					<button
						className="button is-small is-light"
						title={editMode ? 'Cancel edit' : 'Edit comment'}
						onClick={this.toggleMode}
					>
						<Icon icon={['fas', editMode ? 'times' : 'pen']} />
					</button>

					<button
						className="button is-small is-light"
						title="Remove image"
						onClick={() => removeImage(id)}
					>
						<Icon icon={['fas', 'trash']} />
					</button>

				</div>

			</Fragment>
		)
	}
}

Comment.propTypes = {
	
}

const mapDispatchToProps = {
	removeImage
}

export default connect(null, mapDispatchToProps)(Comment)