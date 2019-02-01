import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { Icon, Loader } from '@/components/elements'
import css from './ListItem.sass'
import EditComment from './EditComment'

class ListItem extends React.Component {
	constructor(props) {
		super(props)
		
		this.item
		this.state = {
			isMounted: false,
			imageLoaded: false,
			editMode: false
		}

		const image = new Image()
		image.src = props.url
		image.addEventListener('load', () =>  {
			this.state.isMounted && this.setState({ imageLoaded: true })
		})
	}

	componentDidMount() {
		this.setState({ isMounted: true })
		this.props.listMounted && this.item && this.item.scrollIntoView()		
	}

	toggleMode = () => {
		this.setState({ editMode: !this.state.editMode })
	}

	render() {
		const { imageLoaded, editMode } = this.state
		const { id, url, comment, remove } = this.props
		const style = { backgroundImage: `url(${url})` }
		
		return (
			<li className={css.row} ref={ref => this.item = ref}>

				<div className={css.image} style={style}>
					{!imageLoaded && <Loader addClass={css.loader} />}
				</div>

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
						onClick={() => remove(id)}
					>
						<Icon icon={['fas', 'trash']} />
					</button>
				</div>
			</li>
		)
	}
}

ListItem.propTypes = {
	
}

export default ListItem