import React from 'react'
import T from 'prop-types'
import cls from 'classnames'

const Loader = ({ addClass }) => {
	return (
		<span className={cls('loader', addClass)}></span>
	)
}

Loader.propTypes = {
	addClass: T.string
}

export default Loader