import uuid from 'uuid/v4'

/* ===== Constants ===== */
export const moduleName = 'images'

export const FILL_IMAGES = `${moduleName}/FILL_IMAGES`
export const ADD_IMAGE = `${moduleName}/ADD_IMAGE`
export const REMOVE_IMAGE = `${moduleName}/REMOVE_IMAGE`
export const EDIT_COMMENT = `${moduleName}/EDIT_COMMENT`
export const VIEW_IMAGE = `${moduleName}/VIEW_IMAGE`
export const CLOSE_IMAGE = `${moduleName}/CLOSE_IMAGE`
export const SORT_IMAGES = `${moduleName}/SORT_IMAGES`

/* ===== Initial state ===== */
const initialState = {
	items: [],
	activeImageId: ''
}

/* ===== Selectors ===== */
export const getActiveImage = state => {
	const { items, activeImageId } = state[moduleName]
	return items.find(({ id }) => id === activeImageId)
}

/* ===== Reducer ===== */
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case FILL_IMAGES:
		case ADD_IMAGE:
		case REMOVE_IMAGE:
		case EDIT_COMMENT:
		case SORT_IMAGES:
			return { ...state, items: payload }

		case VIEW_IMAGE:
		case CLOSE_IMAGE:
			return { ...state, activeImageId: payload }

		default:
			return state
	}
}

/* ===== Action creators ===== */
export const fillImages = images => ({ type: FILL_IMAGES, payload: images })

export const addImage = image => (dispatch, getState) => {
	const { items } = getState()[moduleName]
	const id = uuid()
	const newItems = [...items, { id, ...image }]

	localStorage.setItem('images', JSON.stringify(newItems))

	dispatch({ type: ADD_IMAGE, payload: newItems })
}

export const removeImage = imageId => (dispatch, getState) => {
	const { items } = getState()[moduleName]
	const newItems = items.filter(({ id }) => id !== imageId)

	localStorage.setItem('images', JSON.stringify(newItems))

	dispatch({ type: REMOVE_IMAGE, payload: newItems })
}

export const editComment = (imageId, comment) => (dispatch, getState) => {
	const { items } = getState()[moduleName]
	const newItems = items.map(item => {
		if (item.id === imageId) { item.comment = comment }
		return item
	})

	localStorage.setItem('images', JSON.stringify(newItems))

	dispatch({ type: EDIT_COMMENT, payload: newItems })
}

export const sortImages = (dragIndex, hoverIndex) => (dispatch, getState) => {
	const { items } = getState()[moduleName]
	const dragImage = items[dragIndex]

	const newItems = items.filter((item, index) => index !== dragIndex)
	newItems.splice(hoverIndex, 0, dragImage)
	
	dispatch({ type: SORT_IMAGES, payload: newItems })
}

export const viewImage = imageId => ({ type: VIEW_IMAGE, payload: imageId })

export const closeImage = () => ({ type: CLOSE_IMAGE, payload: '' })