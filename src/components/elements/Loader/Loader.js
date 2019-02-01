import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

const Loader = ({ addClass }) => {
	return (
		<span className={cls('loader', addClass)}></span>
	)
}

Loader.propTypes = {
	
}

export default Loader