import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { Icon } from '@/components/elements'
import css from './ListItem.sass'

const ListItem = ({ id, url, comment, remove }) => {
	const style = { backgroundImage: `url(${url})` }
	
	return (
		<li className={css.row}>
			<div className={css.image} style={style}></div>
			<p className={css.comment}>{comment}</p>
			<div className={cls('buttons', css.buttons)}>
				<button
					className="button is-small is-light"
					title="Edit comment"
				>
					<Icon icon={['fas', 'pen']} />
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

ListItem.propTypes = {
	
}

export default ListItem