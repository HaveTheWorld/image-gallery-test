import React from 'react'
import ReactDOM from 'react-dom'
import cls from 'classnames'

const Modal = ({ children, isActive, onClose }) => {
	return ReactDOM.createPortal(
		<div className={cls('modal', { 'is-active': isActive })}>
			<div className="modal-background" onClick={onClose}></div>
			<div className="modal-content">
				{children}
			</div>
		</div>,
		document.body
	)
}

export default Modal