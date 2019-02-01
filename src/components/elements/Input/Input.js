import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { Icon } from '@/components/elements'

const Input = ({ el, rows, type, label, icon, autoFocus, value, onChange, addClass }) => {
	const Element = el || 'input'

	return (
		<div className="field">
			<div className={cls('control', { 'has-icons-left': icon })}>
				<Element
					rows={Element === 'textarea' ? (rows || 3) : null}
					type={Element === 'input' ? (type || 'text') : null}
					className={cls(Element, addClass)}
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
	el: T.string,
	rows: T.oneOfType([T.string, T.number]),
	type: T.string,
	label: T.string.isRequired,
	icon: T.arrayOf(T.string),
	autoFocus: T.bool,
	value: T.any.isRequired,
	onChange: T.func.isRequired,
	addClass: T.string
}

export default Input