import React from 'react'
import T from 'prop-types'
import cls from 'classnames'

const Icon = ({ icon, isLeft, isRight, addClass, ...rest }) => {
	const sames = Object.entries(rest).reduce((acc, [key, value]) => {
		if (value === true) {
			key = /^x\d+$/.test(key) ? `fa-${key.slice(1)}x` : `fa-${key}`
			acc.push(key)
		}
		return acc
	}, [])

	const wrapperCls = cls(
		'icon',
		{ 'is-left': isLeft },
		{ 'is-right': isRight },
		addClass
	)

	const iconCls = cls(
		icon[0],
		`fa-${icon[1]}`,
		...sames
	)


	return (
		<span className={wrapperCls}>
			<span className={iconCls}></span>
		</span>
	)
}

Icon.propTypes = {
	icon: T.arrayOf(T.string).isRequired,
	isLeft: T.bool,
	isRight: T.bool,
	addClass: T.string
}

export default Icon