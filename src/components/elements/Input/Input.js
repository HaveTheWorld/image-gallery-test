import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { Icon } from '@/components/elements'

const Input = ({ el, rows, type, label, icon, autoFocus, value, onChange }) => {
	const Element = el || 'input'

	return (
		<div className="field">
			<div className={cls('control', { 'has-icons-left': icon })}>
				<Element
					rows={Element === 'textarea' ? (rows || 3) : null}
					type={Element === 'input' ? (type || 'text') : null}
					className={Element}
					placeholder={label}
					autoFocus={autoFocus}
					value={value}
					onChange={onChange}
				/>
				{icon && <Icon icon={icon} isLeft fw />}
			</div>
		</div>
	)
}

Input.propTypes = {
	
}

export default Input